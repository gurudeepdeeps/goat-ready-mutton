import React from 'react';
import { Leaf, Award, Users, Search, Microscope, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const pillars = [
    { icon: Microscope, titleKey: 'Precision Algorithms', descKey: 'precision_desc' },
    { icon: Award, titleKey: 'Slaughter Verified', descKey: 'slaughter_desc' },
    { icon: Users, titleKey: 'Farmer Centric', descKey: 'farmer_desc' },
  ];

  return (
    <div className="bg-white">
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-black text-slate-900 mb-8">{t('About GoatReady Mutton')}</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {t('about_subtitle')}
            </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
            {pillars.map((item, i) => (
                <div key={i} className="text-center group">
                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all text-primary-600">
                        <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{t(item.titleKey)}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{t(item.descKey)}</p>
                </div>
            ))}
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <h2 className="text-4xl font-black mb-8">{t('Our Vision')}</h2>
                      <p className="text-slate-400 text-lg leading-relaxed mb-8">
                          {t('vision_text')}
                      </p>
                      <div className="flex items-center gap-4 py-4 px-6 bg-white/5 rounded-2xl border border-white/10">
                          <Leaf className="text-primary-400 w-10 h-10" />
                          <div>
                              <div className="font-bold text-lg">{t('Sustainable Agriculture')}</div>
                              <div className="text-slate-500 text-sm">{t('sustainable_desc')}</div>
                          </div>
                      </div>
                  </div>
                  <div className="card glass p-8 grid grid-cols-2 gap-4">
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center">
                          <Search className="text-primary-400 w-8 h-8 mb-4" />
                          <span className="text-sm font-bold opacity-60">{t('Verified')}</span>
                      </div>
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                          <BarChart3 className="text-primary-400 w-8 h-8 mb-4" />
                          <span className="text-sm font-bold opacity-60">{t('Real-time Data')}</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default About;
