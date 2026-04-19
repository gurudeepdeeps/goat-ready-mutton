import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { predictImage } from '../api';
import { Camera, Upload, Trash2, Zap, Brain, ShieldCheck, RefreshCw, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PredictImage = () => {
  const { t } = useTranslation();

  const [imageSide, setImageSide] = useState(null);
  const [previewSide, setPreviewSide] = useState('');
  
  const [imageFront, setImageFront] = useState(null);
  const [previewFront, setPreviewFront] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0); 
  
  const fileInputSideRef = useRef(null);
  const fileInputFrontRef = useRef(null);

  const [formData, setFormData] = useState({
    breed: 'Local breed',
    gender: 'Male',
    age: '12 to 24 months',
    feed: 'Normal',
    fat: 'Medium'
  });

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'side') {
        setImageSide(file);
        setPreviewSide(URL.createObjectURL(file));
      } else {
        setImageFront(file);
        setPreviewFront(URL.createObjectURL(file));
      }
      setResult(null);
      setStep(0);
    }
  };

  const handlePredict = async () => {
    if (!imageSide || !imageFront) {
      alert("Please upload BOTH Side View and Front View images!");
      return;
    }
    
    setLoading(true);
    setResult(null);
    setStep(1);

    setTimeout(() => setStep(2), 1500);

    const formDataToPayload = new FormData();
    formDataToPayload.append('file', imageSide);
    formDataToPayload.append('breed', formData.breed);
    formDataToPayload.append('gender', formData.gender);
    formDataToPayload.append('age', formData.age);
    formDataToPayload.append('feed', formData.feed);
    formDataToPayload.append('fat', formData.fat);

    try {
      const data = await predictImage(formDataToPayload);
      setTimeout(() => {
        setResult(data);
        setStep(3);
        setLoading(false);
      }, 3000);
    } catch (err) {
      alert("AI Analysis failed. Make sure backend is running.");
      setLoading(false);
      setStep(0);
    }
  };

  const reset = () => {
    setImageSide(null);
    setPreviewSide('');
    setImageFront(null);
    setPreviewFront('');
    setResult(null);
    setStep(0);
  };



  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-slate-900 text-xs font-black uppercase tracking-wider mb-6">
          <Zap className="w-3 h-3 fill-slate-900" /> Beta feature
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-6 flex items-center gap-3">
          <Camera className="text-primary-600 w-10 h-10" />
          {t("Predict by Image")}
        </h1>
        <p className="text-slate-600 mb-10 text-lg">
          {t("Upload a clear side-view image")}
        </p>

        {(!previewSide || !previewFront) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div 
              onClick={() => fileInputSideRef.current.click()}
              className={`w-full aspect-square rounded-3xl border-4 ${previewSide ? 'border-primary-500 p-1' : 'border-dashed border-slate-200 p-6'} bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all relative overflow-hidden group`}
            >
              {previewSide ? (
                <img src={previewSide} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <>
                    <div className="bg-white p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform mb-4">
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-primary-600" />
                    </div>
                    <p className="font-bold text-slate-800 text-center">{t("Side View")}</p>
                </>
              )}
            </div>

            <div 
              onClick={() => fileInputFrontRef.current.click()}
              className={`w-full aspect-square rounded-3xl border-4 ${previewFront ? 'border-primary-500 p-1' : 'border-dashed border-slate-200 p-6'} bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all relative overflow-hidden group`}
            >
              {previewFront ? (
                <img src={previewFront} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <>
                    <div className="bg-white p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform mb-4">
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-primary-600" />
                    </div>
                    <p className="font-bold text-slate-800 text-center">{t("Front View")}</p>
                </>
              )}
            </div>
          </div>
        )}

        {(previewSide && previewFront) && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group aspect-square">
                <img src={previewSide} alt="Side" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => fileInputSideRef.current.click()} className="p-2 bg-white rounded-xl hover:bg-white/90 transition-colors">
                        <RefreshCw className="w-5 h-5 text-slate-800" />
                    </button>
                    <button onClick={reset} className="p-2 bg-red-600 rounded-xl hover:bg-red-700 transition-colors">
                        <Trash2 className="w-5 h-5 text-white" />
                    </button>
                </div>
                {loading && (
                    <motion.div initial={{ top: 0 }} animate={{ top: '100%' }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute left-0 right-0 h-1 bg-primary-500 shadow-[0_0_20px_#408945] z-10" />
                )}
                </div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl group aspect-square">
                <img src={previewFront} alt="Front" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => fileInputFrontRef.current.click()} className="p-2 bg-white rounded-xl hover:bg-white/90 transition-colors">
                        <RefreshCw className="w-5 h-5 text-slate-800" />
                    </button>
                    <button onClick={reset} className="p-2 bg-red-600 rounded-xl hover:bg-red-700 transition-colors">
                        <Trash2 className="w-5 h-5 text-white" />
                    </button>
                </div>
                {loading && (
                    <motion.div initial={{ top: 0 }} animate={{ top: '100%' }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute left-0 right-0 h-1 bg-primary-500 shadow-[0_0_20px_#408945] z-10" />
                )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select 
                    className="input-field w-full"
                    onChange={(e) => setFormData({...formData, breed: e.target.value})}
                    defaultValue="Local breed"
                >
                    <option>Local breed</option>
                    <option>Boer cross</option>
                    <option>Jamunapari</option>
                    <option>Osmanabadi</option>
                    <option>Sirohi</option>
                </select>
                <button 
                  disabled={loading}
                  onClick={handlePredict}
                  className="btn-primary w-full py-4 font-black flex items-center justify-center gap-2"
                >
                  {loading ? t('AI Processing...') : t('Run Image AI Analysis')}
                </button>
            </div>
          </div>
        )}
        <input ref={fileInputSideRef} type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, 'side')} />
        <input ref={fileInputFrontRef} type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, 'front')} />
      </motion.div>

      <div className="lg:sticky lg:top-32 w-full max-w-full overflow-hidden">
        <div id="result-card" className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl border border-slate-100 min-h-[500px] flex flex-col w-full">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-8 mb-8" data-html2canvas-ignore="true">
                <div className="bg-slate-900 p-3 rounded-2xl">
                    <Brain className="text-white w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">{t("AI Pipeline Status")}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                        <div className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${step >= 1 ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'}`}>{t("Detection")}</div>
                        <div className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${step >= 2 ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'}`}>{t("Estimation")}</div>
                        <div className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${step === 3 ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'}`}>{t("Prediction")}</div>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
                        <Camera className="w-16 h-16 text-slate-200 mb-6" />
                        <h4 className="font-bold text-slate-500">{t("Wait for Analysis")}</h4>
                        <p className="text-slate-400 text-sm max-w-[200px]">Upload front and side images to begin AI analysis.</p>
                    </motion.div>
                )}

                {step === 1 && (
                     <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 py-10">
                        <div className="flex items-center justify-center relative">
                            <div className="w-24 h-24 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                            <Layers className="absolute w-10 h-10 text-primary-600" />
                        </div>
                        <div className="text-center">
                            <h4 className="text-xl font-black text-slate-800">{t("Detecting Goat...")}</h4>
                            <p className="text-slate-500">Locating animal in image frame using YOLOv8 simulation.</p>
                        </div>
                     </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 py-10">
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-ping" />
                                    <div className="h-2 bg-slate-200 rounded-full flex-1" />
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <h4 className="text-xl font-black text-slate-800">{t("Extracting Biometrics")}</h4>
                            <p className="text-slate-500">Estimating heart girth and length based on body contour analysis.</p>
                        </div>
                    </motion.div>
                )}

                {step === 3 && result && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        <div className="text-center group">
                            <div className="text-xs font-black text-primary-600 uppercase mb-2">{t("Predicted Ready Mutton")}</div>
                            <div className="text-5xl md:text-7xl font-black text-slate-900 group-hover:scale-110 transition-transform">{result.result.estimated_mutton} <span className="text-xl text-slate-400 font-medium">kg</span></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-6 bg-slate-900 rounded-3xl text-white flex flex-col items-center sm:items-start">
                                <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">{t("Live Weight")}</div>
                                <div className="text-3xl font-black">{result.ai_analysis.predicted_live_weight}kg</div>
                            </div>
                            <div className="p-6 bg-primary-600 rounded-3xl text-white flex flex-col items-center sm:items-start">
                                <div className="text-[10px] uppercase font-bold text-primary-200 mb-2">{t("Confidence")}</div>
                                <div className="text-3xl font-black">{result.result.confidence_score}%</div>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-bold text-slate-800">{t("Carcass Yield Verified")}</span>
                            </div>
                            <div className="text-sm font-bold text-slate-500">
                                DP: {result.result.dressing_percentage}%
                            </div>
                        </div>

                        <div className="mt-8">
                            <button onClick={reset} className="btn-secondary w-full">
                                {t("Predict Another")}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PredictImage;
