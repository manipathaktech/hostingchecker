import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Network } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const DnsPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <Helmet>
        <title>DNS Checker | Hosting Checker</title>
        <meta name="description" content="Check DNS records for any domain with Hosting Checker. View A, MX, NS, TXT, and CNAME records instantly." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-slate-900">DNS Checker</h1>
                <p className="text-lg text-slate-500">Check global DNS propagation and record details.</p>
              </div>

              <div className="max-w-2xl mx-auto relative group">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="example.com"
                    className="block w-full pl-16 pr-32 py-5 bg-white border-2 border-slate-100 rounded-2xl text-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                  <button className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-8 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                    Check DNS
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['A', 'MX', 'NS', 'TXT', 'CNAME', 'AAAA'].map(record => (
                  <button key={record} className="py-3 px-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                    {record}
                  </button>
                ))}
              </div>

              <div className="prose prose-slate max-w-none">
                <h2>Why Check DNS Records?</h2>
                <p>DNS (Domain Name System) records are like the phonebook of the internet. They translate human-readable domain names (like google.com) into IP addresses (like 142.250.190.46).</p>
                <p>Checking DNS records is essential for troubleshooting website connectivity issues, verifying email server configurations (MX records), and ensuring that your domain is pointing to the correct hosting provider.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DnsPage;
