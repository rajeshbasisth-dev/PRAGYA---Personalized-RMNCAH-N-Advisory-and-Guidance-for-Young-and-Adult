import React, { useState } from 'react';
import { ClientProfile, ClientCategory } from '../types';
import { CATEGORY_OPTIONS, PREGNANCY_STATUS_OPTIONS, TRIMESTER_OPTIONS, LANGUAGES } from '../constants';
import { User, Activity, FileText, HeartPulse, Baby, Globe } from 'lucide-react';

interface ClientFormProps {
  onSubmit: (data: ClientProfile) => void;
  isLoading: boolean;
}

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ClientProfile>({
    age: '',
    category: CATEGORY_OPTIONS[0],
    pregnancyStatus: 'No',
    trimester: undefined,
    parity: '',
    medicalHistory: '',
    visitReason: '',
    nutritionalStatus: '',
    language: 'English (Simple)'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-teal-600 px-6 py-4 flex items-center gap-2">
        <User className="text-white w-6 h-6" />
        <h2 className="text-xl font-bold text-white">Client Profile Input</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Client Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 24"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Client Category</label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none appearance-none bg-white"
              >
                {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Pregnancy & Parity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Baby className="w-4 h-4 text-teal-600" /> Currently Pregnant?
            </label>
            <select
              name="pregnancyStatus"
              value={formData.pregnancyStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
            >
              {PREGNANCY_STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {formData.pregnancyStatus === 'Yes' && (
            <div className="animate-fade-in">
              <label className="block text-sm font-medium text-slate-700 mb-1">Trimester</label>
              <select
                name="trimester"
                value={formData.trimester}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">Select...</option>
                {TRIMESTER_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Parity (Previous Births)</label>
            <input
              type="number"
              name="parity"
              value={formData.parity}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        {/* Health & Nutrition */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
              <HeartPulse className="w-4 h-4 text-rose-500" /> Medical History / Complications
            </label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              placeholder="e.g. Anemia, Hypertension, Previous C-section, Diabetes..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none h-20 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                <FileText className="w-4 h-4 text-blue-500" /> Reason for Current Visit
              </label>
              <input
                type="text"
                name="visitReason"
                value={formData.visitReason}
                onChange={handleChange}
                placeholder="e.g. ANC checkup, Immunization, FP counseling"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                <Activity className="w-4 h-4 text-green-500" /> Nutritional Status (BMI/MUAC)
              </label>
              <input
                type="text"
                name="nutritionalStatus"
                value={formData.nutritionalStatus}
                onChange={handleChange}
                placeholder="e.g. Normal, Underweight, Obese"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>
          
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Globe className="w-4 h-4 text-indigo-500" /> Counselling Language
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full md:w-1/2 px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
            >
              {LANGUAGES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-lg shadow-md transition-all
            ${isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-teal-600 hover:bg-teal-700 hover:shadow-lg active:scale-[0.99]'
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Guidance...
            </span>
          ) : (
            'Get Counselling Guidance'
          )}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;