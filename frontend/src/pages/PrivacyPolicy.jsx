import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-slate">
      <h1 className="text-4xl font-black text-slate-900 mb-8">Privacy Policy</h1>
      <p className="text-sm text-slate-400 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Introduction</h2>
      <p className="text-slate-600 mb-6">
        Welcome to GoatReady Mutton Predictor ("Company", "we", "our", "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.
      </p>

      <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. The Data We Collect About You</h2>
      <p className="text-slate-600 mb-6">
        We may collect, use, store and transfer different kinds of data about you which we have grouped together as follows:
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
          <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
          <li><strong>Usage Data:</strong> includes information about how you use our website, including goat breeding statistics and predictions logged in your history.</li>
        </ul>
      </p>

      <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. How We Use Your Data</h2>
      <p className="text-slate-600 mb-6">
        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to power our AI predictions, improve agricultural algorithms, and provide you with precise historical logging.
      </p>

      <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Data Security</h2>
      <p className="text-slate-600 mb-6">
        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
