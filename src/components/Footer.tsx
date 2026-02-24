import React from 'react';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-500 p-1.5 rounded-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Hosting Checker</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">{t('footer.tools')}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">{t('nav.checker')}</Link></li>
              <li><Link to="/whois" className="hover:text-indigo-400 transition-colors">{t('nav.whois')}</Link></li>
              <li><Link to="/dns" className="hover:text-indigo-400 transition-colors">{t('nav.dns')}</Link></li>
              <li><Link to="/geo" className="hover:text-indigo-400 transition-colors">{t('nav.geo')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">{t('footer.company')}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/blog" className="hover:text-indigo-400 transition-colors">{t('nav.blog')}</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">{t('footer.newsletter')}</h4>
            <p className="text-sm text-slate-400 mb-4">{t('footer.newsletter_desc')}</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-indigo-500" />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700">{t('footer.subscribe')}</button>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Hosting Checker. {t('footer.rights')} Affiliate Disclosure: We may earn a commission from some links on this site.</p>
          <div className="flex gap-6">
            <a href="https://x.com/Webseotrends" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a>
            <a href="https://www.facebook.com/webseotrends" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
            <a href="https://www.tumblr.com/webseotrendsdigital" target="_blank" rel="noopener noreferrer" className="hover:text-white">Tumblr</a>
            <a href="https://telegram.me/s/webseotrends" target="_blank" rel="noopener noreferrer" className="hover:text-white">Telegram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
