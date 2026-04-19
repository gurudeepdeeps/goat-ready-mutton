import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Ruler, Camera, CheckCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="card group hover:border-primary-500 transition-all duration-300"
  >
    <div className="bg-primary-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-primary-100 group-hover:bg-primary-600 transition-colors duration-300">
      <Icon className="text-primary-600 w-7 h-7 group-hover:text-white transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </motion.div>
);

const Home = () => {
  const { t } = useTranslation();

  const stats = [
    { labelKey: 'Breeds Supported', value: '50+' },
    { labelKey: 'Predictions Made', value: '10k+' },
    { labelKey: 'Accuracy Rate', value: '98%' },
    { labelKey: 'Farmers Helped', value: '5k+' },
  ];

  const techItems = [
    { titleKey: 'Genetic Factor Analysis', descKey: 'genetic_desc' },
    { titleKey: 'Age & Feeding State', descKey: 'age_desc' },
    { titleKey: 'Fat Condition Scoring', descKey: 'fat_desc' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-primary-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-200 bg-white shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse" />
              <span className="text-xs font-bold text-primary-900 tracking-wider uppercase">{t('AI-Powered Agriculture')}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
              {t('AI Goat Ready Mutton Prediction')}
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/predict-weight" className="btn-primary flex items-center justify-center gap-2">
                {t('Start Prediction CTA')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/predict-image" className="btn-secondary flex items-center justify-center gap-2">
                <Camera className="w-5 h-5" /> {t('Upload Goat Image')}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative hidden lg:block"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-200 rounded-full blur-[100px] opacity-20" />
            <div className="card glass p-2 relative overflow-hidden">
               <img 
                src="/assets/goat.png" 
                alt="Goat Analysis AI" 
                className="rounded-xl w-full h-[500px] object-cover"
              />
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur px-4 py-2 rounded-lg border border-primary-100 shadow-xl flex items-center gap-2 animate-bounce">
                <ShieldCheck className="text-primary-600 w-5 h-5" />
                <span className="text-sm font-bold text-slate-800">{t('92% Accuracy')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-black mb-1">{stat.value}</div>
              <div className="text-primary-300 text-sm">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">{t('Powerful Prediction Engine')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t('features_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={Scale} title={t('Weight-based Prediction')} description={t('weight_desc')} delay={0.1} />
            <FeatureCard icon={Ruler} title={t('Measurement Analysis')} description={t('measurement_desc')} delay={0.2} />
            <FeatureCard icon={Camera} title={t('Image-based Estimation')} description={t('image_desc')} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-8">{t('Breed-Aware Dressing Percentage Logic')}</h2>
            <div className="space-y-6">
              {techItems.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle className="text-primary-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{t(item.titleKey)}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{t(item.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-2xl relative">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-xl">{t('Breed Accuracy Comparison')}</h3>
              <Zap className="text-accent w-6 h-6 fill-accent" />
            </div>
            <div className="space-y-6">
              {[
                { name: 'Boer Cross', score: 98 },
                { name: 'Jamunapari', score: 95 },
                { name: 'Osmanabadi', score: 92 },
                { name: 'Sirohi', score: 90 }
              ].map((breed, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>{breed.name}</span>
                    <span className="text-primary-600">{breed.score}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${breed.score}%` }}
                      className="h-full bg-primary-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
