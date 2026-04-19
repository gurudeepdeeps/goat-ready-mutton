import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-slate">
      <h1 className="text-4xl font-black text-slate-900 mb-8">Terms of Service</h1>
      <p className="text-sm text-slate-400 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Acceptance of Terms</h2>
      <p className="text-slate-600 mb-6">
        By accessing and using GoatReady Mutton Predictor, you accept and agree to be bound by the terms and provisions of this agreement.
      </p>

      <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Description of Service</h2>
      <p className="text-slate-600 mb-6">
        GoatReady provides AI-powered estimation tools for predicting ready mutton yields based on live animal metrics. These estimations are mathematical predictions and should be used as secondary verification tools alongside professional judgment.
      </p>

      <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Accuracy of Predictions</h2>
      <p className="text-slate-600 mb-6">
        While we strive for maximum accuracy using comprehensive datasets, GoatReady cannot guarantee 100% precision for every animal. Predictions may vary based on environmental factors, genetic mutations, and input accuracy. We are not liable for any financial decisions made based solely on our predictions.
      </p>

      <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. User Conduct</h2>
      <p className="text-slate-600 mb-6">
        You agree to use the service for legitimate agricultural and trading purposes. Any attempt to reverse engineer our algorithms or abuse our API endpoints will result in immediate termination of access.
      </p>
    </div>
  );
};

export default TermsOfService;
