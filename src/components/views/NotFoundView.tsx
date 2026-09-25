import React from 'react';
import { ArrowLeft, Home, Compass } from 'lucide-react';

interface NotFoundViewProps {
  onGoHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onGoHome }) => {
  return (
    <div className="pt-36 pb-32 bg-white dark:bg-[#07121F] text-slate-900 dark:text-white transition-colors flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#0A84FF]/10 text-[#0A84FF] mx-auto flex items-center justify-center mb-6">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono font-bold text-[#0A84FF] uppercase tracking-wider block mb-2">
          404 &mdash; Page Not Found
        </span>

        <h1 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white mb-3">
          Looks like this page took a wrong turn.
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          The link you navigated to might be decommissioned or moved. Let's return to the main technology solutions portal.
        </p>

        <button
          onClick={onGoHome}
          className="px-6 py-3 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};
