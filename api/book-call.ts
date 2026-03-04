import { Resend } from 'resend';

const MS_PER_MINUTE = 60_000;
const MS_PER_DAY = 86_400_000;

const DEFAULT_TIMEZONE = 'America/New_York';
const DEFAULT_AVAILABLE_DAYS = 'Mon,Tue,Wed,Thu,Fri';
const DEFAULT_AVAILABLE_HOURS = '10:00-18:00';
const DEFAULT_DURATION_MINUTES = 30;
const DEFAULT_BUFFER_MINUTES = 15;
const DEFAULT_MAX_DAYS_AHEAD = 30;
const DEFAULT_ADMIN_EMAIL = 'contact@symphosys.com';
const DEFAULT_FROM_EMAIL = 'Symphosys <onboarding@resend.dev>';
const DEFAULT_BOOKING_TITLE = 'Symphosys Strategy Call';

const WEEKDAY_INDEX_BY_SHORT: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const WEEKDAY_LABEL_BY_INDEX = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface BookingConfig {
  timezone: string;
  availableDayIndexes: Set<number>;
  availableHoursText: string;
  startMinutes: number;
  endMinutes: number;
  durationMinutes: number;
  bufferMinutes: number;
  maxDaysAhead: number;
  slotStepMinutes: number;
}

interface BookingRequestBody {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  notes?: string;
  startIso?: string;
  source?: string;
}

interface BookingRecord {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  notes: string;
  startIso: string;
  endIso: string;
  timezone: string;
  durationMinutes: number;
  bufferMinutes: number;
  source: string;
  createdAt: string;
}

interface AvailabilitySlot {
  startIso: string;
  endIso: string;
  displayTime: string;
}

interface AvailabilityDay {
  date: string;
  label: string;
  slots: AvailabilitySlot[];
}

interface AvailabilityPayload {
  timezone: string;
  availableDays: string[];
  availableHours: string;
  durationMinutes: number;
  bufferMinutes: number;
  maxDaysAhead: number;
  days: AvailabilityDay[];
}

interface LocalDateParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekdayShort: string;
}

interface AnyResponse {
  status: (code: number) => AnyResponse;
  json: (payload: unknown) => void;
  setHeader?: (name: string, value: string) => void;
}

type BookingStore = Map<string, BookingRecord>;
type GlobalWithBookingStore = typeof globalThis & { __symphosysBookingStore?: BookingStore };

const globalWithStore = globalThis as GlobalWithBookingStore;
const bookingStore = globalWithStore.__symphosysBookingStore ?? new Map<string, BookingRecord>();

if (!globalWithStore.__symphosysBookingStore) {
  globalWithStore.__symphosysBookingStore = bookingStore;
}

function parseRequestBody(req: any): BookingRequestBody {
  if (!req?.body) {
    return {};
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as BookingRequestBody;
    } catch {
      return {};
    }
  }

  return req.body as BookingRequestBody;
}

function parseInteger(value: string | undefined, fallback: number, minimum: number): number {
  const parsed = Number.parseInt((value || '').trim(), 10);
  if (Number.isNaN(parsed) || parsed < minimum) {
    return fallback;
  }
  return parsed;
}

function parseTimeToMinutes(value: string): number | null {
  const match = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(value.trim());
  if (!match) {
    return null;
  }

  return Number.parseInt(match[1], 10) * 60 + Number.parseInt(match[2], 10);
}

function parseAvailableHours(value: string | undefined): { startMinutes: number; endMinutes: number; text: string } {
  const raw = (value || DEFAULT_AVAILABLE_HOURS).trim();
  const [startRaw, endRaw] = raw.split('-');

  const startMinutes = startRaw ? parseTimeToMinutes(startRaw) : null;
  const endMinutes = endRaw ? parseTimeToMinutes(endRaw) : null;

  if (
    startMinutes === null ||
    endMinutes === null ||
    startMinutes >= endMinutes ||
    endMinutes - startMinutes < 15
  ) {
    const [defaultStartRaw, defaultEndRaw] = DEFAULT_AVAILABLE_HOURS.split('-');
    return {
      startMinutes: parseTimeToMinutes(defaultStartRaw)!,
      endMinutes: parseTimeToMinutes(defaultEndRaw)!,
      text: DEFAULT_AVAILABLE_HOURS,
    };
  }

  const normalized = `${startRaw.trim()}-${endRaw.trim()}`;
  return { startMinutes, endMinutes, text: normalized };
}

