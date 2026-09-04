import React, { useState } from 'react';
import { Volume2, Info, Sparkles, BookOpen, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { AnatomyDiagram, MAKHRAJ_5_UMUM } from '../components/AnatomyDiagram';
import { ALL_HURUF_DATA, MAKHARIJ_CATEGORIES } from '../data/makharijData';
import { HurufItem, MakhrajCategoryId } from '../types';
import { audioPlayer } from '../utils/audioPlayer';

interface MapViewProps {
  onOpenDetail: (huruf: HurufItem) => void;
}

export const MapView: React.FC<MapViewProps> = ({ onOpenDetail }) => {
  const [activeCategory, setActiveCategory] = useState<MakhrajCategoryId>('halqi');
  const [selectedLetterId, setSelectedLetterId] = useState<string>('ain');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const activeMakhrajInfo = MAKHRAJ_5_UMUM[activeCategory];
  const activeCategoryFull = MAKHARIJ_CATEGORIES.find((c) => c.id === activeCategory);

  // All letters that belong to this active general makhraj
  const lettersInActiveMakhraj = ALL_HURUF_DATA.filter(
    (h) => h.kategoriId === activeCategory
  );

  const selectedLetter =
    ALL_HURUF_DATA.find((h) => h.id === selectedLetterId) ||
    lettersInActiveMakhraj[0] ||
    ALL_HURUF_DATA[0];

  const handleSelectCategory = (catId: MakhrajCategoryId) => {
    setActiveCategory(catId);
    const firstLetterInCat = ALL_HURUF_DATA.find((h) => h.kategoriId === catId);
    if (firstLetterInCat) {
      setSelectedLetterId(firstLetterInCat.id);
    }
  };

  const handleSelectLetter = (huruf: HurufItem) => {
    setSelectedLetterId(huruf.id);
    setActiveCategory(huruf.kategoriId);
  };

  const handlePlayLetter = (e: React.MouseEvent, huruf: HurufItem) => {
    e.stopPropagation();
    setPlayingId(huruf.id);
    audioPlayer.playLetter(
      huruf,
      () => setPlayingId(huruf.id),
      () => setPlayingId(null)
    );
  };

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 shadow-xs">
          <Sparkles size={14} />
          <span>Peta 5 Makharijul Huruf Umum</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
          Tempat Keluarnya Huruf Hijaiyah
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Sesuai pembagian umum ilmu tajwid (*At-Tajwid Al-Musawwar*), makhraj huruf hijaiyah dibagi menjadi <strong className="text-stone-900 dark:text-stone-100 font-bold">5 tempat keluar utama</strong>. Klik titik pada ilustrasi di bawah untuk membuka informasi lengkapnya.
        </p>
      </div>

      {/* Anatomy Map Section (Centered, Clean Textbook Artwork with 5 Hotspots) */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-4 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: activeMakhrajInfo.color }}
            />
            <h2 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
              Ilustrasi Penampang Samping Organ Bicara
            </h2>
          </div>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded-lg">
            Profil Menghadap Kiri (Standar Tajwid)
          </span>
        </div>

        {/* The 5-Point Anatomy Diagram */}
        <AnatomyDiagram
          activeCategoryId={activeCategory}
          onSelectCategory={handleSelectCategory}
          interactive={true}
          showLabels={true}
        />
      </div>

      {/* EXPANDED WIDE DETAIL SECTION: What is this Makhraj & All its Letters */}
      {activeMakhrajInfo && activeCategoryFull && (
        <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-md overflow-hidden transition-all">
          {/* Top Banner with Makhraj Title, Arabic, Meaning & Color Accent */}
          <div
            className="p-6 sm:p-8 border-b border-stone-200 dark:border-stone-800"
            style={{
              background: `linear-gradient(135deg, ${activeMakhrajInfo.color}15 0%, transparent 60%)`,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs"
                    style={{ backgroundColor: activeMakhrajInfo.color }}
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Makhraj Umum #{Object.keys(MAKHRAJ_5_UMUM).indexOf(activeCategory) + 1}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {lettersInActiveMakhraj.length} Huruf
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-50">
                  {activeMakhrajInfo.nama}{' '}
                  <span className="text-stone-500 dark:text-stone-400 font-normal">
                    — {activeMakhrajInfo.arti}
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 max-w-3xl leading-relaxed pt-1">
                  <strong className="font-semibold text-stone-900 dark:text-stone-100">
                    Tempat Keluarnya:
                  </strong>{' '}
                  {activeCategoryFull.deskripsi}
                </p>
              </div>

              {/* Large Arabic Calligraphy Name */}
              <div className="text-right shrink-0">
                <span
                  className="font-arabic text-5xl sm:text-6xl font-bold tracking-normal block"
                  style={{ color: activeMakhrajInfo.color }}
                  lang="ar"
                >
                  {activeMakhrajInfo.namaArab}
                </span>
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400 block mt-1">
                  {activeMakhrajInfo.hurufRingkas}
                </span>
              </div>
            </div>

            {/* Special Tajweed Note if available */}
            {activeCategoryFull.catatanKhusus && (
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Catatan Tajwid Penting: </strong>
                  {activeCategoryFull.catatanKhusus}
                </div>
              </div>
            )}
          </div>

          {/* Letters Grid: Wide, Clear, Easy to Touch and Listen */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  Daftar Huruf dari Makhraj {activeMakhrajInfo.nama}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Klik kartu huruf untuk melihat posisi detail artikulasinya dan mendengarkan suaranya
                </p>
              </div>
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full w-fit">
                Total {lettersInActiveMakhraj.length} Huruf
              </span>
            </div>

            {/* Grid of Letters in This Makhraj */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lettersInActiveMakhraj.map((huruf) => {
                const isSelected = selectedLetter.id === huruf.id;
                const isPlaying = playingId === huruf.id;

                return (
                  <div
                    key={huruf.id}
                    id={`card-huruf-${huruf.id}`}
                    onClick={() => handleSelectLetter(huruf)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-500 shadow-md ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-stone-900 scale-[1.01]'
                        : 'bg-stone-50/70 dark:bg-stone-800/40 border-stone-200 dark:border-stone-700/80 hover:border-emerald-400 hover:bg-stone-50 dark:hover:bg-stone-800/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      {/* Big Arabic Letter Box */}
                      <div className="w-16 h-16 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 flex items-center justify-center shadow-xs shrink-0">
                        <span className="font-arabic text-4xl font-bold text-stone-900 dark:text-stone-50" lang="ar">
                          {huruf.huruf}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 truncate">
                            {huruf.nama}
                          </h4>
                          <span className="font-arabic text-sm text-stone-400 shrink-0">
                            ({huruf.namaArab})
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 line-clamp-1 mt-0.5">
                          {huruf.subkategori}
                        </p>
                        <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mt-1 leading-snug">
                          {huruf.caraPengucapan}
                        </p>
                      </div>
                    </div>

                    {/* Example & Audio Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-stone-700/60 gap-2">
                      <div className="font-arabic text-sm font-semibold text-stone-700 dark:text-stone-300" lang="ar">
                        {huruf.contoh.harakat}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          id={`btn-play-${huruf.id}`}
                          type="button"
                          onClick={(e) => handlePlayLetter(e, huruf)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                            isPlaying
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900'
                          }`}
                          title="Dengarkan Suara"
                        >
                          <Volume2 size={14} />
                          <span>{isPlaying ? 'Memutar...' : 'Suara'}</span>
                        </button>

                        <button
                          id={`btn-detail-${huruf.id}`}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDetail(huruf);
                          }}
                          className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-200/70 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 transition-colors"
                          title="Buka Detail Lengkap"
                        >
                          <Info size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Summary of All 5 General Makhraj Categories */}
      <section className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Rangkuman 5 Kelompok Makhraj Huruf Hijaiyah
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Pilih makhraj di bawah untuk beralih langsung ke pembahasan makhraj tersebut:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {MAKHARIJ_CATEGORIES.map((cat, idx) => {
            const isCurrent = activeCategory === cat.id;
            const info = MAKHRAJ_5_UMUM[cat.id];

            return (
              <button
                key={cat.id}
                id={`summary-cat-btn-${cat.id}`}
                type="button"
                onClick={() => handleSelectCategory(cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                  isCurrent
                    ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-sm ring-1 ring-emerald-500'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 hover:border-stone-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: info.color }}
                    />
                    <span className="font-arabic text-xl font-bold" lang="ar" style={{ color: info.color }}>
                      {cat.namaArab}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {idx + 1}. {cat.nama}
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                    {cat.arti}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/50 dark:border-stone-700/50 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    {cat.hurufRingkas.join(' ')}
                  </span>
                  <ChevronRight size={13} className="text-stone-400" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
