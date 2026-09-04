import React, { useState } from 'react';
import { X, Volume2, ChevronLeft, ChevronRight, CheckCircle2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HurufItem } from '../types';
import { audioPlayer } from '../utils/audioPlayer';
import { AnatomyDiagram } from './AnatomyDiagram';

interface LetterDetailModalProps {
  huruf: HurufItem | null;
  onClose: () => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
}

export const LetterDetailModal: React.FC<LetterDetailModalProps> = ({
  huruf,
  onClose,
  onNavigateNext,
  onNavigatePrev,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!huruf) return null;

  const handlePlayAudio = () => {
    setIsPlaying(true);
    audioPlayer.playLetter(
      huruf,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {huruf.kategori}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {huruf.subkategori}
              </span>
            </div>
            <button
              id="btn-close-modal"
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Top Display: Letter + Big Name */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/40">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white dark:bg-stone-800 border border-emerald-200 dark:border-emerald-800/80 shadow-sm flex items-center justify-center">
                  <span className="font-arabic text-6xl font-bold text-stone-900 dark:text-white leading-none">
                    {huruf.huruf}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
                    {huruf.nama}
                  </h3>
                  <p className="font-arabic text-lg text-emerald-700 dark:text-emerald-400 font-semibold">
                    {huruf.namaArab}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Makhraj: <span className="font-medium text-stone-700 dark:text-stone-300">{huruf.subkategori}</span>
                  </p>
                </div>
              </div>

              {/* Audio Play Button */}
              <button
                id={`btn-modal-audio-${huruf.id}`}
                onClick={handlePlayAudio}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-semibold text-sm transition-all shadow-sm ${
                  isPlaying
                    ? 'bg-emerald-700 text-white scale-95'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-emerald-600/20 hover:shadow-md'
                }`}
              >
                <Volume2 size={18} className={isPlaying ? 'animate-bounce' : ''} />
                <span>{isPlaying ? 'Memutar Suara...' : '🔊 Dengarkan Makhraj'}</span>
              </button>
            </div>

            {/* Visual Makhraj Highlight Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Visualisasi Titik Makhraj (Sesuai Buku Tajwid)
                </h4>
                <span className="text-xs text-stone-400">
                  Area yang disorot adalah titik artikulasi huruf ini
                </span>
              </div>
              <div className="flex justify-center p-2 bg-stone-50 dark:bg-stone-950/60 rounded-2xl border border-stone-200 dark:border-stone-800">
                <AnatomyDiagram
                  activeZoneId={huruf.makhrajZoneId}
                  interactive={true}
                  showLabels={false}
                  className="w-full max-w-[380px]"
                />
              </div>
            </div>

            {/* Articulation & Tajwid Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cara Pengucapan */}
              <div className="bg-stone-50 dark:bg-stone-800/60 rounded-2xl p-4 border border-stone-200/80 dark:border-stone-700/80">
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                  Cara Pengucapan
                </h5>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {huruf.caraPengucapan}
                </p>
              </div>

              {/* Penjelasan Makhraj */}
              <div className="bg-stone-50 dark:bg-stone-800/60 rounded-2xl p-4 border border-stone-200/80 dark:border-stone-700/80">
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-indigo-600 dark:text-indigo-400" />
                  Deskripsi Makhraj
                </h5>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {huruf.penjelasan}
                </p>
              </div>
            </div>

            {/* Important Notes */}
            {huruf.catatanPenting && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4 text-xs text-amber-900 dark:text-amber-200">
                <strong>Catatan Penting:</strong> {huruf.catatanPenting}
              </div>
            )}

            {/* Examples & Harakat */}
            <div className="bg-stone-50 dark:bg-stone-800/40 rounded-2xl p-5 border border-stone-200 dark:border-stone-800">
              <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                Latihan Harakat & Contoh Bacaan Al-Qur'an
              </h5>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full text-center sm:text-left">
                  <div className="font-arabic text-3xl font-bold text-emerald-800 dark:text-emerald-300 mb-1 tracking-wider" lang="ar">
                    {huruf.contoh.harakat}
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    Bentuk pelafalan (Fathah, Kasrah, Dhammah, Sukun)
                  </div>
                </div>

                <div className="w-full text-center sm:text-right bg-white dark:bg-stone-900 rounded-xl p-3 border border-stone-200 dark:border-stone-700">
                  <div className="font-arabic text-xl font-bold text-stone-900 dark:text-white" lang="ar">
                    {huruf.contoh.bacaan}
                  </div>
                  {huruf.contoh.arti && (
                    <div className="text-xs text-stone-500 dark:text-stone-400 mt-1 italic">
                      "{huruf.contoh.arti}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
            <button
              id="btn-prev-huruf"
              onClick={onNavigatePrev}
              disabled={!onNavigatePrev}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft size={16} />
              Huruf Sebelumnya
            </button>
            <button
              id="btn-next-huruf"
              onClick={onNavigateNext}
              disabled={!onNavigateNext}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 transition-colors"
            >
              Huruf Berikutnya
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
