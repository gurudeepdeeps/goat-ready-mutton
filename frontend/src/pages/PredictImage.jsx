import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { predictImage } from '../api';
import { Camera, Upload, Trash2, Zap, Brain, ShieldCheck, RefreshCw, Layers } from 'lucide-react';

const PredictImage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0); // 0: Idle, 1: Detecting, 2: Analyzing, 3: Done
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    breed: 'Local breed',
    gender: 'Male',
    age: '12 to 24 months',
    feed: 'Normal',
    fat: 'Medium'
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setStep(0);
    }
  };

  const handlePredict = async () => {
    if (!image) return;
    
    setLoading(true);
    setResult(null);
    setStep(1);

    // Simulated step animation
    setTimeout(() => setStep(2), 1500);

    const formDataToPayload = new FormData();
    formDataToPayload.append('file', image);
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
    setImage(null);
    setPreview('');
    setResult(null);
    setStep(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-16 items-start">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-slate-900 text-xs font-black uppercase tracking-wider mb-6">
          <Zap className="w-3 h-3 fill-slate-900" /> Beta feature
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-6 flex items-center gap-3">
          <Camera className="text-primary-600 w-10 h-10" />
          Predict by Image
        </h1>
        <p className="text-slate-600 mb-10 text-lg">
          Upload a clear side-view image of the goat. Our simulated AI pipeline detects the animal and estimates dimensions for a mutton prediction.
        </p>

        {!preview ? (
          <div 
            onClick={() => fileInputRef.current.click()}
            className="w-full aspect-square md:aspect-video rounded-3xl border-4 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all group"
          >
            <div className="bg-white p-6 rounded-full shadow-lg group-hover:scale-110 transition-transform mb-6">
              <Upload className="w-10 h-10 text-slate-400 group-hover:text-primary-600" />
            </div>
            <p className="font-bold text-slate-800">Drag & Drop or Click to Upload</p>
            <p className="text-slate-400 text-sm mt-2 font-medium">Clear side-view goat image recommended</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img src={preview} alt="Goat Preview" className="w-full h-auto" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <button onClick={() => fileInputRef.current.click()} className="p-3 bg-white rounded-xl hover:bg-white/90 transition-colors">
                    <RefreshCw className="w-6 h-6 text-slate-800" />
                 </button>
                 <button onClick={reset} className="p-3 bg-red-600 rounded-xl hover:bg-red-700 transition-colors">
                    <Trash2 className="w-6 h-6 text-white" />
                 </button>
              </div>
              
              {/* Scanning effect */}
              {loading && (
                 <motion.div 
                    initial={{ top: 0 }}
                    animate={{ top: '100%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-primary-500 shadow-[0_0_20px_#408945] z-10"
                 />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <select 
                    className="input-field"
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
                  {loading ? 'AI Processing...' : 'Run Image AI Analysis'}
                </button>
            </div>
          </div>
        )}
        <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleImageChange} />
      </motion.div>

      <div className="lg:sticky lg:top-32">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 min-h-[500px] flex flex-col">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-8 mb-8">
                <div className="bg-slate-900 p-3 rounded-2xl">
                    <Brain className="text-white w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">AI Pipeline Status</h3>
                    <div className="flex items-center gap-4 mt-1">
                        <div className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${step >= 1 ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'}`}>Detection</div>
                        <div className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${step >= 2 ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'}`}>Estimation</div>
                        <div className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${step === 3 ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'}`}>Prediction</div>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
                        <Camera className="w-16 h-16 text-slate-200 mb-6" />
                        <h4 className="font-bold text-slate-500">Wait for Analysis</h4>
                        <p className="text-slate-400 text-sm max-w-[200px]">Upload an image and run AI to see the prediction results.</p>
                    </motion.div>
                )}

                {step === 1 && (
                     <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 py-10">
                        <div className="flex items-center justify-center relative">
                            <div className="w-24 h-24 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                            <Layers className="absolute w-10 h-10 text-primary-600" />
                        </div>
                        <div className="text-center">
                            <h4 className="text-xl font-black text-slate-800">Detecting Goat...</h4>
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
                            <h4 className="text-xl font-black text-slate-800">Extracting Biometrics</h4>
                            <p className="text-slate-500">Estimating heart girth and length based on body contour analysis.</p>
                        </div>
                    </motion.div>
                )}

                {step === 3 && result && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        <div className="text-center group">
                            <div className="text-xs font-black text-primary-600 uppercase mb-2">Predicted Ready Mutton</div>
                            <div className="text-7xl font-black text-slate-900 group-hover:scale-110 transition-transform">{result.result.estimated_mutton} <span className="text-xl text-slate-400 font-medium">kg</span></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-slate-900 rounded-3xl text-white">
                                <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Live Weight</div>
                                <div className="text-3xl font-black">{result.ai_analysis.predicted_live_weight}kg</div>
                            </div>
                            <div className="p-6 bg-primary-600 rounded-3xl text-white">
                                <div className="text-[10px] uppercase font-bold text-primary-200 mb-2">Confidence</div>
                                <div className="text-3xl font-black">{result.result.confidence_score}%</div>
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-bold text-slate-800">Carcass Yield Verified</span>
                            </div>
                            <div className="text-sm font-bold text-slate-500">
                                DP: {result.result.dressing_percentage}%
                            </div>
                        </div>

                        <div className="mt-auto">
                            <button onClick={reset} className="btn-secondary w-full">Predict Another</button>
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
