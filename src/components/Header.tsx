import React, { useState } from 'react';
import { Globe, Menu, X, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'tl', name: 'Tagalog' },
  ];

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Hosting Checker</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">{t('nav.home')}</Link>
            <Link to="/#tool" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">{t('nav.checker')}</Link>
            <Link to="/blog" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">{t('nav.blog')}</Link>
            <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">{t('nav.about')}</Link>
            
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                <Languages className="w-4 h-4" />
                {languages.find(l => l.code === i18n.language.split('-')[0])?.name || 'Language'}
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => changeLanguage(lng.code)}
                    className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    {lng.name}
                  </button>
                ))}
              </div>
            </div>

            <a 
              href="https://webseotrends.com/best-web-hosting/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
            >
              {t('nav.hosting_services')}
            </a>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-4"
          >
            <Link to="/" className="block text-base font-medium text-slate-600" onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</Link>
            <Link to="/#tool" className="block text-base font-medium text-slate-600" onClick={() => setIsMenuOpen(false)}>{t('nav.checker')}</Link>
            <Link to="/blog" className="block text-base font-medium text-slate-600" onClick={() => setIsMenuOpen(false)}>{t('nav.blog')}</Link>
            <Link to="/about" className="block text-base font-medium text-slate-600" onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</Link>
            
            <div className="pt-2 border-t border-slate-50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Language</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => {
                      changeLanguage(lng.code);
                      setIsMenuOpen(false);
                    }}
                    className={`text-sm py-2 px-3 rounded-lg border ${i18n.language.startsWith(lng.code) ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-slate-50 border-slate-100 text-slate-600'}`}
                  >
                    {lng.name}
                  </button>
                ))}
              </div>
            </div>

            <a 
              href="https://webseotrends.com/best-web-hosting/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-indigo-600 text-white px-5 py-3 rounded-xl text-base font-semibold block text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.hosting_services')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
