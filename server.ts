import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";
import bookCallHandler from "./api/book-call";

dotenv.config();

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  const HMR_PORT = Number(process.env.VITE_HMR_PORT || 24679);

  app.use(express.json());

  // API routes FIRST
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, budget, message } = req.body;

      if (!process.env.RESEND_API_KEY || !resend) {
        // If no API key, just simulate success for the demo
        console.warn("RESEND_API_KEY is not set. Simulating email send.");
        return res.json({ success: true, simulated: true });
      }

      // Email to the user (Auto-reply)
      const userEmailHtml = `
        <div style="background-color: #000000; padding: 40px 20px; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border-radius: 16px; border: 1px solid #1a1a1a; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            
            <!-- Header -->
            <div style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #1a1a1a;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; color: #ffffff;">SYMPHOSYS</h1>
              <p style="margin: 8px 0 0 0; color: #F27D26; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Digital Growth Agency</p>
            </div>
            
            <!-- Body -->
            <div style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 400; color: #ffffff;">Hello <span style="color: #F27D26;">${name}</span>,</h2>
              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #a0a0a0;">
                Thank you for reaching out to Symphosys. We have received your inquiry and our team is currently reviewing your project details.
              </p>
              
              <!-- Card for Query Summary -->
              <div style="background-color: #111111; border-radius: 12px; padding: 24px; margin-bottom: 32px; border-left: 4px solid #F27D26;">
                <h3 style="margin: 0 0 20px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #F27D26;">Your Query Summary</h3>
                
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                  <tr>
                    <td width="100" style="padding-bottom: 12px; font-size: 14px; color: #808080;">Company</td>
                    <td style="padding-bottom: 12px; font-size: 14px; color: #ffffff; font-weight: 500;">${company || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td width="100" style="padding-bottom: 12px; font-size: 14px; color: #808080;">Budget</td>
                    <td style="padding-bottom: 12px; font-size: 14px; color: #ffffff; font-weight: 500;">${budget || 'Not specified'}</td>
                  </tr>
                </table>
                
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #808080;">Message</p>
                <div style="font-size: 14px; line-height: 1.6; color: #e0e0e0; background: #050505; padding: 16px; border-radius: 8px; border: 1px solid #1a1a1a;">
                  ${message}
                </div>
              </div>
              
              <!-- CTA -->
              <div style="text-align: center; padding: 32px 0; border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a; margin-bottom: 32px;">
                <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 500; color: #ffffff;">Need immediate assistance?</h3>
                <p style="margin: 0 0 24px 0; font-size: 15px; color: #808080;">If you want to contact us right now, please call our direct line:</p>
                <a href="tel:+17789006780" style="display: inline-block; background-color: #F27D26; color: #000000; text-decoration: none; padding: 16px 32px; border-radius: 100px; font-weight: 600; font-size: 15px; letter-spacing: 0.5px;">+1 778-900-6780</a>
              </div>
              
              <p style="margin: 0; font-size: 15px; color: #808080; text-align: center; line-height: 1.6;">
                We will be in touch shortly.<br/>
                <strong style="color: #ffffff; font-weight: 500;">The Symphosys Team</strong>
              </p>
            </div>
            
            <!-- Footer -->
            <div style="padding: 24px; text-align: center; background-color: #050505; border-top: 1px solid #1a1a1a;">
              <p style="margin: 0; font-size: 12px; color: #505050; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} Symphosys Digital Agency. All rights reserved.<br/>
                1443 SW 1200th Rd, Holden, Missouri, USA
              </p>
            </div>
          </div>
        </div>
      `;

      // Send email to the user
      const userEmailResponse = await resend.emails.send({
        from: "Symphosys <onboarding@resend.dev>", // Using Resend's testing domain
        to: email,
        subject: "We received your inquiry - Symphosys",
        html: userEmailHtml,
      });

      if (userEmailResponse.error) {
        console.error("Resend API Error (User Email):", userEmailResponse.error);
        return res.status(400).json({ error: userEmailResponse.error.message });
      }

      // Send email to the admin
      const adminEmailHtml = `
        <div style="background-color: #000000; padding: 40px 20px; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border-radius: 16px; border: 1px solid #1a1a1a; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            
            <div style="padding: 30px 40px; border-bottom: 1px solid #1a1a1a; background-color: #F27D26;">
              <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #000000; letter-spacing: 0.5px;">New Contact Inquiry</h2>
            </div>
            
            <div style="padding: 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td width="120" style="padding-bottom: 16px; font-size: 14px; color: #808080; text-transform: uppercase; letter-spacing: 1px;">Name</td>
                  <td style="padding-bottom: 16px; font-size: 15px; color: #ffffff; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td width="120" style="padding-bottom: 16px; font-size: 14px; color: #808080; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                  <td style="padding-bottom: 16px; font-size: 15px; color: #F27D26; font-weight: 500;"><a href="mailto:${email}" style="color: #F27D26; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td width="120" style="padding-bottom: 16px; font-size: 14px; color: #808080; text-transform: uppercase; letter-spacing: 1px;">Company</td>
                  <td style="padding-bottom: 16px; font-size: 15px; color: #ffffff; font-weight: 500;">${company || 'N/A'}</td>
                </tr>
                <tr>
                  <td width="120" style="padding-bottom: 16px; font-size: 14px; color: #808080; text-transform: uppercase; letter-spacing: 1px;">Budget</td>
                  <td style="padding-bottom: 16px; font-size: 15px; color: #ffffff; font-weight: 500;">${budget || 'Not specified'}</td>
                </tr>
              </table>
              
              <div style="background-color: #111111; border-radius: 12px; padding: 24px; border: 1px solid #1a1a1a;">
                <h3 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #808080;">Message</h3>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #e0e0e0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
          </div>
        </div>
      `;

      const adminEmailResponse = await resend.emails.send({
        from: "Symphosys <onboarding@resend.dev>",
        to: "sufyan.vu07@gmail.com", // Admin email
        subject: `New Inquiry from ${name} (${company || 'No Company'})`,
        html: adminEmailHtml,
      });

      if (adminEmailResponse.error) {
        console.error("Resend API Error (Admin Email):", adminEmailResponse.error);
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = req.body;

      if (!process.env.RESEND_API_KEY || !resend) {
        console.warn("RESEND_API_KEY is not set. Simulating subscription.");
        return res.json({ success: true, simulated: true });
      }

      // Send a welcome email to the subscriber
      const subscriberEmailHtml = `
        <div style="background-color: #000000; padding: 40px 20px; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border-radius: 16px; border: 1px solid #1a1a1a; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            
            <!-- Header -->
            <div style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #1a1a1a;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; color: #ffffff;">SYMPHOSYS</h1>
              <p style="margin: 8px 0 0 0; color: #F27D26; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Digital Growth Agency</p>
            </div>
            
            <!-- Body -->
            <div style="padding: 40px; text-align: center;">
              <div style="width: 64px; height: 64px; background-color: rgba(242, 125, 38, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
                <span style="font-size: 32px;">✨</span>
              </div>
              
              <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 500; color: #ffffff;">Welcome to the Symphony!</h2>
              <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #a0a0a0;">
                Thank you for subscribing to the Symphosys newsletter. You're now on the list to receive our latest insights, case studies, and strategies for digital growth.
              </p>
              
              <div style="background-color: #111111; border-radius: 12px; padding: 24px; margin-bottom: 32px; border: 1px solid #1a1a1a; text-align: left;">
                <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 500; color: #ffffff;">What to expect:</h3>
                <ul style="margin: 0; padding-left: 20px; color: #808080; font-size: 15px; line-height: 1.8;">
                  <li>Exclusive digital growth strategies</li>
                  <li>Early access to our case studies</li>
                  <li>Industry insights and trends</li>
                </ul>
              </div>
              
              <p style="margin: 0; font-size: 15px; color: #808080; text-align: center; line-height: 1.6;">
                Stay tuned for our next update.<br/>
                <strong style="color: #ffffff; font-weight: 500;">The Symphosys Team</strong>
              </p>
            </div>
            
            <!-- Footer -->
            <div style="padding: 24px; text-align: center; background-color: #050505; border-top: 1px solid #1a1a1a;">
              <p style="margin: 0; font-size: 12px; color: #505050; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} Symphosys Digital Agency. All rights reserved.<br/>
                1443 SW 1200th Rd, Holden, Missouri, USA
              </p>
            </div>
          </div>
        </div>
      `;

      const subscriberEmailResponse = await resend.emails.send({
        from: "Symphosys <onboarding@resend.dev>", // Using Resend's testing domain
        to: email,
        subject: "Welcome to the Symphosys Newsletter",
        html: subscriberEmailHtml,
      });

      if (subscriberEmailResponse.error) {
        console.error("Resend API Error (Subscriber Email):", subscriberEmailResponse.error);
        return res.status(400).json({ error: subscriberEmailResponse.error.message });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error subscribing:", error);
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  app.all("/api/book-call", async (req, res) => {
    await bookCallHandler(req, res);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          port: HMR_PORT,
        },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
