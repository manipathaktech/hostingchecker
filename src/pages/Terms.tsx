import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <Helmet>
        <title>Terms of Service | Hosting Checker</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm prose prose-slate max-w-none">
          <h1>Terms of Service</h1>
          <p className="text-slate-500">Last updated: February 23, 2026</p>

          <p>By accessing the website at hosting-checker.webseotrends.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>

          <h2>1. Use License</h2>
          <p>Permission is granted to temporarily use the tools on Hosting Checker's website for personal, non-commercial transitory viewing only.</p>
          <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>Attempt to decompile or reverse engineer any software contained on Hosting Checker's website;</li>
            <li>Remove any copyright or other proprietary notations from the materials; or</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h2>2. Disclaimer</h2>
          <p>The materials on Hosting Checker's website are provided on an 'as is' basis. Hosting Checker makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h2>3. Limitations</h2>
          <p>In no event shall Hosting Checker or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Hosting Checker's website.</p>

          <h2>4. Accuracy of Materials</h2>
          <p>The materials appearing on Hosting Checker's website could include technical, typographical, or photographic errors. Hosting Checker does not warrant that any of the materials on its website are accurate, complete or current.</p>

          <h2>5. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Hosting Checker operates and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
