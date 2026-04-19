import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { predictMeasurements } from '../api';
import { Ruler, Info, Scale, ShoppingCart, Activity, RefreshCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PredictMeasurements = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    heart_girth: '',
    body_length: '',
    breed: 'Local breed',
    gender: 'Male',
    age: '12 to 24 months',
    feed: 'Normal',
    fat: 'Medium'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const breeds = ['Local breed', 'Boer cross', 'Jamunapari', 'Osmanabadi', 'Sirohi', 'Other'];
  const genders = ['Male', 'Female', 'Castrated male'];
  const ages = ['Below 6 months', '6 to 12 months', '12 to 24 months', '2 to 5 years', 'Above 5 years'];
  const feeds = ['Empty stomach', 'Normal', 'Full stomach'];
  const fats = ['Lean', 'Medium', 'Fat'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await predictMeasurements({
        ...formData,
        heart_girth: parseFloat(formData.heart_girth),
        body_length: parseFloat(formData.body_length)
      });
      setResult(data);
    } catch (err) {
      alert("Prediction failed. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-start">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h1 className="text-4xl font-black text-slate-900 mb-6 flex items-center gap-3">
          <Ruler className="text-primary-600 w-10 h-10" />
          {t('Predict by Measurements')}
        </h1>
        <p className="text-slate-600 mb-10 text-lg">{t('measurements_subtitle')}</p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t('Heart Girth (cm)')}</label>
            <input
              type="number"
              name="heart_girth"
              required
              value={formData.heart_girth}
              onChange={handleChange}
              className="input-field"
              placeholder={t('Measure around chest')}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t('Body Length (cm)')}</label>
            <input
              type="number"
              name="body_length"
              required
              value={formData.body_length}
              onChange={handleChange}
              className="input-field"
              placeholder={t('Shoulder to tail base')}
            />
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
             <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{t('Breed')}</label>
              <select name="breed" value={formData.breed} onChange={handleChange} className="input-field">
                {breeds.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{t('Gender')}</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="input-field">
                {genders.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-slate-700 mb-2">{t('Age')}</label>
              <select name="age" value={formData.age} onChange={handleChange} className="input-field">
                {ages.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t('Feed Condition')}</label>
            <select name="feed" value={formData.feed} onChange={handleChange} className="input-field">
              {feeds.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              disabled={loading}
              type="submit"
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg"
            >
              {loading ? <RefreshCcw className="animate-spin w-5 h-5" /> : t('Run Biometric Analysis')}
            </button>
          </div>
        </form>

        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full" />
            <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Info className="text-primary-400 w-5 h-5" />
                {t('Measurement Tips')}
            </h4>
            <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex gap-3">
                    <div className="h-5 w-5 bg-primary-900 rounded-full border border-primary-600 flex items-center justify-center text-[10px] text-primary-400 font-bold">1</div>
                    <span>{t('tip1')}</span>
                </li>
                <li className="flex gap-3">
                    <div className="h-5 w-5 bg-primary-900 rounded-full border border-primary-600 flex items-center justify-center text-[10px] text-primary-400 font-bold">2</div>
                    <span>{t('tip2')}</span>
                </li>
                <li className="flex gap-3">
                    <div className="h-5 w-5 bg-primary-900 rounded-full border border-primary-600 flex items-center justify-center text-[10px] text-primary-400 font-bold">3</div>
                    <span>{t('tip3')}</span>
                </li>
            </ul>
        </div>
      </motion.div>

      <div className="lg:sticky lg:top-32">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-primary-50 border-2 border-dashed border-primary-200 rounded-3xl p-12 text-center"
            >
              <Ruler className="text-primary-300 w-16 h-16 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-primary-900 mb-2">{t('Analysis Results')}</h3>
              <p className="text-primary-700">{t('analysis_placeholder')}</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-primary-100">
                <div className="flex justify-between items-start mb-12">
                   <div>
                        <div className="text-xs font-black text-primary-600 uppercase tracking-widest mb-1">{t('Estimated Live Weight')}</div>
                        <div className="text-5xl font-black text-slate-900">{result.predicted_live_weight} <span className="text-xl text-slate-400 font-medium">kg</span></div>
                   </div>
                   <div className="bg-primary-50 p-4 rounded-2xl">
                        <Scale className="text-primary-600 w-8 h-8" />
                   </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-500 font-bold uppercase text-xs">{t('Ready Mutton Yield')}</span>
                        <ShoppingCart className="text-slate-400 w-4 h-4" />
                    </div>
                    <div className="text-4xl font-black text-primary-700">{result.result.estimated_mutton} kg</div>
                    <div className="h-1.5 bg-slate-200 rounded-full mt-6 relative overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${result.result.dressing_percentage}%` }}
                            className="absolute top-0 left-0 h-full bg-primary-600"
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] font-black uppercase text-slate-400">
                        <span>{t('Liveness')}</span>
                        <span>{result.result.dressing_percentage}% {t('Mutton')}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-center gap-3">
                        <Activity className="text-orange-500 w-5 h-5" />
                        <div>
                            <div className="text-[10px] font-bold text-orange-800 uppercase">{t('Min Range')}</div>
                            <div className="text-sm font-black text-slate-900">{result.result.min_range} kg</div>
                        </div>
                    </div>
                    <div className="p-4 bg-primary-50 rounded-xl border border-primary-100 flex items-center gap-3">
                        <Info className="text-primary-600 w-5 h-5" />
                        <div>
                            <div className="text-[10px] font-bold text-primary-800 uppercase">{t('Confidence')}</div>
                            <div className="text-sm font-black text-slate-900">{result.result.confidence_score}%</div>
                        </div>
                    </div>
                </div>
              </div>

              <div className="bg-primary-900 text-white p-6 rounded-2xl text-center">
                   <p className="text-sm opacity-60">{t('shaeffer_note')}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PredictMeasurements;
