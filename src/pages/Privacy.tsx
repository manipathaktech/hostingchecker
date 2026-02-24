import React from 'react';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <Helmet>
        <title>Privacy Policy | Hosting Checker</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm prose prose-slate max-w-none">
          <h1>Privacy Policy</h1>
          <p className="text-slate-500">Last updated: February 23, 2026</p>
          
          <p>At Hosting Checker, we take your privacy seriously. This policy describes how we collect, use, and handle your information when you use our website and services.</p>

          <h2>1. Information We Collect</h2>
          <p>We collect minimal information to provide our services:</p>
          <ul>
            <li><strong>Usage Data:</strong> We may collect information about how you access and use the service (e.g., domain lookups performed).</li>
            <li><strong>Cookies:</strong> We use cookies to enhance your experience and analyze our traffic.</li>
          </ul>

          <h2>2. How We Use Information</h2>
          <p>We use the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain our service.</li>
            <li>To notify you about changes to our service.</li>
            <li>To provide customer support.</li>
            <li>To gather analysis or valuable information so that we can improve our service.</li>
          </ul>

          <h2>3. Data Security</h2>
          <p>The security of your data is important to us, but remember that no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.</p>

          <h2>4. Third-Party Services</h2>
          <p>We may employ third-party companies and individuals to facilitate our service (e.g., analytics providers). These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

          <h2>5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@webseotrends.com.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
