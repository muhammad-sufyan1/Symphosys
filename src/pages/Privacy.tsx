import React from 'react';
import { Helmet } from 'react-helmet-async';

export function Privacy() {
  return (
    <div className="min-h-screen bg-bg text-ink pt-32 pb-24 selection:bg-accent selection:text-white">
      <Helmet>
        <title>Privacy Policy | Symphosys</title>
        <meta name="description" content="Privacy Policy for Symphosys digital agency." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="font-display text-4xl md:text-6xl uppercase leading-none mb-12">
          Privacy <span className="text-accent">Policy</span>
        </h1>
        
        <div className="prose prose-lg prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-a:text-accent hover:prose-a:text-ink max-w-none text-ink/80">
          <p className="font-medium text-xl mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl mt-12 mb-4 text-ink">1. Introduction</h2>
          <p>
            Symphosys ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-2xl mt-12 mb-4 text-ink">2. The Data We Collect</h2>
          <p>
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-4 text-ink">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-4 text-ink">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>

          <h2 className="text-2xl mt-12 mb-4 text-ink">5. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
          </p>

          <h2 className="text-2xl mt-12 mb-4 text-ink">6. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
          </p>

          <h2 className="text-2xl mt-12 mb-4 text-ink">7. Contact Details</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us in the following ways:
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
