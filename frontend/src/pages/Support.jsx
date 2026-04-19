import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Support = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-black text-slate-900 mb-4">{t('Contact Support')}</h1>
        <p className="text-slate-600 text-lg">{t('support_subtitle')}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex items-start gap-4 hover:border-primary-300 transition-all">
          <div className="bg-primary-50 p-4 rounded-2xl text-primary-600">
            <Mail className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('Email Us')}</h3>
            <p className="text-slate-500 mb-4">{t('email_desc')}</p>
            <a href="mailto:gurudeepv55@gmail.com" className="text-primary-600 font-bold hover:underline">gurudeepv55@gmail.com</a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex items-start gap-4 hover:border-primary-300 transition-all">
          <div className="bg-primary-50 p-4 rounded-2xl text-primary-600">
            <Phone className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('Call Us')}</h3>
            <p className="text-slate-500 mb-4">{t('call_desc')}</p>
            <a href="tel:+916363770057" className="text-primary-600 font-bold hover:underline">+91 63637 70057</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
