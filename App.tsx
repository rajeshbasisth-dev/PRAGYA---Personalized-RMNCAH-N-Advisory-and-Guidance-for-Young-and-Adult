import React, { useState } from 'react';
import ClientForm from './components/ClientForm';
import GuidanceDisplay from './components/GuidanceDisplay';
import { generateGuidance } from './services/geminiService';
import { ClientProfile, GuidanceResponse } from './types';
import { HeartHandshake } from 'lucide-react';

const App: React.FC = () => {
  const [guidance, setGuidance] = useState<GuidanceResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: ClientProfile) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateGuidance(data);
      setGuidance(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError("Unable to generate guidance. Please check your internet connection and API key configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGuidance(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Navigation / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-lg">
                <HeartHandshake className="text-white w-6 h-6" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-slate-800 leading-none">PRAGYA</h1>
                <p className="text-xs text-slate-500 font-medium">Personalized RMNCAH+N Advisor</p>
            </div>
          </div>
          <div className="text-xs font-semibold bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-100 hidden sm:block">
            Facility Use Only
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro Text (only visible on form view) */}
        {!guidance && (
            <div className="mb-8 text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome, Counselor</h2>
                <p className="text-slate-600">
                    Enter the client's details below to receive AI-powered, context-specific counselling guidance tailored to their health needs and risk profile.
                </p>
            </div>
        )}

        {/* Error Display */}
        {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm flex items-start gap-3">
                <div className="text-red-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-sm font-bold text-red-800">Generation Error</h3>
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            </div>
        )}

        {/* View Switcher */}
        {guidance ? (
          <GuidanceDisplay guidance={guidance} onReset={handleReset} />
        ) : (
          <div className="max-w-3xl mx-auto">
             <ClientForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="text-center py-6 text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} PRAGYA RMNCAH+N Tool. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;