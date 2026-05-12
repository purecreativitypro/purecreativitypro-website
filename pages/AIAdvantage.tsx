import React, { useState, useCallback, useEffect } from 'react';
import { ArrowRight, Mail, Loader2, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../lib/firebase';
import { sendQuizResult } from '../lib/webhookService';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import ScrollReveal from '../components/ScrollReveal';

const db = getFirestore(app);

// ─── Quiz Data ─────────────────────────────────────────────
const quizQuestions = [
  { q: 'When you think about AI, what best describes how you feel?', options: ['Overwhelmed and unsure where to start', 'Curious, but I mostly collect tips and prompts', 'Excited, but distracted by all the tools', 'Interested in using it to improve my craft or work', 'Ready to build workflows and systems with it'] },
  { q: 'How are you currently using AI?', options: ['I barely use it because I do not know what to ask', 'I use prompts I find online', 'I test different tools but do not have a clear system', 'I use it for things related to my work or creativity', 'I use it regularly and want to make it more repeatable'] },
  { q: 'What frustrates you most about AI right now?', options: ['I do not know where to begin', 'I get generic answers', 'There are too many tools to keep up with', 'I am not sure how to use it to get better at what I do', 'I need better workflows and automation'] },
  { q: 'What would help you most?', options: ['A simple starting path', 'Better prompts and follow-up questions', 'Help choosing what to ignore', 'A way to use AI as a learning partner', 'A system I can reuse every week'] },
  { q: 'When AI gives you an answer, what usually happens?', options: ['I am not sure what to do with it', 'I copy it but often need to fix it', 'I compare it with other tools', 'I review it based on what I know about my craft', 'I refine it and turn it into part of a process'] },
  { q: 'Which statement sounds most like you?', options: ['I feel behind with AI', 'I have prompts but not a clear method', 'I keep chasing new tools', 'I want AI to help me become better at my work', 'I want AI to help me scale or systemize my work'] },
  { q: 'What do you want AI to help you with most?', options: ['Understanding what is possible', 'Getting better answers', 'Saving time and reducing tool confusion', 'Learning, practicing, and improving my craft', 'Building repeatable workflows'] },
  { q: 'What best describes your current AI confidence?', options: ['Low — I need a simple starting point', 'Medium — I can use it, but not deeply', 'Scattered — I know tools, but lack focus', 'Growing — I want to use it more intentionally', 'Strong — I want better systems'] },
  { q: 'What result would feel most valuable to you?', options: ['Feeling less overwhelmed', 'Knowing how to get better AI responses', 'Knowing which tools and tasks matter', 'Becoming better at my craft with AI help', 'Having repeatable workflows that save time'] },
  { q: 'What kind of support would you likely use?', options: ['A beginner-friendly starter kit', 'A prompt chain guide', 'A tool and workflow simplification guide', 'A skill-building workbook', 'A full AI workflow system'] },
];

type UserType = 'beginner' | 'collector' | 'chaser' | 'skilled' | 'multiplier';

const userTypes: Record<UserType, { title: string; tagline: string; description: string; product: string; cta: string; color: string; borderC: string; textC: string }> = {
  beginner: { title: 'The Overwhelmed Beginner', tagline: 'Too much information. Not enough direction.', description: 'You know AI is important, but the amount of tools, courses, and opinions makes it hard to know where to start. The truth is you do not need everything. You need a simple first step.', product: 'AI Confidence & Capability Kit', cta: 'Join the Waitlist', color: 'from-amber-500/20 to-amber-500/5', borderC: 'border-amber-500/30', textC: 'text-amber-400' },
  collector: { title: 'The Prompt Collector', tagline: 'You have prompts, but not a process.', description: 'You have saved prompts and watched tutorials, but you still do not feel like you have a system. You know what to type sometimes, but not always why it works or how to improve the result.', product: 'The Prompt Chain Playbook', cta: 'Join the Waitlist', color: 'from-cyan-500/20 to-cyan-500/5', borderC: 'border-cyan-500/30', textC: 'text-cyan-400' },
  chaser: { title: 'The Tool Chaser', tagline: 'Movement without momentum.', description: 'You are interested in AI, but you spend more time exploring tools than building repeatable results. You need outcome-first thinking and workflow discipline.', product: 'The AI Advantage OS', cta: 'Join the Waitlist', color: 'from-violet-500/20 to-violet-500/5', borderC: 'border-violet-500/30', textC: 'text-violet-400' },
  skilled: { title: 'The Skilled but Underleveraged Creator', tagline: 'Real skill, but limited leverage.', description: 'You already have skill and expertise. You do not need AI to replace your craft. You need AI to help you expand it, practice it, refine it, and produce more from it.', product: 'Skill Before the Prompt', cta: 'Join the Waitlist', color: 'from-fuchsia-500/20 to-fuchsia-500/5', borderC: 'border-fuchsia-500/30', textC: 'text-fuchsia-400' },
  multiplier: { title: 'The Strategic Multiplier', tagline: 'Potential without full systemization.', description: 'You already see the potential of AI and may be using it regularly. Now you need better systems — workflows, templates, automations, and repeatable processes that improve your output.', product: 'The AI Advantage OS', cta: 'Join the Waitlist', color: 'from-emerald-500/20 to-emerald-500/5', borderC: 'border-emerald-500/30', textC: 'text-emerald-400' },
};

const processingSteps = ['Analyzing your responses...', 'Identifying patterns...', 'Building your profile...'];

const ProcessingAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep(s => Math.min(s + 1, processingSteps.length - 1)), 800);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-8 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 w-20 h-20 bg-violet-500/20 rounded-full blur-xl animate-pulse" />
        <div className="relative w-20 h-20 border-[3px] border-zinc-800 rounded-full animate-spin" style={{ borderTopColor: '#8b5cf6', borderRightColor: '#3b82f6' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles size={20} className="text-violet-400" />
        </div>
      </div>
      <div className="space-y-2 text-center">
        {processingSteps.map((s, i) => (
          <p key={i} className={`font-mono text-sm transition-all duration-500 ${i <= step ? 'text-violet-400 opacity-100' : 'text-zinc-700 opacity-0'}`}>
            {i < step ? '✓' : i === step ? '›' : ''} {s}
          </p>
        ))}
      </div>
    </div>
  );
};

