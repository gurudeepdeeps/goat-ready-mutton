import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="text-primary-400 w-8 h-8" />
              <span className="font-bold text-2xl tracking-tight">
                GoatReady <span className="text-primary-400">Mutton</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              Empowering farmers and traders with precision AI tools for ready mutton estimation. 
              Built for accuracy, scalability, and transparency.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Tools</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/predict-weight" className="hover:text-primary-400 transition-colors">Weight Predictor</Link></li>
              <li><Link to="/predict-measurements" className="hover:text-primary-400 transition-colors">Dimension Predictor</Link></li>
              <li><Link to="/predict-image" className="hover:text-primary-400 transition-colors">Image Analysis</Link></li>
              <li><Link to="/history" className="hover:text-primary-400 transition-colors">Prediction History</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-slate-500 text-sm space-y-2">
          <p>© {new Date().getFullYear()} Goat Ready Mutton Predictor. All rights reserved.</p>
          <p>Tool Designed & developed by <a href="https://gurudeep-portfolio.vercel.app" target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors font-semibold">Gurudeep V</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
