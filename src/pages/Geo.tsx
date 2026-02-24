import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, MapPin } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Geo = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <Helmet>
        <title>IP Geolocation | Hosting Checker</title>
        <meta name="description" content="Find the physical location of any IP address or domain name with Hosting Checker. Get city, country, and ISP details." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-slate-900">IP Geolocation</h1>
                <p className="text-lg text-slate-500">Locate any IP address or domain on the map.</p>
              </div>

              <div className="max-w-2xl mx-auto relative group">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="8.8.8.8 or example.com"
                    className="block w-full pl-16 pr-32 py-5 bg-white border-2 border-slate-100 rounded-2xl text-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                  <button className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-8 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                    Locate
                  </button>
                </div>
              </div>

              <div className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
                <div className="text-center space-y-2">
                  <MapPin className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-slate-400 font-medium">Map Preview will appear here after lookup</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h2>What is IP Geolocation?</h2>
                <p>IP Geolocation is the identification or estimation of the real-world geographic location of an object, such as a mobile phone or computer terminal, connected to the Internet.</p>
                <p>This technology is used for various purposes, including content localization (showing the right language), fraud detection, and targeted advertising.</p>
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

export default Geo;
