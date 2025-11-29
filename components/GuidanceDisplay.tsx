import React from 'react';
import { GuidanceResponse } from '../types';
import { AlertTriangle, CheckCircle, MessageSquare, ArrowRight, ClipboardList, Info } from 'lucide-react';

interface GuidanceDisplayProps {
  guidance: GuidanceResponse;
  onReset: () => void;
}

const GuidanceDisplay: React.FC<GuidanceDisplayProps> = ({ guidance, onReset }) => {
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getRiskIcon = (level: string) => {
    switch(level) {
        case 'High': return <AlertTriangle className="w-6 h-6 text-red-600" />;
        case 'Medium': return <Info className="w-6 h-6 text-yellow-600" />;
        default: return <CheckCircle className="w-6 h-6 text-green-600" />;
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header Summary Card */}
      <div className={`rounded-xl border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm ${getRiskColor(guidance.riskLevel)}`}>
        <div className="flex items-start gap-4">
            <div className="mt-1 bg-white p-2 rounded-full shadow-sm">
                {getRiskIcon(guidance.riskLevel)}
            </div>
            <div>
                <h2 className="text-2xl font-bold">{guidance.clientCategory}</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold uppercase tracking-wider text-sm border px-2 py-0.5 rounded-md border-current">
                        {guidance.riskLevel} Risk
                    </span>
                    <span className="text-sm opacity-90 block md:inline">
                        • {guidance.riskReasoning}
                    </span>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Script & Priorities */}
        <div className="lg:col-span-2 space-y-6">
            
             {/* Counselling Script */}
             <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="bg-indigo-600 px-6 py-3 flex items-center gap-2">
                    <MessageSquare className="text-white w-5 h-5" />
                    <h3 className="text-lg font-bold text-white">Suggested Counselling Script</h3>
                </div>
                <div className="p-6 bg-indigo-50">
                    <div className="bg-white p-6 rounded-lg border-l-4 border-indigo-500 shadow-sm italic text-slate-700 text-lg leading-relaxed relative">
                        <span className="absolute top-2 left-2 text-4xl text-indigo-200 opacity-50">"</span>
                        {guidance.counsellingScript}
                        <span className="absolute bottom-[-10px] right-2 text-4xl text-indigo-200 opacity-50">"</span>
                    </div>
                    <p className="text-xs text-indigo-800 mt-3 font-medium text-center uppercase tracking-wide">
                        Read this aloud or paraphrase in local context
                    </p>
                </div>
            </div>

             {/* Priorities */}
             <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4 text-teal-700">
                    <ClipboardList className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Priority Counselling Areas</h3>
                </div>
                <ul className="space-y-3">
                    {guidance.priorities.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-sm">
                                {index + 1}
                            </span>
                            <span className="text-slate-800 font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

        {/* Right Column: Opportunistic & Referral */}
        <div className="space-y-6">
            
            {/* Opportunistic Messages */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5">
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Opportunistic Guidance</h3>
                <div className="space-y-4">
                    {guidance.opportunisticMessages.map((msg, idx) => (
                        <div key={idx} className="group">
                             <h4 className="text-sm font-bold text-teal-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" /> {msg.topic}
                             </h4>
                             <p className="text-sm text-slate-600 leading-snug pl-4 border-l-2 border-slate-200 group-hover:border-teal-400 transition-colors">
                                {msg.message}
                             </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Referral Advice */}
            <div className="bg-rose-50 rounded-xl shadow-md border border-rose-100 p-5">
                <h3 className="text-lg font-bold text-rose-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" /> Referral / Follow-up
                </h3>
                <p className="text-rose-900 font-medium leading-relaxed">
                    {guidance.referralAdvice}
                </p>
            </div>

             <button 
                onClick={onReset}
                className="w-full py-3 bg-slate-800 text-slate-100 rounded-lg font-semibold hover:bg-slate-900 transition shadow-md"
            >
                Start New Consultation
            </button>
        </div>

      </div>
    </div>
  );
};

export default GuidanceDisplay;