const AIAdvantage: React.FC = () => {
  // Quiz state machine
  const [quizStep, setQuizStep] = useState<'hidden' | 'questions' | 'processing' | 'email' | 'result'>('hidden');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const getResult = (): UserType => {
    const counts = [0, 0, 0, 0, 0];
    answers.forEach(a => { if (a >= 0 && a < 5) counts[a]++; });
    const maxIdx = counts.indexOf(Math.max(...counts));
    return (['beginner', 'collector', 'chaser', 'skilled', 'multiplier'] as UserType[])[maxIdx];
  };

  const handleQuizStart = () => { setQuizStep('questions'); setCurrentQ(0); setAnswers([]); setSelectedAnswer(null); };

  const handleAnswer = useCallback((idx: number) => {
    if (isTransitioning) return;
    setSelectedAnswer(idx);
    setIsTransitioning(true);
    setTimeout(() => {
      const next = [...answers, idx];
      setAnswers(next);
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
        setIsTransitioning(false);
      } else {
        setQuizStep('processing');
        setTimeout(() => setQuizStep('email'), 2400);
      }
    }, 500);
  }, [answers, currentQ, isTransitioning]);

  const handleEmailSubmit = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError('Please enter a valid email.'); return; }
    setEmailError(''); setIsSaving(true);
    const type = getResult();
    const typeData = userTypes[type];
    const structured = quizQuestions.map((q, i) => ({ question: q.q, answer: q.options[answers[i]] || 'N/A' }));
    try {
      await addDoc(collection(db, 'ai_quiz_results'), { email, name: name || null, userType: type, typeName: typeData.title, answers: structured, recommendedProduct: typeData.product, createdAt: serverTimestamp(), source: 'ai-advantage-quiz' });
      sendQuizResult({ email, name: name || undefined, userType: type, answers: structured, recommendedProduct: typeData.product }, 'ai-advantage-quiz');
      setQuizStep('result');
    } catch { setEmailError('Something went wrong. Please try again.'); }
    finally { setIsSaving(false); }
  };

  const resultType = quizStep === 'result' ? userTypes[getResult()] : null;

  return (
    <>
      <SEOHead
        title="AI Advantage | PureCreativity"
        description="Are you overwhelmed by AI noise? Discover your AI User Type and get a clear path to use AI for real freedom, income, and mastery."
        path="/ai-advantage"
      />
      <Navigation theme="learn" />
      <main className="bg-neutral-950 text-white min-h-screen">

        {/* ─── SECTION 1: THE HEADER (THE HOOK) ─── */}
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-neutral-950 to-neutral-950" />
          {/* Ambient floating orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/[0.04] rounded-full blur-[120px] animate-float-slow" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-500/[0.05] rounded-full blur-[100px] animate-float-slower" />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/[0.03] rounded-full blur-[80px] animate-float-reverse" />
          </div>
          {/* Grain overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E")' }} />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-mono tracking-widest uppercase mb-8 animate-fade-in">
              <Sparkles size={12} /> The AI Advantage
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.15] mb-8">
              Trying to get ahead using AI is exhausting when every "expert" just tells you to{' '}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                copy and paste.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Figuring out how to use AI shouldn't take up all your free time, and it definitely shouldn't force you to settle for work that sounds like a robot. PureCreativity gives you the exact steps you need to become irreplaceable and run circles around your competition.
            </p>
            <a
              href="#quiz"
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]"
            >
              Discover Your AI Type <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-zinc-600 text-xs mt-4">Takes 2 minutes</p>
          </div>
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
        </section>

        {/* ─── SECTION 2: THE PIVOT (DANGER VS. ESCAPE ROUTE) ─── */}
        <section className="py-24 md:py-32 px-6 relative">
          {/* Subtle top divider */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
                AI won't replace experts. But experts using AI will{' '}
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  replace everyone else.
                </span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* The Trap */}
                <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-red-500/20 hover:shadow-[0_0_40px_rgba(239,68,68,0.05)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-transparent" />
                  <div className="text-red-400/60 text-xs font-mono tracking-widest uppercase mb-6 flex items-center gap-2">
                    <XCircle size={14} /> The Trap
                  </div>
                  <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                    Chasing tools and using AI as a cheap, generic shortcut.
                  </p>
                  <div className="border-t border-zinc-800 pt-6">
                    <p className="text-xs font-mono tracking-widest uppercase text-red-400/40 mb-2">Result</p>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      You stay overwhelmed, sound like everyone else, and miss out on the real financial and personal rewards.
                    </p>
                  </div>
                </div>
                {/* The Advantage */}
                <div className="p-8 rounded-2xl border border-violet-500/20 bg-violet-950/10 relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-violet-500" />
                  <div className="text-violet-400 text-xs font-mono tracking-widest uppercase mb-6 flex items-center gap-2">
                    <Sparkles size={14} /> The Advantage
                  </div>
                  <p className="text-white text-lg leading-relaxed font-medium mb-6">
                    Using AI systematically to achieve true mastery in your craft.
                  </p>
                  <div className="border-t border-violet-500/10 pt-6">
                    <p className="text-xs font-mono tracking-widest uppercase text-violet-400/60 mb-2">Result</p>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      You become the expert who uses AI to generate real freedom, income, and success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ─── SECTION 3: THE GUIDE & AUTHORITY ─── */}
        <section className="py-24 md:py-32 px-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center relative">
              {/* Subtle glow behind the card */}
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/[0.03] via-violet-500/[0.05] to-purple-500/[0.03] rounded-3xl blur-xl" />
              <div className="relative p-10 md:p-14 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                  AI should make you more capable,{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    not dependent.
                  </span>
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  You shouldn't have to rely on shallow shortcuts just to keep up. We spent years testing and failing so you don't have to. We built a practical path to help you turn random AI use into a repeatable advantage for your real life, business, or craft.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ─── SECTION 4: THE FRONT PORCH (QUIZ CTA) + QUIZ ─── */}
        <section id="quiz" className="py-24 md:py-32 px-6 bg-gradient-to-b from-neutral-950 via-indigo-950/20 to-neutral-950">
          <div className="max-w-2xl mx-auto">

            {/* QUIZ INTRO */}
            {quizStep === 'hidden' && (
              <ScrollReveal>
                <div className="text-center">
                  <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                    What Type of AI User Are You?
                  </h2>
                  <p className="text-zinc-400 max-w-lg mx-auto mb-10 leading-relaxed">
                    The first step to achieving true mastery is knowing exactly where you are right now. Take our free 2-minute assessment to discover what is holding you back and get a personalized path to start getting real results.
                  </p>
                  <button
                    onClick={handleQuizStart}
                    className="group px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]"
                  >
                    Start the Free Quiz <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-zinc-500 text-sm mt-6 max-w-md mx-auto italic leading-relaxed">
                    If you want to stop chasing tools and start using AI to build real freedom and income, discovering your AI User Type is the right decision.
                  </p>
                </div>
              </ScrollReveal>
            )}

            {/* QUESTIONS */}
            {quizStep === 'questions' && (
              <div key={`q-${currentQ}`} className="quiz-question-enter">
                <div className="flex justify-between text-xs font-mono tracking-widest uppercase text-zinc-500 mb-4">
                  <span>Question {currentQ + 1} / {quizQuestions.length}</span>
                  <span className="text-violet-400">{Math.round(((currentQ + 1) / quizQuestions.length) * 100)}%</span>
                </div>
                <div className="flex gap-1.5 mb-8">
                  {quizQuestions.map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      i < currentQ ? 'bg-gradient-to-r from-blue-500 to-violet-500' :
                      i === currentQ ? 'bg-violet-500 animate-pulse' : 'bg-zinc-800'
                    }`} />
                  ))}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">{quizQuestions[currentQ].q}</h3>
                <div className="space-y-3">
                  {quizQuestions[currentQ].options.map((opt, i) => (
                    <button
                      key={`${currentQ}-${i}`}
                      onClick={() => handleAnswer(i)}
                      disabled={isTransitioning}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex justify-between items-center group ${
                        selectedAnswer === i
                          ? 'border-violet-500 bg-violet-500/10 text-white scale-[0.98]'
                          : isTransitioning
                            ? 'border-zinc-800 text-zinc-600 opacity-50'
                            : 'border-zinc-700 hover:border-violet-500/50 text-zinc-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                          selectedAnswer === i ? 'border-violet-500 bg-violet-500' : 'border-zinc-600 group-hover:border-violet-500/50'
                        }`}>
                          {selectedAnswer === i && <CheckCircle size={14} className="text-white" />}
                        </span>
                        {opt}
                      </span>
                      <ArrowRight size={16} className={`transition-all duration-300 ${
                        selectedAnswer === i ? 'opacity-100 text-violet-400' : 'opacity-0 group-hover:opacity-100 text-violet-400'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PROCESSING */}
            {quizStep === 'processing' && (
              <ProcessingAnimation />
            )}

            {/* EMAIL GATE */}
            {quizStep === 'email' && (
              <div className="animate-fade-in space-y-6 text-center">
                <div className="w-16 h-16 rounded-full border-2 border-violet-500 flex items-center justify-center mx-auto" style={{ backgroundColor: 'rgba(139,92,246,0.1)' }}>
                  <Mail size={32} className="text-violet-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Your Personalized AI Action Plan is Ready.</h2>
                  <p className="text-zinc-400 text-sm">Enter your email to immediately see your AI User Type and receive your custom, step-by-step recommendation for mastering AI.</p>
                </div>
                <div className="space-y-3 text-left max-w-sm mx-auto">
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-500 mb-1.5">Email *</label>
                    <input type="email" value={email} onChange={e => { setEmail(e.target.value); setEmailError(''); }} placeholder="you@example.com" className="w-full bg-white/[0.03] border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all" onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-500 mb-1.5">Name <span className="text-zinc-700">(optional)</span></label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full bg-white/[0.03] border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all" onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()} />
                  </div>
                </div>
                {emailError && <p className="text-red-400 text-xs">{emailError}</p>}
                <button onClick={handleEmailSubmit} disabled={isSaving} className="w-full max-w-sm mx-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-sm tracking-widest uppercase transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSaving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <>Send My Results <ArrowRight size={16} /></>}
                </button>
                <p className="text-zinc-500 text-xs italic max-w-sm mx-auto leading-relaxed">
                  If you want a clear path forward without the hype, getting your results is the right decision.
                </p>
              </div>
            )}

            {/* RESULT */}
            {quizStep === 'result' && resultType && (
              <div className="animate-fade-in space-y-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded text-xs text-zinc-400 font-mono">
                  <CheckCircle size={14} className="text-emerald-400" /> Quiz Complete
                </div>
                <div className={`p-8 rounded-2xl border ${resultType.borderC} bg-gradient-to-br ${resultType.color}`}>
                  <div className={`text-xs font-mono tracking-widest uppercase mb-3 ${resultType.textC}`}>Your AI User Type</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{resultType.title}</h2>
                  <p className={`text-lg font-semibold mb-4 ${resultType.textC}`}>{resultType.tagline}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">{resultType.description}</p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                  <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase mb-2">Recommended For You</p>
                  <p className="text-white font-bold text-lg mb-6">{resultType.product}</p>
                  <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform">
                    {resultType.cta}
                  </button>
                  <p className="text-zinc-500 text-xs italic mt-4 max-w-sm mx-auto leading-relaxed">
                    If you want a clear, repeatable way to use AI in your craft, PureCreativity is the secret.
                  </p>
                </div>
              </div>
            )}

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default AIAdvantage;
