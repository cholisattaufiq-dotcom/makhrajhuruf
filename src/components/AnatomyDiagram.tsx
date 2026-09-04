import React from 'react';
import { MakhrajCategoryId, MakhrajZoneId } from '../types';
import { TAJWID_IMAGES } from '../assets/images';

export interface MakhrajUmumPin {
  id: MakhrajCategoryId;
  nama: string;
  namaArab: string;
  arti: string;
  hurufRingkas: string;
  color: string;
  pinCoords: { top: string; left: string };
  deskripsiSingkat: string;
}

export const MAKHRAJ_5_UMUM: Record<MakhrajCategoryId, MakhrajUmumPin> = {
  syafatain: {
    id: 'syafatain',
    nama: 'Asy-Syafatain',
    namaArab: 'الشَّفَتَان',
    arti: 'Dua Bibir',
    hurufRingkas: 'ف ، ب ، م ، و',
    color: '#e11d48', // Rose
    pinCoords: { top: '52%', left: '20%' },
    deskripsiSingkat: 'Keluar dari bibir bawah bersentuhan dengan gigi seri atas (ف), atau pertemuan/membulatkan kedua bibir (ب، م، و).',
  },
  khaisyum: {
    id: 'khaisyum',
    nama: 'Al-Khaisyum',
    namaArab: 'الخَيْشُوم',
    arti: 'Rongga Hidung',
    hurufRingkas: 'Ghunnah (نّ ، مّ)',
    color: '#0284c7', // Sky Blue
    pinCoords: { top: '34%', left: '30%' },
    deskripsiSingkat: 'Pangkal rongga hidung bagian dalam tempat keluarnya suara dengung (ghunnah) pada nun dan mim bertasydid/ikhfa/idgham.',
  },
  lisan: {
    id: 'lisan',
    nama: 'Al-Lisān',
    namaArab: 'اللِّسَان',
    arti: 'Lidah',
    hurufRingkas: '18 Huruf (ق، ك، ج، ش، ي، ض، ل، ن، ر، ت، ط، د، ص، س، ز، ظ، ذ، ث)',
    color: '#d97706', // Amber
    pinCoords: { top: '56%', left: '42%' },
    deskripsiSingkat: 'Tempat keluar terbesar yang mencakup pangkal, tengah, tepi, hingga ujung lidah bersama gigi atau langit-langit.',
  },
  jauf: {
    id: 'jauf',
    nama: 'Al-Jauf',
    namaArab: 'الجَوْف',
    arti: 'Rongga Mulut & Rongga Tenggorokan',
    hurufRingkas: 'ا ، و ، ي (Huruf Mad)',
    color: '#059669', // Emerald
    pinCoords: { top: '64%', left: '49%' },
    deskripsiSingkat: 'Rongga terbuka tanpa rintangan tempat mengalirnya suara huruf-huruf pemanjang (mad alif, wawu mad, dan ya mad).',
  },
  halqi: {
    id: 'halqi',
    nama: 'Al-Halq',
    namaArab: 'الحَلْق',
    arti: 'Tenggorokan',
    hurufRingkas: 'ء ، هـ ، ع ، ح ، غ ، خ',
    color: '#7c3aed', // Purple
    pinCoords: { top: '76%', left: '58%' },
    deskripsiSingkat: 'Saluran tenggorokan dari pangkal dekat pita suara (ء، هـ), tengah di epiglotis (ع، ح), hingga ujung dekat anak lidah (غ، خ).',
  },
};

// Backwards compatibility map for zone id to category id
export const ZONE_TO_CATEGORY: Record<string, MakhrajCategoryId> = {
  'jauf-cavity': 'jauf',
  'khaisyum-nasal': 'khaisyum',
  'halqi-bottom': 'halqi',
  'halqi-middle': 'halqi',
  'halqi-top': 'halqi',
  'lisan-root': 'lisan',
  'lisan-middle': 'lisan',
  'lisan-side': 'lisan',
  'lisan-tip': 'lisan',
  'lisan-teeth': 'lisan',
  'syafatain-lip-tooth': 'syafatain',
  'syafatain-both': 'syafatain',
};

// For compatibility with components expecting ZONE_DEFINITIONS
export const ZONE_DEFINITIONS: Record<string, any> = {
  ...MAKHRAJ_5_UMUM,
  'halqi-middle': {
    id: 'halqi',
    name: 'Al-Halq (Tenggorokan)',
    nameArab: 'الحَلْق',
    category: 'Halqi',
    letters: 'ء هـ ع ح غ خ',
    color: '#7c3aed',
    tajwidTerm: 'مَخْرَجُ الحَلْقِ العَام',
  },
};

interface AnatomyDiagramProps {
  activeCategoryId?: MakhrajCategoryId | null;
  activeZoneId?: MakhrajZoneId | null;
  onSelectCategory?: (catId: MakhrajCategoryId) => void;
  onSelectZone?: (zoneId: MakhrajZoneId) => void;
  interactive?: boolean;
  className?: string;
  showLabels?: boolean;
}

