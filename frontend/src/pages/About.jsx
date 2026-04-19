import React from 'react';
import { Leaf, Award, Users, Search, Microscope, BarChart3 } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-black text-slate-900 mb-8">About GoatReady Mutton</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                We are bridging the gap between traditional livestock farming and modern AI technology. 
                Our tool is designed to provide quick, reliable, and data-driven insights for the meat industry.
            </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
            {[
                { icon: Microscope, title: 'Precision Algorithms', desc: 'Our biometric calculation model is based on established agricultural research and genetic breed data.' },
                { icon: Award, title: 'Slaughter Verified', desc: 'We calibrate our dressing percentage logic against actual slaughterhouse data to minimize margin of error.' },
                { icon: Users, title: 'Farmer Centric', desc: 'Designed for field use where expensive weighing scales are not always available.' }
            ].map((item, i) => (
                <div key={i} className="text-center group">
                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all text-primary-600">
                        <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <h2 className="text-4xl font-black mb-8">Our Vision</h2>
                      <p className="text-slate-400 text-lg leading-relaxed mb-8">
                          The "Goat Ready Mutton Predictor" started as a simple tool to help small-scale farmers get fair market prices for their livestock. 
                          Today, it evolved into an AI platform that simulates body contour analysis using YOLOv8 models.
                      </p>
                      <div className="flex items-center gap-4 py-4 px-6 bg-white/5 rounded-2xl border border-white/10">
                          <Leaf className="text-primary-400 w-10 h-10" />
                          <div>
                              <div className="font-bold text-lg">Sustainable Agriculture</div>
                              <div className="text-slate-500 text-sm">Empowering digitilization of livestock trade.</div>
                          </div>
                      </div>
                  </div>
                  <div className="card glass p-8 grid grid-cols-2 gap-4">
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center">
                          <Search className="text-primary-400 w-8 h-8 mb-4" />
                          <span className="text-sm font-bold opacity-60">Verified</span>
                      </div>
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                          <BarChart3 className="text-primary-400 w-8 h-8 mb-4" />
                          <span className="text-sm font-bold opacity-60">Real-time Data</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default About;
