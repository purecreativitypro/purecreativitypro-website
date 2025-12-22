import React, { useState, useEffect } from 'react';
import { X, Check, Loader2, Terminal, BarChart3, Wand2, AlertTriangle, ArrowRight, BrainCircuit, Scan, BookOpen } from 'lucide-react';

export type ScannerTheme = 'tech' | 'media' | 'business' | 'learn';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ScannerTheme;
}

const ScannerModal: React.FC<ScannerModalProps> = ({ isOpen, onClose, theme }) => {
  const [step, setStep] = useState<'intro' | 'questions' | 'processing' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [processingLog, setProcessingLog] = useState<string>('');
  
  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep('intro');
      setCurrentQuestion(0);
      setAnswers([]);
    }
  }, [isOpen]);

  // CONFIGURATION DATA
  const config = {
    tech: {
      color: 'cyan',
      bg: 'bg-slate-950',
      border: 'border-cyan-500',
      text: 'text-cyan-400',
      button: 'bg-cyan-600 hover:bg-cyan-500 text-white',
      icon: <Terminal size={48} />,
      title: 'SYSTEMS DIAGNOSTIC',
      desc: 'Analyze your operational efficiency and detect automation opportunities.',
      processingSteps: ['> CONNECTING TO WORKFLOW NODE...', '> ANALYZING DATA FRAGMENTATION...', '> CALCULATING TIME LEAKAGE...', '> GENERATING OPTIMIZATION REPORT...'],
      questions: [
        { q: 'How is your data currently connected?', options: ['Fully Automated (APIs)', 'Manual Copy/Paste', 'It lives in disparate sheets', 'What data?'] },
        { q: 'How much time do you spend on admin/week?', options: ['0-2 Hours', '3-8 Hours', '10+ Hours', 'Too much to count'] },
        { q: 'What is your primary tech bottleneck?', options: ['Lead Tracking', 'Client Onboarding', 'Internal Comms', 'Payment Collection'] }
      ]
    },
    media: {
      color: 'orange',
      bg: 'bg-zinc-900',
      border: 'border-orange-500',
      text: 'text-orange-500',
      button: 'bg-orange-500 hover:bg-orange-400 text-black font-bold',
      icon: <Wand2 size={48} />,
      title: 'CONTENT ENGINE SCAN',
      desc: 'Evaluate your brand consistency, reach, and asset utilization.',
      processingSteps: ['Running visual consistency check...', 'Analyzing audience retention models...', 'Evaluating asset repurposing potential...', 'Compiling creative direction...'],
      questions: [
        { q: 'How consistent is your posting schedule?', options: ['Daily / Systematized', 'Weekly', 'Sporadic / Random', 'Non-existent'] },
        { q: 'Do you have a clear visual identity?', options: ['Yes, a full brand guide', 'Sort of, I stick to colors', 'No, it varies every time', 'I use random templates'] },
        { q: 'What is your biggest content blocker?', options: ['Idea Generation', 'Editing & Production', 'Posting & Scheduling', 'ROI / Conversion'] }
      ]
    },
    business: {
      color: 'emerald',
      bg: 'bg-zinc-950',
      border: 'border-emerald-500',
      text: 'text-emerald-400',
      button: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      icon: <BarChart3 size={48} />,
      title: 'CLARITY BLUEPRINT SCAN',
      desc: 'Assess your business structure, offer clarity, and scalability potential.',
      processingSteps: ['Auditing offer structure...', 'Forecasting scalability vector...', 'Identifying revenue bottlenecks...', 'Drafting strategic roadmap...'],
      questions: [
        { q: 'How defined is your niche?', options: ['Hyper-specific', 'Somewhat broad', 'I serve everyone', 'Unsure'] },
        { q: 'Is your offer scalable?', options: ['Yes (Digital/Product)', 'Service (Time for Money)', 'Hybrid', 'Not yet defined'] },
        { q: 'How predictable is your revenue?', options: ['Consistent Growth', 'Flat / Stable', 'Feast or Famine', 'Just starting'] }
      ]
    },
    learn: {
      color: 'amber',
      bg: 'bg-neutral-950',
      border: 'border-amber-500',
      text: 'text-amber-400',
      button: 'bg-amber-500 hover:bg-amber-400 text-black font-bold',
      icon: <BookOpen size={48} />,
      title: 'SKILL PATH FINDER',
      desc: 'Identify your best starting point based on your goals and interests.',
      processingSteps: ['Analyzing interest vector...', 'Scanning skill gap...', 'Matching with available kits...', 'Generating learning path...'],
      questions: [
        { q: 'What is your primary goal?', options: ['Make extra income', 'Save time / Automate', 'Create better content', 'Learn a new hobby'] },
        { q: 'Which area excites you most?', options: ['AI & Tech Automation', 'Video & Media Production', 'Music & Audio', 'Business Strategy'] },
        { q: 'What is your experience level?', options: ['Total Beginner', 'Dabbled a bit', 'Intermediate', 'Pro'] }
      ]
    }
  }[theme];

  const handleStart = () => setStep('questions');

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);
    
    if (currentQuestion < config.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      startProcessing();
    }
  };

  const startProcessing = () => {
    setStep('processing');
    let stepIndex = 0;
    setProcessingLog(config.processingSteps[0]);

    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < config.processingSteps.length) {
        setProcessingLog(config.processingSteps[stepIndex]);
      } else {
        clearInterval(interval);
        setStep('result');
      }
    }, 800); // 800ms per step
  };

  // Determine result copy based on answers
  const getResult = () => {
    const score = answers.reduce((a, b) => a + b, 0);
    const maxScore = (config.questions.length * 3); // Max index is 3
    const percentage = Math.round(((maxScore - score) / maxScore) * 100);

    let diagnosis = "";
    let action = "";

    if (theme === 'learn') {
      // Special logic for Learn: Recommendation based on Interest (Question 2 / Index 1)
      const interest = answers[1];
      
      if (interest === 0) {
        diagnosis = "PATH: AI & AUTOMATION";
        action = "Recommended Kit: AI Starter Workflow + 10 Prompts Guide";
      } else if (interest === 1) {
        diagnosis = "PATH: MEDIA PRODUCTION";
        action = "Recommended Kit: Phone Video Checklist + Camera Buying Guide";
      } else if (interest === 2) {
        diagnosis = "PATH: SONIC ARTS";
        action = "Recommended Kit: Music Basics + Chord Progressions";
      } else {
        diagnosis = "PATH: ENTREPRENEURSHIP";
        action = "Recommended Kit: Offer Builder Template + Side Hustle Sheet";
      }
    } else if (theme === 'tech') {
        if (percentage > 70) diagnosis = "SYSTEMS HEALTHY. OPTIMIZATION POSSIBLE.";
        else if (percentage > 40) diagnosis = "EFFICIENCY LEAK DETECTED.";
        else diagnosis = "CRITICAL: MANUAL OVERLOAD.";
        action = "Let's automate the busywork so you can scale.";
    } else if (theme === 'media') {
        if (percentage > 70) diagnosis = "STRONG BRAND PRESENCE.";
        else if (percentage > 40) diagnosis = "INCONSISTENT SIGNAL.";
        else diagnosis = "BRAND INVISIBILITY DETECTED.";
        action = "Let's build a content engine that runs without you.";
    } else {
        if (percentage > 70) diagnosis = "HIGH SCALABILITY POTENTIAL.";
        else if (percentage > 40) diagnosis = "OFFER BOTTLENECK DETECTED.";
        else diagnosis = "STRUCTURE REQUIRED.";
        action = "You need the Blueprint to clarify your path.";
    }

    return { percentage, diagnosis, action };
  };

  if (!isOpen) return null;

  const result = step === 'result' ? getResult() : null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-lg ${config.bg} border ${config.border} shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden flex flex-col min-h-[400px] animate-[float_0.3s_ease-out]`}>
        
        {/* Header */}
        <div className={`flex justify-between items-center p-4 border-b ${config.border}/30 bg-black/20`}>
           <div className={`text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 ${config.text}`}>
              <Scan size={14} /> {config.title}
           </div>
           <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <X size={20} />
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center relative">
            
            {/* STEP: INTRO */}
            {step === 'intro' && (
                <div className="space-y-6 animate-fade-in">
                    <div className={`w-20 h-20 rounded-full ${config.border} border-2 flex items-center justify-center mx-auto text-${config.color}-500 bg-${config.color}-500/10`}>
                        {config.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{config.title}</h2>
                    <p className="text-zinc-400 leading-relaxed">{config.desc}</p>
                    <button 
                        onClick={handleStart}
                        className={`${config.button} px-8 py-3 rounded-lg tracking-widest font-bold uppercase text-sm transition-transform active:scale-95 flex items-center gap-2 mx-auto`}
                    >
                        Initialize Scan <ArrowRight size={16} />
                    </button>
                </div>
            )}

            {/* STEP: QUESTIONS */}
            {step === 'questions' && (
                <div className="w-full space-y-6 animate-fade-in">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-zinc-500 mb-4">
                        <span>Analysis Node {currentQuestion + 1} / {config.questions.length}</span>
                        <span>Pending...</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-6">{config.questions[currentQuestion].q}</h3>
                    
                    <div className="space-y-3">
                        {config.questions[currentQuestion].options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className={`w-full text-left p-4 rounded border border-zinc-700 hover:${config.border} hover:bg-white/5 transition-all text-zinc-300 hover:text-white flex justify-between group`}
                            >
                                {option}
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-current">
                                    <ArrowRight size={16} />
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP: PROCESSING */}
            {step === 'processing' && (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                        <div className={`w-16 h-16 border-4 border-zinc-800 border-t-${config.color}-500 rounded-full animate-spin`}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <BrainCircuit size={24} className={`text-${config.color}-500`} />
                        </div>
                    </div>
                    <div className={`font-mono text-sm ${config.text} animate-pulse`}>
                        {processingLog}
                    </div>
                    {/* Fake Progress Bar */}
                    <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full bg-${config.color}-500 animate-[beam-right_2s_infinite]`}></div>
                    </div>
                </div>
            )}

            {/* STEP: RESULT */}
            {step === 'result' && result && (
                <div className="w-full text-center space-y-6 animate-slide-up">
                    <div className="inline-block px-3 py-1 bg-zinc-800 rounded text-xs text-zinc-400 font-mono mb-2">
                        SCAN COMPLETE
                    </div>
                    
                    <h2 className={`text-2xl md:text-3xl font-black italic uppercase ${config.text}`}>
                        {result.diagnosis}
                    </h2>

                    <div className="py-6 border-y border-white/5 my-4">
                        <p className="text-white font-bold text-lg max-w-sm mx-auto">
                            {result.action}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                         <button onClick={onClose} className={`${config.button} px-8 py-4 rounded-lg tracking-widest font-bold uppercase text-sm transition-transform hover:scale-105 active:scale-95 shadow-lg`}>
                            GO TO KIT
                         </button>
                    </div>
                </div>
            )}

        </div>
        
        {/* Decorative Grid Background */}
        <div 
            className="absolute inset-0 pointer-events-none opacity-10" 
            style={{
                backgroundImage: `linear-gradient(${config.color === 'cyan' ? '#22d3ee' : config.color === 'orange' ? '#f97316' : config.color === 'amber' ? '#f59e0b' : '#10b981'} 1px, transparent 1px), linear-gradient(90deg, ${config.color === 'cyan' ? '#22d3ee' : config.color === 'orange' ? '#f97316' : config.color === 'amber' ? '#f59e0b' : '#10b981'} 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
            }}
        />
      </div>
    </div>
  );
};

export default ScannerModal;