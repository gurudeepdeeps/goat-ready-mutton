import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { i18n } = useTranslation();

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
              <div className="bg-primary-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary-600/20">
                <Leaf className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">
                GoatReady <span className="text-primary-600">Mutton</span>
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-primary-600 ${
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
                    value={i18n.language}
                    onChange={handleLanguageChange}
                >
                    <option value="en">English</option>
                    <option value="kn">ಕನ್ನಡ</option>
                </select>
            </div>
            <Link to="/predict-weight" className="btn-primary py-2 px-4 text-sm">
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
                    value={i18n.language}
                    onChange={handleLanguageChange}
                >
                    <option value="en">English</option>
                    <option value="kn">ಕನ್ನಡ</option>
                </select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
