import { Resend } from 'resend';

const FROM_EMAIL = 'Symphosys <onboarding@resend.dev>';

interface SubscribePayload {
  email?: string;
}

function parseRequestBody(req: any): SubscribePayload {
  if (!req?.body) {
    return {};
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as SubscribePayload;
    } catch {
      return {};
    }
  }

  return req.body as SubscribePayload;
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

  const { email = '' } = parseRequestBody(req);
  const trimmedEmail = email.trim();

  if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Simulating subscription success.');
    return res.status(200).json({ success: true, simulated: true });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: trimmedEmail,
      subject: 'Welcome to the Symphosys Newsletter',
      html: `
        <h2>Welcome to Symphosys</h2>
        <p>Thanks for subscribing with <strong>${escapeHtml(trimmedEmail)}</strong>.</p>
        <p>You will receive our latest insights, case studies, and growth strategies.</p>
      `,
    });

    if (response.error) {
      return res.status(400).json({ error: response.error.message });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return res.status(500).json({ error: 'Failed to subscribe.' });
  }
}
