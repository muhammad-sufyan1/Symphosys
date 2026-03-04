import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheckBig,
  Clock3,
  X,
} from 'lucide-react';
import { Button } from '../Button';

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

interface BookingAvailability {
  timezone: string;
  availableDays: string[];
  availableHours: string;
  durationMinutes: number;
  bufferMinutes: number;
  maxDaysAhead: number;
  days: AvailabilityDay[];
}

interface BookingConfirmation {
  id: string;
  dateLabel: string;
  timeLabel: string;
  durationMinutes: number;
  email: string;
  simulated?: boolean;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: string;
}

interface BookingFormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  notes: string;
}

const INITIAL_FORM_STATE: BookingFormState = {
  name: '',
  email: '',
  company: '',
  phone: '',
  notes: '',
};

const WEEKDAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function toDateKey(year: number, monthIndex: number, day: number): string {
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getMonthKey(dateKey: string): string {
  return dateKey.slice(0, 7);
}

function parseMonthKey(monthKey: string): { year: number; monthIndex: number } | null {
  const match = /^(\d{4})-(\d{2})$/.exec(monthKey);
  if (!match) {
    return null;
  }

  const year = Number.parseInt(match[1], 10);
  const monthIndex = Number.parseInt(match[2], 10) - 1;

  if (Number.isNaN(year) || Number.isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) {
    return null;
  }

  return { year, monthIndex };
}

function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

function getFirstWeekdayOfMonth(year: number, monthIndex: number): number {
  return new Date(Date.UTC(year, monthIndex, 1)).getUTCDay();
}

function formatMonthLabel(monthKey: string): string {
  const parsed = parseMonthKey(monthKey);
  if (!parsed) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(parsed.year, parsed.monthIndex, 1)));
}

