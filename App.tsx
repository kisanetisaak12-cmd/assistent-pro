
import React, { useState } from 'react';
import Header from './components/Header';
import ComparisonView from './components/ComparisonView';
import { OptimizationGoal, OptimizationResult, GradeLevel, TextType, HelpLevel } from './types';
import { processStudentText } from './services/geminiService';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [goal, setGoal] = useState<OptimizationGoal>(OptimizationGoal.HUMANIZE);
  const [grade, setGrade] = useState<GradeLevel>(GradeLevel.C);
  const [textType, setTextType] = useState<TextType>(TextType.UPPSATS);
  const [helpLevel, setHelpLevel] = useState<HelpLevel>(HelpLevel.EXPAND);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!inputText.trim()) {
      setError("Berätta din idé eller klistra in din text först.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    try {
      const processed = await processStudentText(inputText, goal, grade, textType, helpLevel);
      setResult(processed);
    } catch (err) {
      setError("Neural Engine timeout. Kontrollera nätverket eller försök igen.");
    } finally {
      setIsProcessing(false);
    }
  };

  const helpOptions = [
    { id: HelpLevel.FULL, icon: '✍️' },
    { id: HelpLevel.EXPAND, icon: '🧠' },
    { id: HelpLevel.HUMANIZE_ONLY, icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-lime-500/40 relative overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-lime-500/10 rounded-full blur-[180px] animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/15 rounded-full blur-[180px] animate-pulse duration-[10000ms] delay-1000"></div>
      </div>

      <Header />
      
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-24 space-y-6">
          <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500 shadow-[0_0_15px_#84cc16]"></span>
            </span>
            <span className="text-[11px] font-black text-slate-200 uppercase tracking-[0.4em]">LevelUp Writing Partner v10.0</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none italic uppercase">
            LEVEL<span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(163,230,53,0.4)]">UP</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium tracking-tight">
            Berätta din idé, så bygger vi texten <span className="text-white italic">tillsammans</span>.
          </p>
        </div>

        <div className="bg-slate-900/60 rounded-[3.5rem] border border-white/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
          
          <div className="p-8 md:p-14 space-y-12">
            {/* Help Level Selection */}
            <div className="space-y-6">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] flex items-center">
                <span className="w-1.5 h-4 bg-blue-500 rounded-full mr-3"></span>
                Hur mycket hjälp vill du ha?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {helpOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setHelpLevel(opt.id)}
                    className={`flex items-center p-6 rounded-[1.5rem] transition-all duration-500 border ${
                      helpLevel === opt.id 
                        ? 'bg-blue-600/20 border-blue-400 text-white shadow-xl scale-[1.02]' 
                        : 'bg-slate-950/50 border-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300'
                    }`}
                  >
                    <span className="text-2xl mr-4">{opt.icon}</span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-left">{opt.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Configuration Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] flex items-center">
                    <span className="w-1.5 h-4 bg-cyan-500 rounded-full mr-3"></span>
                    Vilken sorts text?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(TextType).map((type) => (
                      <button
                        key={type}
                        onClick={() => setTextType(type)}
                        className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                          textType === type 
                          ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                          : 'bg-slate-950 border-white/5 text-slate-500 hover:border-white/20'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] flex items-center">
                    <span className="w-1.5 h-4 bg-lime-500 rounded-full mr-3"></span>
                    Målbetyg (Siktar på)
                  </label>
                  <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-white/5 justify-between">
                    {Object.values(GradeLevel).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setGrade(lvl)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all duration-500 relative ${
                          grade === lvl 
                          ? 'bg-gradient-to-r from-lime-600 to-lime-500 text-white shadow-[0_0_25px_rgba(132,204,22,0.4)]' 
                          : 'text-slate-600 hover:text-slate-300'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
               </div>
            </div>

            {/* Input Area */}
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] flex items-center">
                <span className="w-1.5 h-4 bg-purple-500 rounded-full mr-3"></span>
                Berätta din idé (även slarvigt)
              </label>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-lime-500/20 via-cyan-500/20 to-purple-500/20 rounded-[2.5rem] blur opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
                <textarea
                  className="relative w-full bg-slate-950/90 border border-white/10 rounded-[2.5rem] p-10 text-slate-100 placeholder-slate-700 focus:ring-0 focus:border-white/20 outline-none transition-all resize-none min-h-[320px] shadow-2xl text-xl leading-relaxed font-medium"
                  placeholder="T.ex: Jag vill skriva om varför skolan borde börja senare för att man hinner inte träna på morgonen och är trött..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-3xl text-sm font-black flex items-center animate-shake">
                <span className="mr-4 text-xl">⚠️</span> {error}
              </div>
            )}

            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className={`group relative w-full py-8 rounded-[2.5rem] font-black text-2xl uppercase tracking-[0.4em] transition-all overflow-hidden ${
                isProcessing 
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed shadow-none' 
                  : 'bg-white text-black hover:bg-lime-400 hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_60px_-15px_rgba(132,204,22,0.3)]'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-8 w-8 mr-6 text-lime-600" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Skapar magi...
                  </>
                ) : (
                  <>🚀 FIXA TEXTEN</>
                )}
              </span>
            </button>
          </div>

          {result && (
            <div className="p-10 md:p-16 border-t border-white/10 bg-black/40">
              <ComparisonView result={result} />
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-white/10 py-24 text-center mt-40 relative z-10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-left space-y-4">
            <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">Level<span className="text-lime-500">Up</span></h4>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] leading-relaxed">
              LevelUp Writing Partner v10.0 | Din genväg till bättre betyg
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-slate-500 text-[11px] font-black uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-lime-400 transition-colors">Neural</a>
            <a href="#" className="hover:text-lime-400 transition-colors">Betyg</a>
            <a href="#" className="hover:text-lime-400 transition-colors">Partner</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