function parseAvailableDays(value: string | undefined): Set<number> {
  const input = (value || DEFAULT_AVAILABLE_DAYS).trim();
  const dayIndexes = new Set<number>();

  for (const token of input.split(',')) {
    const normalized = token.trim().slice(0, 3).toLowerCase();
    const mapped = Object.entries(WEEKDAY_INDEX_BY_SHORT).find(
      ([weekday]) => weekday.toLowerCase() === normalized,
    );
    if (mapped) {
      dayIndexes.add(mapped[1]);
    }
  }

  if (dayIndexes.size > 0) {
    return dayIndexes;
  }

  return new Set([1, 2, 3, 4, 5]);
}

function getBookingConfig(): BookingConfig {
  const timezone = (process.env.BOOKING_TIMEZONE || DEFAULT_TIMEZONE).trim() || DEFAULT_TIMEZONE;
  const availableDayIndexes = parseAvailableDays(process.env.BOOKING_AVAILABLE_DAYS);
  const parsedHours = parseAvailableHours(process.env.BOOKING_AVAILABLE_HOURS);
  const durationMinutes = parseInteger(
    process.env.BOOKING_DURATION_MIN,
    DEFAULT_DURATION_MINUTES,
    5,
  );
  const bufferMinutes = parseInteger(process.env.BOOKING_BUFFER_MIN, DEFAULT_BUFFER_MINUTES, 0);
  const maxDaysAhead = parseInteger(
    process.env.BOOKING_MAX_DAYS_AHEAD,
    DEFAULT_MAX_DAYS_AHEAD,
    1,
  );
  const slotStepMinutes = durationMinutes + bufferMinutes;

  return {
    timezone,
    availableDayIndexes,
    availableHoursText: parsedHours.text,
    startMinutes: parsedHours.startMinutes,
    endMinutes: parsedHours.endMinutes,
    durationMinutes,
    bufferMinutes,
    maxDaysAhead,
    slotStepMinutes: slotStepMinutes > 0 ? slotStepMinutes : durationMinutes,
  };
}

function padNumber(value: number): string {
  return value.toString().padStart(2, '0');
}

