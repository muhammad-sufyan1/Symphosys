import React from 'react';
import { Helmet } from 'react-helmet-async';

export function Terms() {
  return (
    <div className="min-h-screen bg-bg text-ink pt-32 pb-24 selection:bg-accent selection:text-white">
      <Helmet>
        <title>Terms & Conditions | Symphosys</title>
        <meta name="description" content="Terms and conditions for using Symphosys services and website." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="font-display text-4xl md:text-6xl uppercase leading-none mb-12">
          Terms & <span className="text-accent">Conditions</span>
        </h1>
        
        <div className="prose prose-lg prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-a:text-accent hover:prose-a:text-ink max-w-none text-ink/80">
          <p className="font-medium text-xl mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl mt-12 mb-4 text-ink">1. Agreement to Terms</h2>
          <p>
            By accessing our website and using our services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl mt-12 mb-4 text-ink">2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the website and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site are owned or controlled by us and are protected by copyright and trademark laws.
          </p>

          <h2 className="text-2xl mt-12 mb-4 text-ink">3. User Representations</h2>
          <p>
            By using the site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
          </p>

          <h2 className="text-2xl mt-12 mb-4 text-ink">4. Prohibited Activities</h2>
          <p>
            You may not access or use the site for any purpose other than that for which we make the site available. The site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>

          <h2 className="text-2xl mt-12 mb-4 text-ink">5. Modifications and Interruptions</h2>
          <p>
            We reserve the right to change, modify, or remove the contents of the site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our site.
          </p>

          <h2 className="text-2xl mt-12 mb-4 text-ink">6. Governing Law</h2>
          <p>
            These terms shall be governed by and defined following the laws of Missouri, USA. Symphosys and yourself irrevocably consent that the courts of Missouri shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>

          <h2 className="text-2xl mt-12 mb-4 text-ink">7. Contact Us</h2>
          <p>
            In order to resolve a complaint regarding the site or to receive further information regarding use of the site, please contact us at:
            <br /><br />
            <strong>Symphosys</strong><br />
            1443 SW 1200th Rd<br />
            Holden, Missouri, USA<br />
            Phone: +1 778-900-6780<br />
            Email: contact@symphosys.com
          </p>
        </div>
      </div>
    </div>
  );
}
