import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Volume2, BookOpen, Layers, Sparkles, Image as ImageIcon } from 'lucide-react';
import { MAKHARIJ_CATEGORIES, ALL_HURUF_DATA } from '../data/makharijData';
import { MakhrajCategoryId, HurufItem, MakhrajZoneId } from '../types';
import { LetterCard } from '../components/LetterCard';
import { AnatomyDiagram } from '../components/AnatomyDiagram';
import { audioPlayer } from '../utils/audioPlayer';
import { TAJWID_IMAGES } from '../assets/images';

interface LessonsViewProps {
  selectedCategoryId: MakhrajCategoryId;
  onSelectCategory: (catId: MakhrajCategoryId) => void;
  onOpenDetail: (huruf: HurufItem) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  selectedCategoryId,
  onSelectCategory,
  onOpenDetail,
}) => {
  const currentCategory =
    MAKHARIJ_CATEGORIES.find((c) => c.id === selectedCategoryId) ||
    MAKHARIJ_CATEGORIES[0];

  const [activeSubcategoryIdx, setActiveSubcategoryIdx] = useState<number | null>(null);

  // Letters belonging to this category
  const categoryLetters = ALL_HURUF_DATA.filter(
    (h) => h.kategoriId === currentCategory.id
  );

  // Filtered letters if subcategory selected
  const activeSubcategory =
    activeSubcategoryIdx !== null
      ? currentCategory.subkategoriList[activeSubcategoryIdx]
      : null;

  const displayedLetters = activeSubcategory
    ? categoryLetters.filter((h) =>
        activeSubcategory.huruf.includes(h.huruf)
      )
    : categoryLetters;

  // Active zone for anatomy diagram
  const activeZoneId: MakhrajZoneId = activeSubcategory
    ? activeSubcategory.zonaId
    : currentCategory.zonaAnatomi[0];

  const handleCategorySwitch = (catId: MakhrajCategoryId) => {
    onSelectCategory(catId);
    setActiveSubcategoryIdx(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Category Tabs Strip */}
      <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2 justify-start sm:justify-center">
        {MAKHARIJ_CATEGORIES.map((cat) => {
          const isActive = cat.id === selectedCategoryId;
          return (
            <button
              key={cat.id}
              id={`tab-category-${cat.id}`}
              onClick={() => handleCategorySwitch(cat.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-sm font-semibold transition-all shrink-0 ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-stone-400'
              }`}
            >
              <span className="font-arabic text-lg font-bold" lang="ar">
                {cat.namaArab}
              </span>
              <span>{cat.nama}</span>
            </button>
          );
        })}
      </div>

      {/* Category Header Card */}
      <motion.div
        key={currentCategory.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Makhraj Utama
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {currentCategory.hurufRingkas.length} Huruf
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100">
                {currentCategory.nama} — {currentCategory.arti}
              </h1>
              <span className="font-arabic text-3xl font-bold text-emerald-700 dark:text-emerald-400" lang="ar">
                {currentCategory.namaArab}
              </span>
            </div>

            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
              {currentCategory.deskripsi}
            </p>

            {/* Special Tajwid Warning / Guidance */}
            {currentCategory.catatanKhusus && (
              <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Catatan Pembelajaran: </strong>
                  {currentCategory.catatanKhusus}
                </div>
              </div>
            )}
          </div>

          {/* Category Visual Highlight (Diagram & Book Illustration) */}
          <div className="lg:col-span-5 bg-stone-50 dark:bg-stone-950/60 p-4 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <ImageIcon size={14} className="text-emerald-600" />
                {currentCategory.id === 'lisan' && 'Ilustrasi Anatomi Lidah (اللسان)'}
                {currentCategory.id === 'halqi' && 'Ilustrasi Tenggorokan 3 Tingkat (الحلق)'}
                {currentCategory.id === 'syafatain' && 'Ilustrasi Dua Bibir & Gigi (الشفتان)'}
                {currentCategory.id === 'khaisyum' && 'Ilustrasi Rongga Hidung (الخيشوم)'}
                {currentCategory.id === 'jauf' && 'Ilustrasi Rongga Terbuka Al-Jauf (الجوف)'}
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950">
                Standar Buku Tajwid
              </span>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xs bg-white dark:bg-stone-900 group">
              <img
                src={
                  currentCategory.id === 'lisan'
                    ? TAJWID_IMAGES.lisanTongue
                    : currentCategory.id === 'halqi'
                    ? TAJWID_IMAGES.halqiThroat
                    : currentCategory.id === 'syafatain'
                    ? TAJWID_IMAGES.syafatainLips
                    : TAJWID_IMAGES.fullAnatomy
                }
                alt={`Ilustrasi Anatomi ${currentCategory.nama}`}
                className="w-full h-full object-contain filter contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 right-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-lg">
                At-Tajwid Al-Musawwar
              </div>
            </div>

            <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center leading-relaxed">
              {currentCategory.id === 'lisan' && 'Memperlihatkan titik kontak pangkal, tengah, tepi geraham, dan ujung lidah dengan gusi serta gigi seri.'}
              {currentCategory.id === 'halqi' && 'Tenggorokan terbagi menjadi Pangkal di pita suara (ء, ه), Tengah di epiglotis (ع, ح), dan Ujung di uvula (غ, خ).'}
              {currentCategory.id === 'syafatain' && 'Artikulasi bibir bawah menyentuh ujung gigi seri atas (ف) dan penutupan kedua bibir (ب, م, و).'}
              {currentCategory.id === 'khaisyum' && 'Saluran rongga hidung bagian atas tempat terjadinya dengung (ghunnah) pada nun dan mim tasydid.'}
              {currentCategory.id === 'jauf' && 'Rongga terbuka dari rongga dada tenggorokan hingga mulut tempat berlalunya hembusan huruf-huruf mad.'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Subcategory Navigation / Filter (Pangkal, Tengah, Ujung, etc.) */}
      {currentCategory.subkategoriList.length > 1 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            <Layers size={15} />
            <span>Pilih Subkategori Posisi:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              id="subcat-all"
              onClick={() => setActiveSubcategoryIdx(null)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                activeSubcategoryIdx === null
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-transparent shadow-xs'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-400'
              }`}
            >
              Semua Bagian ({categoryLetters.length})
            </button>

            {currentCategory.subkategoriList.map((sub, idx) => {
              const isSelected = activeSubcategoryIdx === idx;
              return (
                <button
                  key={sub.nama}
                  id={`subcat-btn-${idx}`}
                  onClick={() => setActiveSubcategoryIdx(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <span>{sub.nama}</span>
                  <span className="font-arabic font-bold text-xs" lang="ar">
                    ({sub.huruf.join(' ')})
                  </span>
                </button>
              );
            })}
          </div>

          {activeSubcategory && (
            <div className="text-xs text-stone-500 dark:text-stone-400 pt-1 italic">
              Posisi artikulasi: {activeSubcategory.deskripsi}
            </div>
          )}
        </div>
      )}

      {/* Letters Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Daftar Huruf {currentCategory.nama}
          </h2>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Klik kartu untuk penjelasan lengkap & latihan harakat
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedLetters.map((huruf) => (
            <LetterCard
              key={huruf.id}
              huruf={huruf}
              onOpenDetail={() => onOpenDetail(huruf)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
