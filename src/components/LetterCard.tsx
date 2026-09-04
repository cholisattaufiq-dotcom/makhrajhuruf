import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { HurufItem } from '../types';
import { audioPlayer } from '../utils/audioPlayer';

interface LetterCardProps {
  huruf: HurufItem;
  isSelected?: boolean;
  onSelect?: (huruf: HurufItem) => void;
  onOpenDetail?: (huruf: HurufItem) => void;
  className?: string;
}

const CATEGORY_COLORS: Record<string, { badge: string; border: string; glow: string; text: string }> = {
  Jauf: {
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800/60',
    glow: 'hover:shadow-emerald-500/10',
    text: 'text-emerald-700 dark:text-emerald-400',
  },
  Halqi: {
    badge: 'bg-violet-100 text-violet-800 dark:bg-violet-950/70 dark:text-violet-300',
    border: 'border-violet-200 dark:border-violet-800/60',
    glow: 'hover:shadow-violet-500/10',
    text: 'text-violet-700 dark:text-violet-400',
  },
  Lisan: {
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800/60',
    glow: 'hover:shadow-amber-500/10',
    text: 'text-amber-700 dark:text-amber-400',
  },
  Syafatain: {
    badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800/60',
    glow: 'hover:shadow-rose-500/10',
    text: 'text-rose-700 dark:text-rose-400',
  },
  Khaisyum: {
    badge: 'bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300',
    border: 'border-sky-200 dark:border-sky-800/60',
    glow: 'hover:shadow-sky-500/10',
    text: 'text-sky-700 dark:text-sky-400',
  },
};

export const LetterCard: React.FC<LetterCardProps> = ({
  huruf,
  isSelected = false,
  onSelect,
  onOpenDetail,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const colorTheme = CATEGORY_COLORS[huruf.kategori] || CATEGORY_COLORS.Lisan;

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    audioPlayer.playLetter(
      huruf,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  const handleCardClick = () => {
    if (onSelect) onSelect(huruf);
    if (onOpenDetail) onOpenDetail(huruf);
  };

  return (
    <motion.div
      id={`letter-card-${huruf.id}`}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className={`group relative flex flex-col justify-between bg-white dark:bg-stone-900 rounded-2xl p-5 border transition-all cursor-pointer shadow-sm hover:shadow-md ${colorTheme.glow} ${
        isSelected
          ? `ring-2 ring-emerald-500 ${colorTheme.border} bg-emerald-50/20 dark:bg-emerald-950/20 shadow-md`
          : `${colorTheme.border} hover:border-stone-400 dark:hover:border-stone-600`
      } ${className}`}
    >
      {/* Top Bar: Category & Detail Link */}
      <div className="flex items-center justify-between w-full mb-2">
        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${colorTheme.badge}`}>
          {huruf.kategori}
        </span>
        <button
          id={`btn-detail-${huruf.id}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenDetail) onOpenDetail(huruf);
          }}
          className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          title="Lihat Detail Huruf"
          aria-label="Lihat Detail Huruf"
        >
          <Info size={16} />
        </button>
      </div>

      {/* Center: HUGE ARABIC LETTER */}
      <div className="flex flex-col items-center justify-center my-3">
        <span
          className="font-arabic text-6xl sm:text-7xl font-bold text-stone-900 dark:text-stone-50 select-none group-hover:scale-105 transition-transform duration-200 leading-none"
          lang="ar"
        >
          {huruf.huruf}
        </span>
        <span className="font-arabic text-sm text-stone-400 dark:text-stone-500 mt-1">
          {huruf.namaArab}
        </span>
      </div>

      {/* Bottom Info: Name, Subcategory, & Audio Button */}
      <div className="w-full pt-3 border-t border-stone-100 dark:border-stone-800/80 flex flex-col gap-2.5">
        <div className="text-center">
          <h4 className="font-bold text-stone-800 dark:text-stone-100 text-base">
            {huruf.nama}
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
            {huruf.subkategori}
          </p>
        </div>

        {/* Listen Button */}
        <button
          id={`btn-audio-${huruf.id}`}
          onClick={handlePlayAudio}
          className={`w-full py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
            isPlaying
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200'
          }`}
          aria-label={`Dengarkan huruf ${huruf.nama}`}
        >
          {isPlaying ? (
            <>
              <Volume2 size={16} className="animate-bounce" />
              <span>Memutar...</span>
            </>
          ) : (
            <>
              <Volume2 size={16} />
              <span>🔊 Dengarkan</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
