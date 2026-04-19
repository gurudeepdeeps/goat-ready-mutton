import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import BrandLogo from './BrandLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.slice(0, 2) || 'en';
  const [installPrompt, setInstallPrompt] = useState(null);

  React.useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Weight', path: '/predict-weight' },
    { name: 'Measurements', path: '/predict-measurements' },
    { name: 'Image AI', path: '/predict-image' },
    { name: 'History', path: '/history' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <BrandLogo
                alt="GoatReady Mutton logo"
                className="w-10 h-10 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary-600/20"
              />
              <span className="font-bold text-xl tracking-tight text-slate-800">
                GoatReady <span className="text-primary-600">Mutton</span>
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold whitespace-nowrap transition-colors hover:text-primary-600 ${
                  location.pathname === link.path ? 'text-primary-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                <Globe className="w-4 h-4 text-slate-500" />
                <select 
                    className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
                    value={currentLang}
                    onChange={handleLanguageChange}
                >
                    <option value="en">English</option>
                    <option value="kn">ಕನ್ನಡ</option>
                </select>
            </div>
            {installPrompt && (
              <button 
                onClick={handleInstallClick}
                className="h-12 px-4 inline-flex items-center justify-center gap-2 whitespace-nowrap bg-primary-50 text-primary-700 rounded-xl text-sm font-bold hover:bg-primary-100 transition-colors border border-primary-200"
              >
                <Download className="w-4 h-4" />
                Install App
              </button>
            )}
            <Link to="/predict-weight" className="btn-primary h-12 px-4 text-sm whitespace-nowrap">
              Start Prediction
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-primary-600 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 rounded-md text-base font-medium ${
                  location.pathname === link.path ? 'bg-primary-50 text-primary-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center justify-between px-3 py-4 mt-2 border-t border-slate-100">
                <span className="text-base font-medium text-slate-600">Language</span>
                <select 
                    className="bg-slate-50 px-2 py-1 rounded border border-slate-200 text-slate-700 outline-none"
                    value={currentLang}
                    onChange={handleLanguageChange}
                >
                    <option value="en">English</option>
                    <option value="kn">ಕನ್ನಡ</option>
                </select>
            </div>
            {installPrompt && (
              <div className="px-3 py-4 border-t border-slate-100">
                <button 
                  onClick={handleInstallClick}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-3 rounded-xl font-bold"
                >
                  <Download className="w-5 h-5" />
                  Install App
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
