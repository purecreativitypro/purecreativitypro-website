import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ScannerModal from '../components/ScannerModal';
import { Disc, Radio, Play, Check, ArrowRight } from 'lucide-react';
import SEOHead, { createServiceSchema, createFAQSchema } from '../components/SEOHead';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import CaseStudyCard from '../components/CaseStudyCard';
import SocialProofBar from '../components/SocialProofBar';
import FAQAccordion from '../components/FAQAccordion';
import CrossStudioLinks from '../components/CrossStudioLinks';
import TestimonialQuote from '../components/TestimonialQuote';

// Inline audio player component
const AudioPlayer: React.FC<{ title: string; subtitle: string; accent: string }> = ({ title, subtitle, accent }) => (
  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer">
    <div className={`w-10 h-10 ${accent} rounded-full flex items-center justify-center shrink-0 shadow-lg`}>
      <Play size={14} className="text-white ml-0.5 fill-current" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-sm text-white truncate">{title}</h4>
      <p className="text-xs text-indigo-300 truncate">{subtitle}</p>
    </div>
    <div className="hidden sm:flex items-end gap-0.5 h-6 opacity-30 group-hover:opacity-60 transition-opacity">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="w-1 bg-fuchsia-400 rounded-t-sm animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  </div>
);

const Music: React.FC = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const faqItems = [
    { q: "How fast can I get a first draft?", a: "Turnaround depends on scope, but most projects start with a first draft within a few days." },
    { q: "Do you offer revisions?", a: "Yes — revisions are included so the final sound matches your vision." },
    { q: "Do I own the track?", a: "We'll choose the right licensing option for your use-case (exclusive or non-exclusive)." },
    { q: "Can you match a reference sound?", a: "Yes — send 2–3 references and what you like about them." },
    { q: "What files do you deliver?", a: "WAV/MP3 by default; stems are available when needed." },
  ];

  return (
    <div className="min-h-screen bg-indigo-950 text-white font-sans selection:bg-fuchsia-900 selection:text-fuchsia-100 relative overflow-x-hidden">
      <SEOHead
        title="Music — Production, Scoring & Sound Design"
        description="Custom music production, film scoring, and sound design. We create original compositions that elevate your brand, content, and artistic identity."
        path="/music"
        jsonLd={[createServiceSchema('PureCreativity Music', 'Custom music production, scoring, and sound design for artists, brands, and content creators.', '/music'), createFAQSchema(faqItems.map(f => ({ question: f.q, answer: f.a })))]}
      />
      <Navigation theme="music" />
      <ScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} theme="music" />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px] -translate-x-1/3" />
      </div>

      {/* HERO — With equalizer bars */}
      <div className="relative pt-32 pb-20 px-6">
        {/* CSS Equalizer behind hero */}
        <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end justify-center gap-[3px] opacity-[0.06] pointer-events-none overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-fuchsia-400 rounded-t-sm"
              style={{
                height: '100%',
                transform: `scaleY(${0.1 + Math.random() * 0.9})`,
                transformOrigin: 'bottom',
                animation: `pulse ${1.5 + Math.random() * 2}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-fuchsia-400 font-bold tracking-[0.2em] uppercase text-xs mb-6 inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse" />
              PureCreativity Music
            </h4>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-[0.9]">
              Sound That<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">Moves People.</span>
            </h1>
            <p className="text-indigo-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Custom production, cinematic scoring, and sound design — crafted to match your vision, not a template.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://tidycal.com/purecreativitypro/purecreativity-blueprint-session"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-white text-indigo-950 font-bold tracking-wide hover:bg-fuchsia-50 transition-all hover:scale-105 shadow-lg active:scale-95 cursor-pointer flex items-center gap-2 group"
              >
                REQUEST A CUSTOM TRACK
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setIsScannerOpen(true)}
                className="px-8 py-4 rounded-full border border-indigo-500/30 text-indigo-200 font-bold tracking-wide hover:border-fuchsia-500 hover:text-fuchsia-400 transition-all active:scale-95"
              >
                TAKE THE SOUND SCAN
              </button>
            </div>

            <Link to="/media" className="mt-6 text-xs text-indigo-400 hover:text-fuchsia-400 transition-colors inline-flex items-center gap-1">
              Need visuals too? Check out Media <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF BAR */}
      <SocialProofBar
        accentColor="fuchsia"
        stats={[
          { value: 200, suffix: '+', label: 'Tracks Delivered' },
          { value: 40, suffix: '+', label: 'Artists Served' },
          { value: 48, prefix: '<', suffix: 'hr', label: 'First Draft' },
        ]}
      />

      {/* Marquee */}
      <div className="w-full py-10 overflow-hidden border-y border-white/5">
        <div className="flex whitespace-nowrap gap-16 animate-marquee w-max items-center text-sm tracking-[0.2em] font-bold text-fuchsia-200/20 will-change-transform">
          {[1, 2, 3].map(i => (
            <React.Fragment key={i}>
              <span>COMPOSITION</span><span>•</span><span>FILM SCORING</span><span>•</span><span>SOUND DESIGN</span><span>•</span><span>MIXING</span><span>•</span><span>MASTERING</span><span>•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* PROBLEM SECTION */}
      <div className="py-20 px-6 bg-white/[0.02]">
        <div className="container mx-auto max-w-3xl text-center">
          <ScrollReveal direction="up" distance={25}>
            <div className="inline-block bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">Sound familiar?</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">When the sound is wrong, everything feels off.</h2>
            <p className="text-indigo-200/80 text-lg leading-relaxed max-w-2xl mx-auto">
              Your content looks good, but it doesn't hit emotionally. Stock tracks feel generic. You need a sound that matches your brand, your scene, your identity.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* SERVICES — Bento Grid */}
      <div className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Production — Hero card */}
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-fuchsia-500/30 transition-all duration-500 bg-white/5 backdrop-blur-sm p-8 min-h-[320px] flex flex-col justify-between">
              <div>
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
              </div>
              {/* Visualizer */}
              <div className="h-12 flex items-end gap-1 opacity-30 group-hover:opacity-60 transition-opacity">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-full bg-fuchsia-500/50 rounded-t-sm animate-pulse" style={{ height: '100%', transform: `scaleY(${Math.random()})`, transformOrigin: 'bottom', animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>

            {/* Scoring */}
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-indigo-500/30 transition-all duration-500 bg-white/5 backdrop-blur-sm p-8 min-h-[320px] flex flex-col justify-between">
              <div>
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
              </div>
              {/* Waveform */}
              <div className="relative w-full h-12 bg-black/20 rounded-lg overflow-hidden flex items-center opacity-30 group-hover:opacity-60 transition-opacity">
                <div className="absolute left-0 right-0 h-[1px] bg-white/30" />
                <svg className="w-full h-full opacity-50" preserveAspectRatio="none">
                  <path d="M0 24 Q 50 8, 100 24 T 200 24 T 300 24 T 400 24" stroke="currentColor" fill="none" className="text-fuchsia-400" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THE PLAN */}
      <div className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal direction="up" distance={20}>
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">The Plan</h2>
          </ScrollReveal>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-indigo-800/50" />

            <div className="grid md:grid-cols-3 gap-8 mb-14">
              {[
                { step: "01", title: "Share the vibe", desc: "reference links, mood, purpose" },
                { step: "02", title: "We create the sound", desc: "first draft + revisions" },
                { step: "03", title: "You publish with confidence", desc: "final files + usage terms" }
              ].map((item, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 0.1} distance={20}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-full bg-indigo-900/50 border border-fuchsia-500/30 flex items-center justify-center mb-6 relative z-10 group-hover:border-fuchsia-500/60 group-hover:bg-fuchsia-950/30 transition-all">
                      <span className="text-lg font-bold text-fuchsia-400">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-indigo-300 text-sm">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://tidycal.com/purecreativitypro/purecreativity-blueprint-session"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white text-indigo-950 font-bold tracking-widest hover:bg-fuchsia-50 transition-all hover:scale-105 shadow-lg active:scale-95 cursor-pointer inline-block"
            >
              REQUEST A CUSTOM TRACK
            </a>
          </div>
        </div>
      </div>

      {/* THE REEL — Merged audio section */}
      <div className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal direction="up" distance={20}>
            <div className="mb-10 border-l-4 border-fuchsia-500 pl-6">
              <h3 className="text-fuchsia-400 font-bold mb-2 uppercase tracking-widest text-sm">The Reel</h3>
              <p className="text-indigo-200">Sample tracks from our production catalog. Full library available on request.</p>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {[
              { title: "Neon Horizon", subtitle: "Synthwave • Uplifting • Creator Intro", time: "3:42" },
              { title: "Corporate Synergy", subtitle: "Ad Bed • Bright • Clean", time: "1:15" },
              { title: "Tears in Rain", subtitle: "Cinematic • Emotional • Trailer", time: "4:20" },
            ].map((track, i) => (
              <ScrollReveal key={i} direction="left" delay={i * 0.08} distance={20}>
                <div className="flex items-center justify-between p-4 border border-white/10 hover:bg-white/5 transition-colors cursor-pointer group rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-fuchsia-600 transition-colors shrink-0">
                      <Play size={18} className="ml-1 fill-current" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{track.title}</h4>
                      <span className="text-xs text-fuchsia-300 font-mono uppercase tracking-wide">{track.subtitle}</span>
                    </div>
                  </div>
                  <span className="text-sm font-mono opacity-50">{track.time}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Additional audio players */}
          <div className="mt-8 space-y-3">
            <ScrollReveal direction="left" delay={0} distance={20}>
              <AudioPlayer title="Brand Sonic Logo — Elevate Studios" subtitle="3-second audio signature" accent="bg-fuchsia-500" />
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.1} distance={20}>
              <AudioPlayer title="Podcast Intro — The Growth Lab" subtitle="30-second podcast opener" accent="bg-purple-500" />
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.2} distance={20}>
              <AudioPlayer title="Product Launch Score — Bloom & Co" subtitle="Background score for launch video" accent="bg-fuchsia-600" />
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* RECENT PROJECTS */}
      <div className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal direction="up" distance={20}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">Recent Projects</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal direction="left" delay={0} distance={20}>
              <CaseStudyCard
                title="Full Sonic Branding Package"
                client="Bloom & Co"
                description="Created a complete audio identity including sonic logo, hold music, podcast intro, and event soundscapes."
                result="Brand recognition +40%"
                imageUrl="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=70&w=600&auto=format&fit=crop"
                accent="text-fuchsia-400"
              />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1} distance={20}>
              <CaseStudyCard
                title="Album Production & Mixing"
                client="Independent Artist"
                description="Produced, mixed, and mastered a 10-track debut album. Delivered radio-ready masters with full stem packages."
                result="50K+ streams month 1"
                imageUrl="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=70&w=600&auto=format&fit=crop"
                accent="text-fuchsia-400"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <TestimonialQuote
        quote="The score they wrote for my short film elevated the entire project. The judges specifically mentioned the music as a standout."
        author="A. Chen"
        role="Filmmaker"
        accentColor="fuchsia"
      />

      {/* FAQ — Accordion */}
      <div className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal direction="up" distance={20}>
            <h2 className="text-3xl font-bold mb-12 text-center">FAQ</h2>
          </ScrollReveal>
          <FAQAccordion items={faqItems} accentColor="fuchsia" />
        </div>
      </div>

      {/* CROSS-STUDIO LINKS */}
      <CrossStudioLinks />

      {/* SHARED FOOTER */}
      <Footer theme="music" />
    </div>
  );
};

export default Music;