async function safeJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function BookingModal({ isOpen, onClose, source }: BookingModalProps) {
  const [availability, setAvailability] = useState<BookingAvailability | null>(null);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState('');
  const [viewedMonth, setViewedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartIso, setSelectedStartIso] = useState('');
  const [formState, setFormState] = useState<BookingFormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successBooking, setSuccessBooking] = useState<BookingConfirmation | null>(null);

  const syncSelectedSlotFromAvailability = useCallback(
    (nextAvailability: BookingAvailability) => {
      const firstDayWithSlot = nextAvailability.days.find((day) => day.slots.length > 0);
      const hasSelectedDate = selectedDate && nextAvailability.days.some((day) => day.date === selectedDate);
      const nextDate = hasSelectedDate ? selectedDate : firstDayWithSlot?.date || '';
      const hasViewedMonth = viewedMonth && nextAvailability.days.some((day) => getMonthKey(day.date) === viewedMonth);
      const nextViewedMonth = hasViewedMonth
        ? viewedMonth
        : nextDate
          ? getMonthKey(nextDate)
          : firstDayWithSlot
            ? getMonthKey(firstDayWithSlot.date)
            : '';

      const nextDateSlots = nextAvailability.days.find((day) => day.date === nextDate)?.slots || [];
      const hasSelectedSlot = selectedStartIso && nextDateSlots.some((slot) => slot.startIso === selectedStartIso);

      setViewedMonth(nextViewedMonth);
      setSelectedDate(nextDate);
      setSelectedStartIso(hasSelectedSlot ? selectedStartIso : nextDateSlots[0]?.startIso || '');
    },
    [selectedDate, selectedStartIso, viewedMonth],
  );

  const loadAvailability = useCallback(async () => {
    setIsLoadingAvailability(true);
    setAvailabilityError('');

    try {
      const response = await fetch('/api/book-call', { method: 'GET' });
      const data = await safeJson<{ availability?: BookingAvailability; error?: string }>(response);

      if (!response.ok || !data?.availability) {
        setAvailabilityError(data?.error || 'Failed to load booking availability.');
        return;
      }

      setAvailability(data.availability);
      syncSelectedSlotFromAvailability(data.availability);
    } catch (error) {
      console.error('Failed to load booking availability:', error);
      setAvailabilityError('Failed to load booking availability.');
    } finally {
      setIsLoadingAvailability(false);
    }
  }, [syncSelectedSlotFromAvailability]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSubmitError('');
    setSuccessBooking(null);
    void loadAvailability();
  }, [isOpen, loadAvailability]);

  useEffect(() => {
    if (!isOpen) {
      setAvailability(null);
      setAvailabilityError('');
      setViewedMonth('');
      setSelectedDate('');
      setSelectedStartIso('');
      setSubmitError('');
      setSuccessBooking(null);
      setIsSubmitting(false);
      setFormState(INITIAL_FORM_STATE);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const selectedDay = useMemo(() => {
    if (!availability || !selectedDate) {
      return null;
    }
    return availability.days.find((day) => day.date === selectedDate) || null;
  }, [availability, selectedDate]);

  const selectedSlot = useMemo(() => {
    if (!selectedDay || !selectedStartIso) {
      return null;
    }
    return selectedDay.slots.find((slot) => slot.startIso === selectedStartIso) || null;
  }, [selectedDay, selectedStartIso]);

  const availabilityByDate = useMemo(() => {
    const map = new Map<string, AvailabilityDay>();
    if (!availability) {
      return map;
    }

    for (const day of availability.days) {
      map.set(day.date, day);
    }

    return map;
  }, [availability]);

  const availableMonthKeys = useMemo(() => {
    if (!availability) {
      return [] as string[];
    }

    const months = new Set<string>();
    for (const day of availability.days) {
      months.add(getMonthKey(day.date));
    }

    return Array.from(months).sort();
  }, [availability]);

  const activeMonthKey = useMemo(() => {
    if (viewedMonth && availableMonthKeys.includes(viewedMonth)) {
      return viewedMonth;
    }
    return availableMonthKeys[0] || '';
  }, [availableMonthKeys, viewedMonth]);

  const activeMonthIndex = useMemo(
    () => availableMonthKeys.indexOf(activeMonthKey),
    [availableMonthKeys, activeMonthKey],
  );

  const monthLabel = useMemo(() => formatMonthLabel(activeMonthKey), [activeMonthKey]);

  const calendarCells = useMemo(() => {
    if (!activeMonthKey) {
      return [] as Array<{ kind: 'empty' } | { kind: 'day'; dateKey: string; day: number; slotCount: number }>;
    }

    const parsedMonth = parseMonthKey(activeMonthKey);
    if (!parsedMonth) {
      return [] as Array<{ kind: 'empty' } | { kind: 'day'; dateKey: string; day: number; slotCount: number }>;
    }

    const firstWeekday = getFirstWeekdayOfMonth(parsedMonth.year, parsedMonth.monthIndex);
    const daysInMonth = getDaysInMonth(parsedMonth.year, parsedMonth.monthIndex);
    const cells: Array<{ kind: 'empty' } | { kind: 'day'; dateKey: string; day: number; slotCount: number }> = [];

    for (let index = 0; index < firstWeekday; index += 1) {
      cells.push({ kind: 'empty' });
    }

    for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
      const dateKey = toDateKey(parsedMonth.year, parsedMonth.monthIndex, dayNumber);
      const availabilityDay = availabilityByDate.get(dateKey);
      cells.push({
        kind: 'day',
        dateKey,
        day: dayNumber,
        slotCount: availabilityDay?.slots.length || 0,
      });
    }

    return cells;
  }, [activeMonthKey, availabilityByDate]);

  const canGoToPreviousMonth = activeMonthIndex > 0;
  const canGoToNextMonth =
    activeMonthIndex >= 0 && activeMonthIndex < availableMonthKeys.length - 1;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDateSelection = (date: string) => {
    if (!availability) {
      return;
    }

    const day = availability.days.find((item) => item.date === date);
    setViewedMonth(getMonthKey(date));
    setSelectedDate(date);
    setSelectedStartIso(day?.slots[0]?.startIso || '');
  };

  const handleMonthNavigation = (direction: 'previous' | 'next') => {
    if (activeMonthIndex < 0) {
      return;
    }

    const delta = direction === 'previous' ? -1 : 1;
    const nextMonthKey = availableMonthKeys[activeMonthIndex + delta];
    if (!nextMonthKey) {
      return;
    }

    setViewedMonth(nextMonthKey);

    if (selectedDate && getMonthKey(selectedDate) === nextMonthKey) {
      return;
    }

    const firstAvailableDayInMonth = availability?.days.find((day) => getMonthKey(day.date) === nextMonthKey);
    if (!firstAvailableDayInMonth) {
      setSelectedDate('');
      setSelectedStartIso('');
      return;
    }

    setSelectedDate(firstAvailableDayInMonth.date);
    setSelectedStartIso(firstAvailableDayInMonth.slots[0]?.startIso || '');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedSlot) {
      setSubmitError('Please select an available time slot.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          startIso: selectedSlot.startIso,
          source,
        }),
      });

      const data = await safeJson<{
        booking?: BookingConfirmation;
        availability?: BookingAvailability;
        simulated?: boolean;
        error?: string;
      }>(response);

      if (!response.ok || !data?.booking) {
        setSubmitError(data?.error || 'Unable to complete booking. Please try again.');
        if (data?.availability) {
          setAvailability(data.availability);
          syncSelectedSlotFromAvailability(data.availability);
        } else {
          void loadAvailability();
        }
        return;
      }

      setSuccessBooking({
        ...data.booking,
        simulated: Boolean(data.simulated),
      });
      setFormState(INITIAL_FORM_STATE);
      void loadAvailability();
    } catch (error) {
      console.error('Booking submission failed:', error);
      setSubmitError('Unexpected error while booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] p-4 md:p-8 flex items-start justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close booking modal"
      />

      <div className="relative z-10 w-full max-w-5xl max-h-[92svh] bg-bg text-ink rounded-3xl border border-ink/10 shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 md:px-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-ink/50">Book A Call</p>
            <h2 className="font-display text-3xl uppercase mt-1">Strategy Session</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-bg transition-colors"
            aria-label="Close booking modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[calc(92svh-96px)] overflow-y-auto p-6 md:p-8">
          {successBooking ? (
            <div className="max-w-2xl mx-auto rounded-3xl border border-accent/30 bg-accent/5 p-8">
              <div className="flex items-center gap-3 mb-5 text-accent">
                <CircleCheckBig size={24} />
                <h3 className="font-display text-2xl uppercase">Booking Confirmed</h3>
              </div>
              {successBooking.simulated ? (
                <div className="rounded-2xl border border-amber-400/35 bg-amber-400/10 p-4 text-sm text-amber-700 font-medium mb-6">
                  Booking is saved, but email sending is currently disabled on server.
                  Configure `RESEND_API_KEY` + `RESEND_FROM_EMAIL` to send confirmations.
                </div>
              ) : (
                <p className="text-ink/80 font-medium mb-6">
                  Confirmation email has been sent to <strong>{successBooking.email}</strong>.
                </p>
              )}
              <div className="space-y-2 text-sm md:text-base text-ink/80 mb-8">
                <p><strong>Date:</strong> {successBooking.dateLabel}</p>
                <p><strong>Time:</strong> {successBooking.timeLabel}</p>
                <p><strong>Duration:</strong> {successBooking.durationMinutes} minutes</p>
                <p><strong>Meeting Link:</strong> Shared manually by Symphosys</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  size="md"
                  className="w-full sm:w-auto"
                  onClick={() => setSuccessBooking(null)}
                >
                  Book Another Call
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="rounded-3xl border border-ink/10 bg-surface p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarClock size={18} className="text-accent" />
                  <h3 className="font-display text-xl uppercase">Pick Date & Time</h3>
                </div>

                {availability ? (
                  <div className="space-y-4 mb-5">
                    <div className="text-sm text-ink/70">
                      <p><strong>Timezone:</strong> {availability.timezone}</p>
                      <p><strong>Hours:</strong> {availability.availableHours}</p>
                      <p><strong>Duration:</strong> {availability.durationMinutes} min (+{availability.bufferMinutes} min buffer)</p>
                    </div>
                  </div>
                ) : null}

                {isLoadingAvailability ? (
                  <p className="text-ink/60 font-medium">Loading available slots...</p>
                ) : availabilityError ? (
                  <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4">
                    <p className="text-sm text-red-600 font-medium mb-3">{availabilityError}</p>
                    <Button type="button" size="sm" onClick={() => void loadAvailability()}>
                      Retry
                    </Button>
                  </div>
                ) : availability ? (
                  <>
                    {availability.days.length > 0 ? (
                      <>
                        <div className="rounded-2xl border border-ink/10 bg-bg p-3 md:p-4">
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <button
                              type="button"
                              onClick={() => handleMonthNavigation('previous')}
                              disabled={!canGoToPreviousMonth}
                              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                                canGoToPreviousMonth
                                  ? 'border-ink/20 text-ink/70 hover:border-accent/40 hover:text-accent'
                                  : 'border-ink/10 text-ink/30 cursor-not-allowed'
                              }`}
                              aria-label="Previous month"
                            >
                              <ChevronLeft size={16} />
                            </button>

                            <p className="font-display text-lg uppercase">{monthLabel}</p>

                            <button
                              type="button"
                              onClick={() => handleMonthNavigation('next')}
                              disabled={!canGoToNextMonth}
                              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                                canGoToNextMonth
                                  ? 'border-ink/20 text-ink/70 hover:border-accent/40 hover:text-accent'
                                  : 'border-ink/10 text-ink/30 cursor-not-allowed'
                              }`}
                              aria-label="Next month"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>

                          <div className="grid grid-cols-7 gap-1 mb-2">
                            {WEEKDAY_HEADERS.map((label) => (
                              <div
                                key={label}
                                className="text-[10px] uppercase tracking-[0.15em] font-bold text-center text-ink/40 py-1"
                              >
                                {label}
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-7 gap-1">
                            {calendarCells.map((cell, index) => {
                              if (cell.kind === 'empty') {
                                return <div key={`empty-${index}`} className="aspect-square" />;
                              }

                              const isActive = cell.dateKey === selectedDate;
                              const isAvailable = cell.slotCount > 0;

                              return (
                                <button
                                  key={cell.dateKey}
                                  type="button"
                                  onClick={() => handleDateSelection(cell.dateKey)}
                                  disabled={!isAvailable}
                                  className={`aspect-square rounded-lg border px-1 py-1 text-xs md:text-sm font-semibold transition-colors flex flex-col items-center justify-center ${
                                    isActive
                                      ? 'bg-ink text-bg border-ink'
                                      : isAvailable
                                        ? 'bg-white border-ink/15 text-ink/75 hover:border-accent/40 hover:text-accent'
                                        : 'bg-bg border-ink/10 text-ink/30 cursor-not-allowed'
                                  }`}
                                  aria-label={`${cell.day} ${monthLabel}`}
                                >
                                  <span>{cell.day}</span>
                                  {isAvailable ? (
                                    <span className={`text-[10px] ${isActive ? 'text-bg/75' : 'text-ink/45'}`}>
                                      {cell.slotCount}
                                    </span>
                                  ) : null}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="mt-5">
                          <p className="text-xs uppercase tracking-[0.16em] font-bold text-ink/50 mb-3">
                            {selectedDay ? `Available Slots • ${selectedDay.label}` : 'Available Slots'}
                          </p>
                          {selectedDay && selectedDay.slots.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {selectedDay.slots.map((slot) => {
                                const isActive = slot.startIso === selectedStartIso;
                                return (
                                  <button
                                    key={slot.startIso}
                                    type="button"
                                    onClick={() => setSelectedStartIso(slot.startIso)}
                                    className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                                      isActive
                                        ? 'bg-accent text-white border-accent'
                                        : 'bg-bg border-ink/15 text-ink/70 hover:border-accent/35 hover:text-accent'
                                    }`}
                                  >
                                    {slot.displayTime}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-sm text-ink/60">No slots available for this date.</p>
                          )}
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-ink/60">No slots available right now. Please check again later.</p>
                    )}
                  </>
                ) : null}
              </section>

              <section className="rounded-3xl border border-ink/10 bg-surface p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock3 size={18} className="text-accent" />
                  <h3 className="font-display text-xl uppercase">Your Details</h3>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="booking-name" className="text-xs uppercase tracking-[0.16em] font-bold text-ink/50">
                      Full Name
                    </label>
                    <input
                      id="booking-name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="mt-2 w-full rounded-xl border border-ink/15 bg-bg px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-email" className="text-xs uppercase tracking-[0.16em] font-bold text-ink/50">
                      Email Address
                    </label>
                    <input
                      id="booking-email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="you@company.com"
                      className="mt-2 w-full rounded-xl border border-ink/15 bg-bg px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="booking-company" className="text-xs uppercase tracking-[0.16em] font-bold text-ink/50">
                        Company
                      </label>
                      <input
                        id="booking-company"
                        name="company"
                        type="text"
                        value={formState.company}
                        onChange={handleInputChange}
                        placeholder="Your Company"
                        className="mt-2 w-full rounded-xl border border-ink/15 bg-bg px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-phone" className="text-xs uppercase tracking-[0.16em] font-bold text-ink/50">
                        Phone
                      </label>
                      <input
                        id="booking-phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleInputChange}
                        placeholder="+1 555 000 0000"
                        className="mt-2 w-full rounded-xl border border-ink/15 bg-bg px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-notes" className="text-xs uppercase tracking-[0.16em] font-bold text-ink/50">
                      Notes (Optional)
                    </label>
                    <textarea
                      id="booking-notes"
                      name="notes"
                      rows={4}
                      value={formState.notes}
                      onChange={handleInputChange}
                      placeholder="Share context for the call."
                      className="mt-2 w-full rounded-xl border border-ink/15 bg-bg px-4 py-3 text-sm md:text-base resize-none focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40"
                    />
                  </div>

                  <div className="rounded-2xl border border-ink/10 bg-bg px-4 py-3 text-xs md:text-sm text-ink/70">
                    Meet link is sent manually by Symphosys after booking.
                  </div>

                  {submitError ? (
                    <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-600 font-medium flex items-start gap-2">
                      <CircleAlert size={16} className="mt-[2px] shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  ) : null}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full justify-center"
                    disabled={isSubmitting || !selectedSlot}
                  >
                    {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                  </Button>
                </form>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