export const AnatomyDiagram: React.FC<AnatomyDiagramProps> = ({
  activeCategoryId,
  activeZoneId,
  onSelectCategory,
  onSelectZone,
  interactive = true,
  className = '',
  showLabels = true,
}) => {
  // Determine the effective active category (from either prop)
  const currentCategory: MakhrajCategoryId =
    activeCategoryId ||
    (activeZoneId && ZONE_TO_CATEGORY[activeZoneId]) ||
    'halqi';

  const handleCategoryClick = (catId: MakhrajCategoryId) => {
    if (!interactive) return;
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    if (onSelectZone) {
      // Map category to a primary zone if needed
      const primaryZoneMap: Record<MakhrajCategoryId, MakhrajZoneId> = {
        jauf: 'jauf-cavity',
        halqi: 'halqi-middle',
        lisan: 'lisan-middle',
        syafatain: 'syafatain-both',
        khaisyum: 'khaisyum-nasal',
      };
      onSelectZone(primaryZoneMap[catId]);
    }
  };

  const selectedInfo = MAKHRAJ_5_UMUM[currentCategory];

  return (
    <div className={`relative flex flex-col items-center select-none w-full ${className}`}>
      {/* Visual Image Container with Interactive Hotspots */}
      <div className="relative w-full max-w-[560px] aspect-[4/3] bg-stone-50 dark:bg-stone-950 rounded-3xl border border-stone-200 dark:border-stone-800 p-2 shadow-xs overflow-hidden group">
        {/* Textbook Illustration - Facing Left (Standard Tajweed Layout) */}
        <img
          src={TAJWID_IMAGES.fullAnatomy}
          alt="Ilustrasi 5 Makhraj Umum Buku Tajwid"
          className="w-full h-full object-contain filter contrast-105"
          referrerPolicy="no-referrer"
        />

        {/* 5 Makhraj Umum Interactive Pins */}
        {(Object.keys(MAKHRAJ_5_UMUM) as MakhrajCategoryId[]).map((catId) => {
          const item = MAKHRAJ_5_UMUM[catId];
          const isSelected = currentCategory === catId;

          return (
            <div
              key={catId}
              style={{ top: item.pinCoords.top, left: item.pinCoords.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                id={`pin-makhraj-${catId}`}
                type="button"
                onClick={() => handleCategoryClick(catId)}
                className={`relative group cursor-pointer focus:outline-none transition-transform duration-200 ${
                  isSelected ? 'scale-125 z-30' : 'scale-100 hover:scale-115'
                }`}
                title={`${item.nama} (${item.namaArab}) - Klik untuk memilih`}
              >
                {/* Radar ring pulse effect */}
                {isSelected && (
                  <span
                    className="absolute -inset-2.5 rounded-full animate-ping opacity-75 pointer-events-none"
                    style={{ backgroundColor: item.color }}
                  />
                )}

                {/* Outer Glow Ring */}
                <span
                  className={`flex items-center justify-center rounded-full border-2 border-white shadow-lg transition-all ${
                    isSelected
                      ? 'w-7 h-7 ring-4 ring-offset-2 ring-white dark:ring-offset-stone-900 shadow-xl'
                      : 'w-5 h-5 opacity-90 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: item.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>

                {/* Pin Label Tooltip on Hover or when Active */}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 -top-7 px-2 py-0.5 rounded-md text-[11px] font-bold text-white whitespace-nowrap shadow-md pointer-events-none transition-all ${
                    isSelected
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-1 scale-90 group-hover:opacity-100 group-hover:translate-y-0'
                  }`}
                  style={{ backgroundColor: item.color }}
                >
                  {item.namaArab} • {item.nama}
                </span>
              </button>
            </div>
          );
        })}

        {/* Small Attribution Tag */}
        <div className="absolute bottom-2.5 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2.5 py-0.5 rounded-md pointer-events-none">
          Standar At-Tajwid Al-Musawwar (5 Makhraj Umum)
        </div>
      </div>

      {/* Quick Category Selector Pills under the Image */}
      {showLabels && (
        <div className="mt-3.5 w-full max-w-[560px]">
          <p className="text-xs text-stone-500 dark:text-stone-400 text-center mb-2">
            Klik titik pada gambar atau pilih 5 makhraj umum berikut:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {(Object.keys(MAKHRAJ_5_UMUM) as MakhrajCategoryId[]).map((catId) => {
              const item = MAKHRAJ_5_UMUM[catId];
              const isSelected = currentCategory === catId;

              return (
                <button
                  key={catId}
                  id={`btn-cat-${catId}`}
                  type="button"
                  onClick={() => handleCategoryClick(catId)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm border-transparent scale-105'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.nama}</span>
                  <span className="font-arabic text-xs opacity-75" lang="ar">
                    {item.namaArab}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
