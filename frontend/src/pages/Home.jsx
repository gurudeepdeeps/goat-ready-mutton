import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Ruler, Camera, CheckCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

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
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-primary-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-200 bg-white shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse" />
              <span className="text-xs font-bold text-primary-900 tracking-wider uppercase">AI-Powered Agriculture</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
              AI Goat Ready <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                Mutton Prediction
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Estimate ready mutton weight before slaughter with high accuracy using live weight, 
              body measurements, or goat image upload.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/predict-weight" className="btn-primary flex items-center justify-center gap-2">
                Start Prediction <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/predict-image" className="btn-secondary flex items-center justify-center gap-2">
                <Camera className="w-5 h-5" /> Upload Goat Image
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
                <span className="text-sm font-bold text-slate-800">92% Accuracy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Breeds Supported', value: '50+' },
            { label: 'Predictions Made', value: '10k+' },
            { label: 'Accuracy Rate', value: '98%' },
            { label: 'Farmers Helped', value: '5k+' }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-black mb-1">{stat.value}</div>
              <div className="text-primary-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Powerful Prediction Engine</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our tool uses advanced biometric algorithms to provide reliable estimates for mutton weight.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Scale}
              title="Weight-based Prediction"
              description="Calculate slaughtered weight instantly using manual live weight and genetic traits."
              delay={0.1}
            />
            <FeatureCard 
              icon={Ruler}
              title="Measurement Analysis"
              description="No scale? Use heart girth and body length to estimate live and ready mutton weight."
              delay={0.2}
            />
            <FeatureCard 
              icon={Camera}
              title="Image-based Estimation"
              description="Upload a side-view image to simulate body dimension detection and prediction."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-8">Breed-Aware <br/>Dressing Percentage Logic</h2>
            <div className="space-y-6">
              {[
                { title: 'Genetic Factor Analysis', desc: 'Adjusts base dressing percentage based on breed specific fat-to-muscle ratios.' },
                { title: 'Age & Feeding State', desc: 'Accounts for gut fill and age-related carcass yield variations.' },
                { title: 'Fat Condition Scoring', desc: 'Fine-tunes results based on the physical condition of the animal.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle className="text-primary-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-2xl relative">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-xl">Breed Accuracy Comparison</h3>
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
