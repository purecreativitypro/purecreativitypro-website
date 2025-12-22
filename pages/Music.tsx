import React from 'react';
import Navigation from '../components/Navigation';
import { Mic2, Music as MusicIcon, Radio, Disc, Sliders, Headphones } from 'lucide-react';

const Music: React.FC = () => {
  return (
    <div className="min-h-screen bg-indigo-950 text-white font-display relative overflow-hidden">
      <Navigation theme="music" />

      {/* Ambient Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-fuchsia-600 rounded-full blur-[128px] opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-[0%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[128px] opacity-30 animate-float"></div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-pink-400 to-purple-500 drop-shadow-lg">
          SONIC<br />VISION
        </h1>
        <p className="text-xl md:text-2xl text-indigo-200 max-w-2xl font-light mb-12">
          We craft soundscapes that move audiences. From chart-topping instrumentals to immersive movie scoring.
        </p>
        
        <button className="relative px-8 py-4 rounded-full bg-fuchsia-600 text-white font-bold tracking-widest hover:bg-fuchsia-500 transition-all shadow-[0_0_30px_rgba(192,38,211,0.5)] hover:shadow-[0_0_50px_rgba(192,38,211,0.7)] group overflow-hidden">
          <span className="relative z-10 flex items-center gap-2">
            LISTEN TO REEL <Headphones size={20} className="animate-bounce md:animate-none" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>

      {/* Marquee / Infinite Scroll */}
      <div className="w-full bg-indigo-900/30 border-y border-white/5 py-6 overflow-hidden mb-20 backdrop-blur-sm flex items-center">
        <div className="flex whitespace-nowrap gap-16 animate-marquee w-max items-center opacity-50 text-sm tracking-[0.2em] font-bold text-fuchsia-200/50">
          {/* Loop 1 */}
          <span>COMPOSITION</span>
          <span>•</span>
          <span>FILM SCORING</span>
          <span>•</span>
          <span>SOUND DESIGN</span>
          <span>•</span>
          <span>MIXING</span>
          <span>•</span>
          <span>MASTERING</span>
          <span>•</span>
          {/* Loop 2 */}
          <span>COMPOSITION</span>
          <span>•</span>
          <span>FILM SCORING</span>
          <span>•</span>
          <span>SOUND DESIGN</span>
          <span>•</span>
          <span>MIXING</span>
          <span>•</span>
          <span>MASTERING</span>
          <span>•</span>
          {/* Loop 3 */}
          <span>COMPOSITION</span>
          <span>•</span>
          <span>FILM SCORING</span>
          <span>•</span>
          <span>SOUND DESIGN</span>
          <span>•</span>
          <span>MIXING</span>
          <span>•</span>
          <span>MASTERING</span>
          <span>•</span>
          {/* Loop 4 */}
          <span>COMPOSITION</span>
          <span>•</span>
          <span>FILM SCORING</span>
          <span>•</span>
          <span>SOUND DESIGN</span>
          <span>•</span>
          <span>MIXING</span>
          <span>•</span>
          <span>MASTERING</span>
          <span>•</span>
        </div>
      </div>

      {/* Offerings */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Disc className="text-white" size={24} />
            </div>
            <h3 className="text-3xl font-bold mb-4">Production</h3>
            <p className="text-indigo-200 leading-relaxed mb-6">
              Tailor-made instrumentals for artists looking for their signature sound. We blend genre-bending rhythms with emotional melodies.
            </p>
            <div className="h-16 flex items-end gap-1">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-full bg-fuchsia-500/50 rounded-t-sm animate-pulse"
                  style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
             <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Radio className="text-white" size={24} />
            </div>
            <h3 className="text-3xl font-bold mb-4">Scoring & Media</h3>
            <p className="text-indigo-200 leading-relaxed mb-6">
              Evocative background scores for films, commercials, and content creators. We tell the story your visuals can't tell alone.
            </p>
             <div className="relative w-full h-16 bg-black/20 rounded-lg overflow-hidden flex items-center">
                <div className="absolute left-0 right-0 h-[1px] bg-white/30"></div>
                <div className="absolute w-32 h-full bg-indigo-500/20 border-l border-indigo-400"></div>
                <svg className="w-full h-full opacity-50" preserveAspectRatio="none">
                  <path d="M0 32 Q 50 10, 100 32 T 200 32 T 300 32" stroke="currentColor" fill="none" className="text-fuchsia-400" />
                </svg>
             </div>
          </div>

        </div>
      </div>
      
       {/* Featured Tracks List (Visual Only) */}
       <div className="container mx-auto px-6 pb-20 max-w-4xl">
         <h3 className="text-fuchsia-400 font-bold mb-8 uppercase tracking-widest text-sm">Recent Works</h3>
         <div className="space-y-4">
           {[
             { title: "Neon Horizon", type: "Synthwave Instrumental", time: "3:42" },
             { title: "Corporate Synergy", type: "Ad Campaign Background", time: "1:15" },
             { title: "Tears in Rain", type: "Cinematic Score", time: "4:20" }
           ].map((track, i) => (
             <div key={i} className="flex items-center justify-between p-4 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-fuchsia-500 transition-colors relative">
                   {/* Mobile pulse on play button */}
                   <div className="absolute inset-0 rounded-full border border-fuchsia-500/50 animate-ping md:hidden opacity-50" style={{ animationDelay: `${i * 1.5}s` }}></div>
                   <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                 </div>
                 <div>
                   <h4 className="font-bold">{track.title}</h4>
                   <span className="text-xs text-indigo-300">{track.type}</span>
                 </div>
               </div>
               <span className="text-sm font-mono opacity-50">{track.time}</span>
             </div>
           ))}
         </div>
       </div>

    </div>
  );
};

export default Music;