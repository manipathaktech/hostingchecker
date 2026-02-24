import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Info, ShieldCheck, Users, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <Helmet>
        <title>About Us | Hosting Checker</title>
        <meta name="description" content="Learn more about Hosting Checker, the leading website hosting checker and SEO analysis tool by WebSEOTrends." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-extrabold text-slate-900">About Hosting Checker</h1>
            <p className="text-lg text-slate-500">Empowering web professionals with instant hosting insights.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50 rounded-xl w-fit">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                Our mission is to provide the most accurate and transparent hosting data available on the web. We believe that knowing where a website is hosted shouldn't be a mystery.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl w-fit">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Our Technology</h2>
              <p className="text-slate-600 leading-relaxed">
                We use a combination of DNS analysis, WHOIS database queries, and IP geolocation to provide a comprehensive look at any website's infrastructure.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Why We Built This</h2>
            <p className="text-slate-600 leading-relaxed">
              Hosting Checker was born out of a need for a faster, cleaner, and more reliable hosting checker. As SEO professionals and web developers at WebSEOTrends, we found ourselves constantly checking competitor hosting and server locations. We wanted a tool that didn't just give us an IP, but a full story of the technology stack.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Today, Hosting Checker serves thousands of users daily, from curious individuals to large-scale marketing agencies.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold">Join Our Community</h3>
              <p className="text-slate-400 text-sm">Stay updated with the latest hosting trends and SEO strategies.</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl font-bold transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
