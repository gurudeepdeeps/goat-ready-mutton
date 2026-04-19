import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getHistory, clearHistory, deleteHistoryItem } from '../api';
import { History as HistoryIcon, Calendar, Weight, Tag, RefreshCcw, ChevronRight, ChevronDown, Trash2, ShieldAlert } from 'lucide-react';

const History = () => {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getHistory();
      setHistory(data.history || []);
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (window.confirm(t('confirm_clear_all'))) {
      await clearHistory();
      await fetchHistory();
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm(t('confirm_delete'))) {
      await deleteHistoryItem(id);
      await fetchHistory();
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <HistoryIcon className="text-primary-600 w-10 h-10" />
            {t('Prediction History')}
          </h1>
          <p className="text-slate-600 text-lg">
            {t('history_subtitle')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={fetchHistory} className="btn-secondary flex items-center justify-center gap-2">
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> {t('Refresh')}
          </button>
          {history.length > 0 && (
            <button onClick={handleClear} className="bg-red-50 text-red-600 hover:bg-red-100 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
              <ShieldAlert className="w-4 h-4" /> {t('Clear All History')}
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="card h-48 animate-pulse bg-slate-50 border-none" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
          <HistoryIcon className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t('No history found')}</h3>
          <p className="text-slate-500">{t('history_empty')}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                key={item.id}
                className={`card transition-all cursor-pointer border-2 ${expandedId === item.id ? 'border-primary-500 shadow-xl' : 'border-slate-100 hover:border-primary-200'}`}
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.created_at)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                      item.prediction_type === 'weight' ? 'bg-blue-100 text-blue-600' :
                      item.prediction_type === 'measurements' ? 'bg-orange-100 text-orange-600' :
                      'bg-primary-100 text-primary-600'
                    }`}>
                      {item.prediction_type}
                    </div>
                    <button 
                      onClick={(e) => handleDelete(e, item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-black text-slate-900">
                      {item.result_json.result?.estimated_mutton || item.result_json.estimated_mutton} <span className="text-sm font-medium text-slate-400">kg</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">{t('Estimated Mutton')}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl transition-colors">
                    <Weight className="w-6 h-6 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {t('Breed')}
                    </span>
                    <span className="font-bold text-slate-800">{item.input_json.breed}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">{t('Confidence Score')}</span>
                    <span className="font-bold text-primary-600">{item.result_json.result?.confidence_score || item.result_json.confidence_score}%</span>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between gap-1 text-[10px] font-black text-primary-600">
                  {expandedId === item.id ? (
                    <><span className="flex items-center gap-1"><ChevronDown className="w-3 h-3" /> {t('HIDE DETAILS')}</span></>
                  ) : (
                    <><span className="flex items-center gap-1"><ChevronRight className="w-3 h-3" /> {t('VIEW FULL DETAILS')}</span></>
                  )}
                </div>

                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div 
                      key="details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-4 border-t border-slate-100 border-dashed overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl">
                          <h4 className="text-[10px] font-black uppercase text-slate-500 mb-2">{t('Input Variables')}</h4>
                          <pre className="text-xs text-slate-700 overflow-x-auto">
                            {JSON.stringify(item.input_json, null, 2)}
                          </pre>
                        </div>
                        <div className="bg-primary-50 p-4 rounded-xl">
                          <h4 className="text-[10px] font-black uppercase text-primary-600 mb-2">{t('Calculation Result')}</h4>
                          <pre className="text-xs text-primary-900 overflow-x-auto">
                            {JSON.stringify(item.result_json, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default History;
