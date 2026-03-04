import { Resend } from 'resend';

const FROM_EMAIL = 'Symphosys <onboarding@resend.dev>';
const ADMIN_EMAIL = 'sufyan.vu07@gmail.com';

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  message?: string;
}

function parseRequestBody(req: any): ContactPayload {
  if (!req?.body) {
    return {};
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as ContactPayload;
    } catch {
      return {};
    }
  }

  return req.body as ContactPayload;
}

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name = '', email = '', company = '', budget = '', message = '' } = parseRequestBody(req);

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedCompany = company.trim();
  const trimmedBudget = budget.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (!isValidEmail(trimmedEmail)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Simulating contact form success.');
    return res.status(200).json({ success: true, simulated: true });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(trimmedName);
    const safeCompany = escapeHtml(trimmedCompany || 'N/A');
    const safeBudget = escapeHtml(trimmedBudget || 'Not specified');
    const safeMessage = escapeHtml(trimmedMessage);

    const userReply = await resend.emails.send({
      from: FROM_EMAIL,
      to: trimmedEmail,
      subject: 'We received your inquiry - Symphosys',
      html: `
        <h2>Hello ${safeName},</h2>
        <p>Thank you for contacting Symphosys. We have received your inquiry.</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Budget:</strong> ${safeBudget}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
        <p>Our team will contact you shortly.</p>
      `,
    });

    if (userReply.error) {
      return res.status(400).json({ error: userReply.error.message });
    }

    const adminReply = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Inquiry from ${trimmedName}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Budget:</strong> ${safeBudget}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (adminReply.error) {
      console.error('Resend admin email error:', adminReply.error);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
}