function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${padNumber(month)}-${padNumber(day)}`;
}

function getDayDifference(fromDateKey: string, toDateKeyValue: string): number {
  const fromParts = fromDateKey.split('-').map((part) => Number.parseInt(part, 10));
  const toParts = toDateKeyValue.split('-').map((part) => Number.parseInt(part, 10));

  if (fromParts.length !== 3 || toParts.length !== 3) {
    return 0;
  }

  const fromUtc = Date.UTC(fromParts[0], fromParts[1] - 1, fromParts[2]);
  const toUtc = Date.UTC(toParts[0], toParts[1] - 1, toParts[2]);

  return Math.round((toUtc - fromUtc) / MS_PER_DAY);
}

function roundUpToMinutes(timestampMs: number, minutes: number): number {
  const interval = Math.max(minutes, 1) * MS_PER_MINUTE;
  return Math.ceil(timestampMs / interval) * interval;
}

function getLocalDateParts(date: Date, timezone: string): LocalDateParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const values: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== 'literal') {
      values[part.type] = part.value;
    }
  }

  const rawHour = Number.parseInt(values.hour || '0', 10);
  const safeHour = Number.isNaN(rawHour) ? 0 : rawHour % 24;

  return {
    year: Number.parseInt(values.year || '0', 10),
    month: Number.parseInt(values.month || '1', 10),
    day: Number.parseInt(values.day || '1', 10),
    hour: safeHour,
    minute: Number.parseInt(values.minute || '0', 10),
    weekdayShort: values.weekday || 'Sun',
  };
}

function formatDateLabel(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function formatLongDate(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function formatTime(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function formatTimeWithZone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}

function formatGoogleDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function createGoogleCalendarLink(booking: BookingRecord): string {
  const details = [
    'Symphosys strategy call booking.',
    '',
    `Booked By: ${booking.name}`,
    `Email: ${booking.email}`,
    `Company: ${booking.company || 'N/A'}`,
    `Phone: ${booking.phone || 'N/A'}`,
    booking.notes ? `Notes: ${booking.notes}` : 'Notes: N/A',
    '',
    'Google Meet link will be shared manually by Symphosys.',
  ].join('\n');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: DEFAULT_BOOKING_TITLE,
    dates: `${formatGoogleDate(new Date(booking.startIso))}/${formatGoogleDate(new Date(booking.endIso))}`,
    details,
    location: 'Online (Google Meet link sent manually)',
    ctz: booking.timezone,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function withLineBreaks(input: string): string {
  return escapeHtml(input).replace(/\r?\n/g, '<br/>');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hasConflict(
  proposedStartMs: number,
  proposedEndMs: number,
  proposedBufferMinutes: number,
): boolean {
  const proposedBusyEndMs = proposedEndMs + proposedBufferMinutes * MS_PER_MINUTE;

  for (const existingBooking of bookingStore.values()) {
    const existingStartMs = Date.parse(existingBooking.startIso);
    const existingEndMs = Date.parse(existingBooking.endIso);
    const existingBusyEndMs = existingEndMs + existingBooking.bufferMinutes * MS_PER_MINUTE;

    if (proposedStartMs < existingBusyEndMs && proposedBusyEndMs > existingStartMs) {
      return true;
    }
  }

  return false;
}

function buildAvailability(config: BookingConfig, now = new Date()): AvailabilityPayload {
  const availabilityMap = new Map<string, AvailabilityDay>();
  const iterationStepMinutes = 5;
  const scanStartMs = roundUpToMinutes(now.getTime() + 5 * MS_PER_MINUTE, iterationStepMinutes);
  const scanEndMs = scanStartMs + (config.maxDaysAhead + 2) * MS_PER_DAY;
  const localToday = getLocalDateParts(now, config.timezone);
  const todayDateKey = toDateKey(localToday.year, localToday.month, localToday.day);

  for (let currentMs = scanStartMs; currentMs <= scanEndMs; currentMs += iterationStepMinutes * MS_PER_MINUTE) {
    const currentDate = new Date(currentMs);
    const localParts = getLocalDateParts(currentDate, config.timezone);
    const weekdayIndex = WEEKDAY_INDEX_BY_SHORT[localParts.weekdayShort];

    if (weekdayIndex === undefined || !config.availableDayIndexes.has(weekdayIndex)) {
      continue;
    }

    const dateKey = toDateKey(localParts.year, localParts.month, localParts.day);
    const dayOffset = getDayDifference(todayDateKey, dateKey);
    if (dayOffset < 0 || dayOffset > config.maxDaysAhead) {
      continue;
    }

    const localMinutes = localParts.hour * 60 + localParts.minute;
    if (localMinutes < config.startMinutes) {
      continue;
    }
    if (localMinutes + config.durationMinutes > config.endMinutes) {
      continue;
    }
    if ((localMinutes - config.startMinutes) % config.slotStepMinutes !== 0) {
      continue;
    }

    const slotStartMs = currentMs;
    const slotEndMs = slotStartMs + config.durationMinutes * MS_PER_MINUTE;
    if (hasConflict(slotStartMs, slotEndMs, config.bufferMinutes)) {
      continue;
    }

    const slotStartIso = new Date(slotStartMs).toISOString();
    const slotEndIso = new Date(slotEndMs).toISOString();
    const existingDay = availabilityMap.get(dateKey);
    const slot: AvailabilitySlot = {
      startIso: slotStartIso,
      endIso: slotEndIso,
      displayTime: formatTime(new Date(slotStartIso), config.timezone),
    };

    if (existingDay) {
      existingDay.slots.push(slot);
      continue;
    }

    availabilityMap.set(dateKey, {
      date: dateKey,
      label: formatDateLabel(new Date(slotStartIso), config.timezone),
      slots: [slot],
    });
  }

  const sortedDays = Array.from(availabilityMap.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((day) => ({
      ...day,
      slots: day.slots.sort((a, b) => a.startIso.localeCompare(b.startIso)),
    }));

  return {
    timezone: config.timezone,
    availableDays: Array.from(config.availableDayIndexes)
      .sort((a, b) => a - b)
      .map((dayIndex) => WEEKDAY_LABEL_BY_INDEX[dayIndex]),
    availableHours: config.availableHoursText,
    durationMinutes: config.durationMinutes,
    bufferMinutes: config.bufferMinutes,
    maxDaysAhead: config.maxDaysAhead,
    days: sortedDays,
  };
}

function buildUserEmailHtml(booking: BookingRecord, calendarLink: string): string {
  const startDate = new Date(booking.startIso);
  const endDate = new Date(booking.endIso);
  const notes = booking.notes ? withLineBreaks(booking.notes) : 'Not provided';

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111111; line-height: 1.6;">
      <h2 style="margin: 0 0 12px 0;">Your Strategy Call Is Confirmed</h2>
      <p style="margin: 0 0 16px 0;">Hi ${escapeHtml(booking.name)}, thanks for booking your call with Symphosys.</p>
      <div style="padding: 16px; border: 1px solid #e5e5e5; border-radius: 12px; margin-bottom: 16px;">
        <p style="margin: 0 0 6px 0;"><strong>Date:</strong> ${formatLongDate(startDate, booking.timezone)}</p>
        <p style="margin: 0 0 6px 0;"><strong>Time:</strong> ${formatTimeWithZone(startDate, booking.timezone)} - ${formatTimeWithZone(endDate, booking.timezone)}</p>
        <p style="margin: 0 0 6px 0;"><strong>Duration:</strong> ${booking.durationMinutes} minutes</p>
        <p style="margin: 0 0 6px 0;"><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
        <p style="margin: 0 0 6px 0;"><strong>Company:</strong> ${escapeHtml(booking.company || 'N/A')}</p>
        <p style="margin: 0 0 6px 0;"><strong>Phone:</strong> ${escapeHtml(booking.phone || 'N/A')}</p>
        <p style="margin: 0;"><strong>Notes:</strong> ${notes}</p>
      </div>
      <p style="margin: 0 0 8px 0;">
        <a href="${calendarLink}" target="_blank" rel="noreferrer" style="color: #0b57d0; text-decoration: underline;">Add this call to Google Calendar</a>
      </p>
      <p style="margin: 0 0 8px 0;">Google Meet link will be shared with you manually by our team.</p>
      <p style="margin: 0;">- Symphosys Team</p>
    </div>
  `;
}

