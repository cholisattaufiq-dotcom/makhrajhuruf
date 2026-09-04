import React from 'react';
import { ArrowRight, Map, BookOpen, HelpCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { MAKHARIJ_CATEGORIES } from '../data/makharijData';
import { ActiveTab, MakhrajCategoryId } from '../types';

interface HomeViewProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectCategory: (catId: MakhrajCategoryId) => void;
}

const CATEGORY_CARDS = [
  {
    id: 'jauf' as MakhrajCategoryId,
    namaArab: 'جَوْف',
    namaLatin: 'Jauf',
    arti: 'Rongga Mulut & Tenggorokan',
    hurufCount: '3 Huruf Mad',
    hurufContoh: 'ا  و  ي',
    bgLight: 'bg-emerald-500/10',
    borderLight: 'border-emerald-500/30',
    hoverGlow: 'hover:border-emerald-500 hover:shadow-emerald-500/10',
    accentText: 'text-emerald-700 dark:text-emerald-400',
    desc: 'Tempat keluarnya huruf-huruf mad yang mengalir luas melalui rongga mulut dan tenggorokan yang terbuka.',
  },
  {
    id: 'halqi' as MakhrajCategoryId,
    namaArab: 'حَلْق',
    namaLatin: 'Halqi',
    arti: 'Tenggorokan',
    hurufCount: '6 Huruf',
    hurufContoh: 'ء  ه  ع  ح  غ  خ',
    bgLight: 'bg-violet-500/10',
    borderLight: 'border-violet-500/30',
    hoverGlow: 'hover:border-violet-500 hover:shadow-violet-500/10',
    accentText: 'text-violet-700 dark:text-violet-400',
    desc: 'Saluran tenggorokan dari pangkal dekat pita suara, tengah di katup epiglotis, hingga ujung atas.',
  },
  {
    id: 'lisan' as MakhrajCategoryId,
    namaArab: 'لِسَان',
    namaLatin: 'Lisān',
    arti: 'Lidah',
    hurufCount: '18 Huruf',
    hurufContoh: 'ق  ك  ج  ش  ض  ل  ن ...',
    bgLight: 'bg-amber-500/10',
    borderLight: 'border-amber-500/30',
    hoverGlow: 'hover:border-amber-500 hover:shadow-amber-500/10',
    accentText: 'text-amber-700 dark:text-amber-400',
    desc: 'Makhraj terbesar dengan 10 titik artikulasi: pangkal, tengah, sisi tepi, ujung lidah, hingga gusi dan gigi.',
  },
  {
    id: 'syafatain' as MakhrajCategoryId,
    namaArab: 'شَفَتَان',
    namaLatin: 'Syafatain',
    arti: 'Dua Bibir',
    hurufCount: '4 Huruf',
    hurufContoh: 'ف  ب  م  و',
    bgLight: 'bg-rose-500/10',
    borderLight: 'border-rose-500/30',
    hoverGlow: 'hover:border-rose-500 hover:shadow-rose-500/10',
    accentText: 'text-rose-700 dark:text-rose-400',
    desc: 'Artikulasi yang dibentuk oleh kedua bibir atau bibir bawah dengan ujung gigi seri bagian atas.',
  },
  {
    id: 'khaisyum' as MakhrajCategoryId,
    namaArab: 'خَيْشُوم',
    namaLatin: 'Khaisyum',
    arti: 'Rongga Hidung',
    hurufCount: 'Suara Ghunnah',
    hurufContoh: 'نّ  مّ',
    bgLight: 'bg-sky-500/10',
    borderLight: 'border-sky-500/30',
    hoverGlow: 'hover:border-sky-500 hover:shadow-sky-500/10',
    accentText: 'text-sky-700 dark:text-sky-400',
    desc: 'Pangkal rongga hidung bagian dalam tempat lahirnya dengung (ghunnah) sempurna pada huruf bertasydid & ikhfa.',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateTab,
  onSelectCategory,
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 p-6 sm:p-10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-semibold">
            <CheckCircle size={14} />
            <span>Makharijul Huruf Hijaiyah untuk Pemula</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
            Belajar Makharijul Huruf
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
            Kenali tempat keluarnya huruf hijaiyah dengan mudah melalui visualisasi anatomi artikulasi, audio pelafalan, dan latihan kuis interaktif.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="hero-start-btn"
              onClick={() => onNavigateTab('lessons')}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 hover:scale-[1.02] transition-all"
            >
              <span>Mulai Belajar</span>
              <ArrowRight size={16} />
            </button>

            <button
              id="hero-map-btn"
              onClick={() => onNavigateTab('map')}
              className="px-5 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-500 text-stone-800 dark:text-stone-200 font-semibold text-sm flex items-center gap-2 transition-all shadow-xs"
            >
              <Map size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>Lihat Peta Anatomi</span>
            </button>

            <button
              id="hero-quiz-btn"
              onClick={() => onNavigateTab('quiz')}
              className="px-5 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-violet-500 text-stone-800 dark:text-stone-200 font-semibold text-sm flex items-center gap-2 transition-all shadow-xs"
            >
              <HelpCircle size={16} className="text-violet-600 dark:text-violet-400" />
              <span>Latihan Kuis</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5 Kategori Makhraj Utama */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              5 Makhraj Utama (Makhārij ‘Āmmah)
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Pilih salah satu kartu untuk mempelajari huruf dan cara pengucapannya secara visual
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 w-fit">
            Total 29 Huruf & Ghunnah
          </span>
        </div>

        {/* 5 Large Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORY_CARDS.map((cat, idx) => (
            <motion.div
              key={cat.id}
              id={`cat-card-${cat.id}`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                onSelectCategory(cat.id);
                onNavigateTab('lessons');
              }}
              className={`group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-stone-900 border ${cat.borderLight} ${cat.hoverGlow} shadow-sm hover:shadow-md transition-all cursor-pointer ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Top Row: Arabic Name + Letter Count */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-stone-50 dark:bg-stone-800 flex items-center justify-center border border-stone-200 dark:border-stone-700/80 group-hover:scale-105 transition-transform">
                    <span className="font-arabic text-3xl font-bold text-stone-900 dark:text-white" lang="ar">
                      {cat.namaArab}
                    </span>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${cat.bgLight} ${cat.accentText}`}>
                    {cat.hurufCount}
                  </span>
                </div>

                {/* Latin Name & Indonesian Translation */}
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span>{cat.namaLatin}</span>
                  <span className="text-xs font-normal text-stone-400">/ {cat.namaArab}</span>
                </h3>
                <p className={`text-xs font-semibold mt-0.5 ${cat.accentText}`}>
                  {cat.arti}
                </p>

                {/* Description */}
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              {/* Bottom: Sample Letters & Action Link */}
              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="font-arabic text-xl font-bold tracking-widest text-stone-800 dark:text-stone-200" lang="ar">
                  {cat.hurufContoh}
                </span>
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  <span>Pelajari</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Interactive Features Teaser */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Peta Makharij Teaser */}
        <div
          onClick={() => onNavigateTab('map')}
          className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200/70 dark:border-emerald-800/50 cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Map size={20} />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Peta Anatomi Artikulasi
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
            Klik organ mulut, lidah, bibir, tenggorokan, atau hidung untuk melihat huruf apa saja yang bersumber dari bagian tersebut.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <span>Buka Peta Visual</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Latihan Kuis Teaser */}
        <div
          onClick={() => onNavigateTab('quiz')}
          className="p-6 rounded-3xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/20 border border-violet-200/70 dark:border-violet-800/50 cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <HelpCircle size={20} />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Kuis & Uji Pemahaman
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
            Tebak posisi makhraj dari huruf hijaiyah yang ditampilkan. Dapatkan penjelasan instan untuk setiap jawaban benar maupun salah.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-violet-700 dark:text-violet-300">
            <span>Mulai Kuis Interaktif</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </section>
    </div>
  );
};
