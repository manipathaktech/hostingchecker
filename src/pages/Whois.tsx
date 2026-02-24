import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Info } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Whois = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <Helmet>
        <title>WHOIS Lookup | Hosting Checker</title>
        <meta name="description" content="Free WHOIS lookup tool by WebSEOTrends to find domain registration details, owner information, and expiry dates." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-slate-900">WHOIS Lookup</h1>
                <p className="text-lg text-slate-500">Find out who owns a domain and when it expires.</p>
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
                    Lookup
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex gap-4">
                <Info className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Note: Many registrars now use WHOIS privacy protection, which may hide the actual owner's contact information.
                </p>
              </div>

              <div className="prose prose-slate max-w-none">
                <h2>What is WHOIS?</h2>
                <p>WHOIS is a query and response protocol that is widely used for querying databases that store the registered users or assignees of an Internet resource, such as a domain name, an IP address block, or an autonomous system.</p>
                <p>When you register a domain name, the Internet Corporation for Assigned Names and Numbers (ICANN) requires your domain name registrar to submit your personal contact information to the WHOIS database.</p>
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

export default Whois;