function buildAdminEmailHtml(booking: BookingRecord, calendarLink: string): string {
  const startDate = new Date(booking.startIso);
  const endDate = new Date(booking.endIso);
  const notes = booking.notes ? withLineBreaks(booking.notes) : 'Not provided';

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111111; line-height: 1.6;">
      <h2 style="margin: 0 0 12px 0;">New Strategy Call Booking</h2>
      <div style="padding: 16px; border: 1px solid #e5e5e5; border-radius: 12px; margin-bottom: 16px;">
        <p style="margin: 0 0 6px 0;"><strong>Name:</strong> ${escapeHtml(booking.name)}</p>
        <p style="margin: 0 0 6px 0;"><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
        <p style="margin: 0 0 6px 0;"><strong>Company:</strong> ${escapeHtml(booking.company || 'N/A')}</p>
        <p style="margin: 0 0 6px 0;"><strong>Phone:</strong> ${escapeHtml(booking.phone || 'N/A')}</p>
        <p style="margin: 0 0 6px 0;"><strong>Date:</strong> ${formatLongDate(startDate, booking.timezone)}</p>
        <p style="margin: 0 0 6px 0;"><strong>Time:</strong> ${formatTimeWithZone(startDate, booking.timezone)} - ${formatTimeWithZone(endDate, booking.timezone)}</p>
        <p style="margin: 0 0 6px 0;"><strong>Duration:</strong> ${booking.durationMinutes} minutes</p>
        <p style="margin: 0 0 6px 0;"><strong>Source CTA:</strong> ${escapeHtml(booking.source || 'website')}</p>
        <p style="margin: 0;"><strong>Notes:</strong> ${notes}</p>
      </div>
      <p style="margin: 0 0 8px 0;">
        <a href="${calendarLink}" target="_blank" rel="noreferrer" style="color: #0b57d0; text-decoration: underline;">Open Calendar Draft Link</a>
      </p>
      <p style="margin: 0;">Meet link will be sent manually.</p>
    </div>
  `;
}

function toPublicBookingPayload(booking: BookingRecord) {
  const startDate = new Date(booking.startIso);
  const endDate = new Date(booking.endIso);

  return {
    id: booking.id,
    startIso: booking.startIso,
    endIso: booking.endIso,
    timezone: booking.timezone,
    dateLabel: formatLongDate(startDate, booking.timezone),
    timeLabel: `${formatTimeWithZone(startDate, booking.timezone)} - ${formatTimeWithZone(endDate, booking.timezone)}`,
    durationMinutes: booking.durationMinutes,
    email: booking.email,
    name: booking.name,
    company: booking.company,
    phone: booking.phone,
    notes: booking.notes,
  };
}

function findSlotByStartIso(availability: AvailabilityPayload, startIso: string): AvailabilitySlot | null {
  for (const day of availability.days) {
    const matchedSlot = day.slots.find((slot) => slot.startIso === startIso);
    if (matchedSlot) {
      return matchedSlot;
    }
  }
  return null;
}

export default async function handler(req: any, res: AnyResponse) {
  const method = (req?.method || '').toUpperCase();
  const config = getBookingConfig();

  if (method === 'GET') {
    const availability = buildAvailability(config);
    return res.status(200).json({ success: true, availability });
  }

  if (method !== 'POST') {
    if (typeof res.setHeader === 'function') {
      res.setHeader('Allow', 'GET, POST');
    }
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = parseRequestBody(req);
  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const company = (body.company || '').trim();
  const phone = (body.phone || '').trim();
  const notes = (body.notes || '').trim();
  const source = (body.source || 'website').trim();
  const startIso = (body.startIso || '').trim();

  if (!name || !email || !startIso) {
    return res.status(400).json({ error: 'Name, email, and time slot are required.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const startMs = Date.parse(startIso);
  if (Number.isNaN(startMs)) {
    return res.status(400).json({ error: 'Invalid slot format.' });
  }

  const availability = buildAvailability(config);
  const matchedSlot = findSlotByStartIso(availability, new Date(startMs).toISOString());

  if (!matchedSlot) {
    return res.status(409).json({
      error: 'That slot is no longer available. Please choose another time.',
      availability,
    });
  }

  const slotStartMs = Date.parse(matchedSlot.startIso);
  const slotEndMs = Date.parse(matchedSlot.endIso);
  if (hasConflict(slotStartMs, slotEndMs, config.bufferMinutes)) {
    return res.status(409).json({
      error: 'That slot was just booked. Please choose another time.',
      availability: buildAvailability(config),
    });
  }

  const booking: BookingRecord = {
    id: `booking_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    company,
    phone,
    notes,
    startIso: matchedSlot.startIso,
    endIso: matchedSlot.endIso,
    timezone: config.timezone,
    durationMinutes: config.durationMinutes,
    bufferMinutes: config.bufferMinutes,
    source: source || 'website',
    createdAt: new Date().toISOString(),
  };

  bookingStore.set(booking.id, booking);

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = (process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL).trim() || DEFAULT_FROM_EMAIL;
  const adminEmail = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim() || DEFAULT_ADMIN_EMAIL;
  const calendarLink = createGoogleCalendarLink(booking);

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY is not set. Simulating booking confirmation success.');
    return res.status(200).json({
      success: true,
      simulated: true,
      booking: toPublicBookingPayload(booking),
    });
  }

  try {
    const resend = new Resend(resendApiKey);

    const userReply = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Your Strategy Call is Confirmed - Symphosys',
      html: buildUserEmailHtml(booking, calendarLink),
    });

    if (userReply.error) {
      bookingStore.delete(booking.id);
      return res.status(400).json({ error: userReply.error.message });
    }

    const adminReply = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      replyTo: email,
      subject: `New Strategy Call Booking - ${name}`,
      html: buildAdminEmailHtml(booking, calendarLink),
    });

    if (adminReply.error) {
      console.error('Resend admin booking email error:', adminReply.error);
    }

    return res.status(200).json({
      success: true,
      booking: toPublicBookingPayload(booking),
    });
  } catch (error) {
    bookingStore.delete(booking.id);
    console.error('Booking API error:', error);
    return res.status(500).json({ error: 'Failed to book call.' });
  }
}
