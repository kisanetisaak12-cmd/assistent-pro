
import React, { useState } from 'react';
import { OptimizationResult } from '../types';

interface ComparisonViewProps {
  result: OptimizationResult;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ result }) => {
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="space-y-20 animate-in fade-in zoom-in-95 duration-1000">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Input Box */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-slate-800"></div>
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">Inmatad Idé</h3>
          </div>
          <div className="bg-slate-950/80 p-10 rounded-[3rem] border border-white/5 min-h-[500px] text-slate-600 text-lg leading-relaxed whitespace-pre-wrap font-medium italic opacity-60">
            {result.originalText}
          </div>
        </div>

        {/* Output Box */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_15px_#84cc16]"></div>
              <h3 className="text-[11px] font-black text-lime-500 uppercase tracking-[0.4em]">Färdig Stealth-Text</h3>
            </div>
            <div className="flex space-x-3">
              <div className="px-5 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <span className="text-[10px] font-black text-cyan-400 uppercase">Mål: {result.estimatedGradeLevel}</span>
              </div>
              <div className="px-5 py-1.5 bg-lime-500/10 border border-lime-500/20 rounded-full">
                <span className="text-[10px] font-black text-lime-400 uppercase tracking-tighter">Human: {result.humanScore}%</span>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-lime-500/30 via-cyan-500/30 to-purple-500/30 rounded-[3rem] blur-2xl opacity-40"></div>
            <div className="relative bg-slate-900/90 p-10 md:p-14 rounded-[3rem] border border-lime-500/40 shadow-2xl min-h-[500px] text-slate-100 leading-relaxed whitespace-pre-wrap text-xl md:text-2xl font-bold tracking-tight">
              {result.optimizedText}
              
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(result.optimizedText);
                }}
                className="absolute top-10 right-10 p-5 bg-white text-black hover:bg-lime-400 rounded-[1.5rem] transition-all border border-white/10 group/btn shadow-xl active:scale-95"
                title="Kopiera"
              >
                <svg className="w-6 h-6 transform transition-transform duration-500 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Defense Tips Expander */}
      <div className="space-y-6">
        <button 
          onClick={() => setShowTips(!showTips)}
          className="w-full flex items-center justify-between p-8 bg-blue-500/10 border border-blue-500/30 rounded-[2rem] hover:bg-blue-500/20 transition-all text-left"
        >
          <div className="flex items-center space-x-4">
            <span className="text-3xl">💡</span>
            <div>
              <h4 className="text-lg font-black text-blue-400 uppercase tracking-widest">Hur du försvarar texten</h4>
              <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Om läraren frågar hur du tänkte...</p>
            </div>
          </div>
          <svg className={`w-6 h-6 text-blue-400 transition-transform ${showTips ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {showTips && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 animate-in slide-in-from-top-4 duration-500">
            {result.defenseTips.map((tip, idx) => (
              <div key={idx} className="p-6 bg-slate-900 border border-blue-500/20 rounded-3xl text-slate-300 text-sm font-medium leading-relaxed">
                {tip}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Transformation Log */}
      <div className="bg-gradient-to-br from-white/5 to-transparent p-12 md:p-20 rounded-[4rem] border border-white/10 relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-lime-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
          <div className="space-y-2">
            <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter">
              Chaos Engine <span className="text-lime-500">Log</span>
            </h4>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Transformation sequence complete</p>
          </div>
          <div className="px-8 py-4 bg-lime-400 text-black font-black uppercase text-sm rounded-full rotate-3 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
            Verified stealth
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {result.improvements.map((improvement, idx) => (
            <div key={idx} className="group flex items-start bg-black/40 p-8 rounded-[2rem] border border-white/5 hover:border-lime-500/30 transition-all duration-500 hover:translate-y-[-5px]">
              <div className="mr-6 mt-2 w-2 h-2 bg-lime-500 rounded-full flex-shrink-0 shadow-[0_0_12px_#84cc16]" />
              <span className="text-slate-300 text-sm md:text-base font-bold leading-relaxed tracking-tight group-hover:text-white transition-colors">
                {improvement}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
