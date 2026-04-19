import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { predictWeight } from '../api';
import { Weight, Info, CheckCircle2, TrendingUp, ShieldCheck, RefreshCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PredictWeight = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    live_weight: '',
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
      const data = await predictWeight({
        ...formData,
        live_weight: parseFloat(formData.live_weight)
      });
      setResult(data.result);
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
          <Weight className="text-primary-600 w-10 h-10" />
          {t('Predict by Weight')}
        </h1>
        <p className="text-slate-600 mb-10 text-lg">{t('weight_page_subtitle')}</p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">{t('Live Weight (kg)')}</label>
            <input
              type="number"
              name="live_weight"
              required
              step="0.1"
              value={formData.live_weight}
              onChange={handleChange}
              className="input-field text-lg font-bold"
              placeholder="e.g. 45.5"
            />
          </div>

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

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t('Fat Condition')}</label>
            <select name="fat" value={formData.fat} onChange={handleChange} className="input-field">
              {fats.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              disabled={loading}
              type="submit"
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg"
            >
              {loading ? <RefreshCcw className="animate-spin w-5 h-5" /> : t('Calculate Ready Mutton')}
            </button>
          </div>
        </form>
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
              <Info className="text-primary-300 w-16 h-16 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-primary-900 mb-2">{t('Predictions will appear here')}</h3>
              <p className="text-primary-700">{t('predict_placeholder')}</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-primary-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                <h3 className="text-lg font-medium mb-2 opacity-80">{t('Estimated Ready Mutton')}</h3>
                <div className="text-6xl font-black mb-6">{result.estimated_mutton} <span className="text-2xl font-normal opacity-80">kg</span></div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10">
                    <div className="text-xs uppercase font-bold opacity-60 mb-1">{t('Min Estimate')}</div>
                    <div className="text-xl font-bold">{result.min_range} kg</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10">
                    <div className="text-xs uppercase font-bold opacity-60 mb-1">{t('Max Estimate')}</div>
                    <div className="text-xl font-bold">{result.max_range} kg</div>
                  </div>
                </div>
              </div>

              <div className="card grid grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-xl text-green-600">
                    <ShieldCheck />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{t('Confidence')}</div>
                    <div className="text-xl font-black text-slate-800">{result.confidence_score}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <TrendingUp />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{t('Dressing %')}</div>
                    <div className="text-xl font-black text-slate-800">{result.dressing_percentage}%</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100">
                <h4 className="font-bold flex items-center gap-2 mb-4">
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                  {t('Inside Analysis')}
                </h4>
                <ul className="space-y-3">
                  <li className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">{t('Breed Quality Adjustment')}</span>
                    <span className="font-bold text-slate-800 text-right">+2.5%</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">{t('Feeding Condition Variance')}</span>
                    <span className="font-bold text-slate-800 text-right">-1.0%</span>
                  </li>
                  <li className="flex justify-between text-sm border-t pt-3">
                    <span className="text-slate-900 font-black">{t('Estimated Meat Yield')}</span>
                    <span className="font-black text-primary-600 text-right">{result.estimated_mutton} kg</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PredictWeight;
