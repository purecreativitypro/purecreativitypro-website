import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  subtitle?: string;
  accent?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  subtitle,
  accent = 'bg-fuchsia-500',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = clickX / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  // Generate static waveform bars (visual only — not real waveform)
  const bars = Array.from({ length: 40 }, (_, i) => {
    const height = 20 + Math.sin(i * 0.7) * 15 + Math.cos(i * 1.3) * 10;
    return Math.max(8, Math.min(40, height));
  });

  return (
    <div className="group border border-white/5 rounded-xl bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-all duration-300">
      {/* Hidden audio element — placeholder silent audio */}
      <audio ref={audioRef} preload="metadata">
        {/* User will add real src later */}
        <source src="" type="audio/mpeg" />
      </audio>

      <div className="flex items-center gap-4">
        {/* Play Button */}
        <button
          onClick={togglePlay}
          className={`shrink-0 w-12 h-12 rounded-full ${accent} flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-lg`}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" className="ml-0.5" />}
        </button>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex items-center justify-between mb-2">
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-white truncate">{title}</h4>
              {subtitle && <p className="text-[11px] text-zinc-500 truncate">{subtitle}</p>}
            </div>
            <span className="text-[10px] font-mono text-zinc-500 shrink-0 ml-3">
              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : '--:--'}
            </span>
          </div>

          {/* Waveform Progress Bar */}
          <div
            ref={progressRef}
            className="relative h-8 flex items-end gap-[2px] cursor-pointer"
            onClick={handleProgressClick}
          >
            {bars.map((h, i) => {
              const barPct = ((i + 1) / bars.length) * 100;
              const isFilled = barPct <= progress;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-colors duration-150 ${
                    isFilled ? accent : 'bg-white/10'
                  }`}
                  style={{ height: `${h}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
