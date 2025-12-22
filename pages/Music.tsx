import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Mic2, Music as MusicIcon, Radio, Disc, Sliders, Headphones, ArrowRight, X, Play, HelpCircle, Check } from 'lucide-react';

const Music: React.FC = () => {
  return (
    <div className="min-h-screen bg-indigo-950 text-white font-display relative overflow-hidden selection:bg-fuchsia-500 selection:text-white">
      <Navigation theme="music" />

      {/* PERFORMANCE OPTIMIZATION: Replaced animated DOM blobs with static CSS radial gradients. 
          Large animated blurs cause massive frame drops on mobile. */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          background: `
            radial-gradient(circle at 10% 10%, rgba(192, 38, 211, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 90% 90%, rgba(147, 51, 234, 0.15) 0%, transparent 40%)
          `
        }}
      />

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <h4 className="text-fuchsia-400 mb-4 uppercase tracking-widest text-sm font-bold flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></span>
           PURECREATIVITY MUSIC — ORIGINALS ONLY
        </h4>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-pink-400 to-purple-500 drop-shadow-lg leading-tight break-words">
          Music that makes your<br />project feel expensive.
        </h1>
        
        {/* Subhead */}
        <p className="text-lg md:text-2xl text-indigo-200 max-w-3xl font-light mb-6 leading-relaxed">
          For artists, creators, and brands who need music that actually fits. We produce instrumentals, compose original themes, and score visuals — so your audience feels what you’re trying to say.
        </p>
        
        {/* Best For Line */}
        <p className="text-fuchsia-300/80 text-sm font-bold tracking-wide uppercase mb-12">
            Best for: creator intros/outros, brand sonic identity, ad beds, film/content scoring, artist production.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col md:flex-row gap-6">
                <button className="relative px-8 py-4 rounded-full bg-fuchsia-600 text-white font-bold tracking-widest hover:bg-fuchsia-500 transition-all shadow-[0_0_30px_rgba(192,38,211,0.5)] hover:shadow-[0_0_50px_rgba(192,38,211,0.7)] group overflow-hidden active:scale-95">
                  <span className="relative z-10 flex items-center gap-2">
                    LISTEN TO REEL <Headphones size={20} className="animate-bounce md:animate-none" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                <a 
                  href="https://tidycal.com/purecreativitypro/purecreativity-blueprint-session"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full border border-fuchsia-500/50 text-fuchsia-100 font-bold tracking-widest hover:bg-fuchsia-500/10 transition-all hover:border-fuchsia-500 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                   REQUEST A CUSTOM TRACK <ArrowRight size={18} />
                </a>
            </div>
            {/* Secondary Blueprint CTA */}
            <Link to="/business" className="text-indigo-300/60 text-xs hover:text-white transition-colors flex items-center gap-2 mt-2">
                Not sure where to start? Start with the Blueprint <ArrowRight size={14} />
            </Link>
        </div>
      </div>

      {/* PROBLEM SECTION */}
      <div className="bg-indigo-900/30 border-y border-white/5 py-20 backdrop-blur-sm relative z-10">
         <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">When the sound is wrong, everything feels off.</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
                {[
                    "Your content looks good, but it doesn’t hit emotionally.",
                    "Stock tracks feel generic (or the licensing is a mess).",
                    "You need a sound that matches your brand, your scene, your artist identity."
                ].map((item, i) => (
                    <div key={i} className="bg-indigo-950/50 p-6 rounded-2xl border border-white/5 flex items-start gap-4 hover:bg-white/5 transition-colors">
                        <X className="text-fuchsia-500 shrink-0 mt-1" size={20} />
                        <p className="text-indigo-200 leading-relaxed">{item}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-indigo-300 text-lg italic opacity-80 max-w-2xl mx-auto">
                "If you’ve been scrolling through tracks thinking “almost… but not it,” you’re not alone."
            </p>
         </div>
      </div>

      {/* Marquee / Infinite Scroll */}
      <div className="w-full py-12 overflow-hidden flex items-center opacity-30">
        <div className="flex whitespace-nowrap gap-16 animate-marquee w-max items-center text-sm tracking-[0.2em] font-bold text-fuchsia-200/50 will-change-transform">
           {[1,2,3].map(i => (
             <React.Fragment key={i}>
                <span>COMPOSITION</span><span>•</span><span>FILM SCORING</span><span>•</span><span>SOUND DESIGN</span><span>•</span><span>MIXING</span><span>•</span><span>MASTERING</span><span>•</span>
             </React.Fragment>
           ))}
        </div>
      </div>

      {/* Offerings / Service Cards */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card 1: Production */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <Disc className="text-white" size={24} />
            </div>
            <div className="mb-2 text-fuchsia-400 text-xs font-bold tracking-widest uppercase">For artists & creators</div>
            <h3 className="text-3xl font-bold mb-4">Production</h3>
            <p className="text-indigo-200 leading-relaxed mb-6">
              Custom instrumentals and production that fits your voice — not a template. We shape the drums, melody, and texture so your track feels like you.
            </p>
            <ul className="space-y-2 mb-6">
                {["Original instrumental / beat", "Arrangement + creative direction", "Stems available on request"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-indigo-300">
                        <Check size={14} className="text-fuchsia-500" /> {item}
                    </li>
                ))}
            </ul>
            {/* Visualizer */}
            <div className="h-16 flex items-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-full bg-fuchsia-500/50 rounded-t-sm animate-pulse"
                  style={{ height: '100%', transform: `scaleY(${Math.random()})`, transformOrigin: 'bottom', animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Card 2: Scoring */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors group">
             <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <Radio className="text-white" size={24} />
            </div>
            <div className="mb-2 text-indigo-400 text-xs font-bold tracking-widest uppercase">For film, ads, and content</div>
            <h3 className="text-3xl font-bold mb-4">Scoring & Media</h3>
            <p className="text-indigo-200 leading-relaxed mb-6">
              Emotion-first scoring and sound beds that make visuals land. We build tension, release, energy, and atmosphere — so your story comes through without extra words.
            </p>
             <ul className="space-y-2 mb-6">
                {["Custom score / theme", "Loops + cutdowns for edits", "Licensing for usage"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-indigo-300">
                        <Check size={14} className="text-indigo-500" /> {item}
                    </li>
                ))}
            </ul>
             {/* Abstract Visual */}
             <div className="relative w-full h-16 bg-black/20 rounded-lg overflow-hidden flex items-center opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="absolute left-0 right-0 h-[1px] bg-white/30"></div>
                <div className="absolute w-32 h-full bg-indigo-500/20 border-l border-indigo-400"></div>
                <svg className="w-full h-full opacity-50" preserveAspectRatio="none">
                  <path d="M0 32 Q 50 10, 100 32 T 200 32 T 300 32" stroke="currentColor" fill="none" className="text-fuchsia-400" />
                </svg>
             </div>
          </div>

        </div>
      </div>

      {/* THE PLAN SECTION */}
      <div className="container mx-auto px-6 pb-24 max-w-6xl">
         <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">The Plan</h2>
         <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
                { step: "01", title: "Share the vibe", desc: "reference links, mood, purpose" },
                { step: "02", title: "We create the sound", desc: "first draft + revisions" },
                { step: "03", title: "You publish with confidence", desc: "final files + usage terms" }
            ].map((item, i) => (
                <div key={i} className="bg-indigo-900/20 border border-indigo-500/20 p-8 rounded-2xl relative overflow-hidden group hover:bg-indigo-900/40 transition-colors">
                    <div className="absolute top-0 right-0 p-4 text-6xl font-bold text-white/5 font-sans z-0">{item.step}</div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-fuchsia-400 font-bold mb-4 border border-fuchsia-500/30">
                            {i+1}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-indigo-300 text-sm">{item.desc}</p>
                    </div>
                </div>
            ))}
         </div>
         <div className="flex justify-center">
            <a 
              href="https://tidycal.com/purecreativitypro/purecreativity-blueprint-session"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white text-indigo-950 font-bold tracking-widest hover:bg-fuchsia-50 transition-all hover:scale-105 shadow-lg active:scale-95 cursor-pointer"
            >
                REQUEST A CUSTOM TRACK
            </a>
         </div>
      </div>
      
       {/* Featured Tracks List */}
       <div className="container mx-auto px-6 pb-24 max-w-4xl">
         <div className="mb-10 border-l-4 border-fuchsia-500 pl-6">
             <h3 className="text-fuchsia-400 font-bold mb-2 uppercase tracking-widest text-sm">Recent Works</h3>
             <p className="text-indigo-200">A few quick examples across instrumentals, brand beds, and cinematic cues.</p>
         </div>
         <div className="space-y-4">
           {[
             { title: "Neon Horizon", subtitle: "Synthwave • Uplifting • Creator Intro", time: "3:42" },
             { title: "Corporate Synergy", subtitle: "Ad Bed • Bright • Clean", time: "1:15" },
             { title: "Tears in Rain", subtitle: "Cinematic • Emotional • Trailer", time: "4:20" }
           ].map((track, i) => (
             <div key={i} className="flex items-center justify-between p-4 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer group rounded-lg">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-fuchsia-600 transition-colors relative shrink-0">
                   {/* Mobile pulse on play button */}
                   <div className="absolute inset-0 rounded-full border border-fuchsia-500/50 animate-ping md:hidden opacity-50" style={{ animationDelay: `${i * 1.5}s` }}></div>
                   <Play size={18} className="ml-1 fill-current" />
                 </div>
                 <div>
                   <h4 className="font-bold text-lg">{track.title}</h4>
                   <span className="text-xs text-fuchsia-300 font-mono uppercase tracking-wide">{track.subtitle}</span>
                 </div>
               </div>
               <span className="text-sm font-mono opacity-50">{track.time}</span>
             </div>
           ))}
         </div>
       </div>

       {/* FAQ Section */}
       <div className="bg-indigo-950 border-t border-white/5 py-24">
           <div className="container mx-auto px-6 max-w-4xl">
               <h2 className="text-3xl font-bold mb-12 text-center">FAQ</h2>
               <div className="grid md:grid-cols-2 gap-10">
                  {[
                      { q: "How fast can I get a first draft?", a: "Turnaround depends on scope, but most projects start with a first draft within a few days." },
                      { q: "Do you offer revisions?", a: "Yes — revisions are included so the final sound matches your vision." },
                      { q: "Do I own the track?", a: "We’ll choose the right licensing option for your use-case (exclusive or non-exclusive)." },
                      { q: "Can you match a reference sound?", a: "Yes — send 2–3 references and what you like about them." },
                      { q: "What files do you deliver?", a: "WAV/MP3 by default; stems are available when needed." }
                  ].map((item, i) => (
                      <div key={i} className="border-l border-white/10 pl-6">
                          <h4 className="font-bold text-fuchsia-300 mb-2 flex items-center gap-2">
                             <HelpCircle size={14} /> {item.q}
                          </h4>
                          <p className="text-indigo-200/80 text-sm leading-relaxed">{item.a}</p>
                      </div>
                  ))}
               </div>
           </div>
       </div>

       <footer className="bg-indigo-950 py-12 text-center text-indigo-400 text-xs tracking-[0.3em] font-display border-t border-fuchsia-500/10 uppercase">
         PureCreativity.Music // Sonic Identity
       </footer>

    </div>
  );
};

export default Music;