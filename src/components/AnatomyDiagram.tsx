import React, { useState } from 'react';
import { Layers, Eye, Sparkles, Image as ImageIcon } from 'lucide-react';
import { MakhrajZoneId } from '../types';
import { TAJWID_IMAGES } from '../assets/images';

interface AnatomyDiagramProps {
  activeZoneId?: MakhrajZoneId | null;
  onSelectZone?: (zoneId: MakhrajZoneId) => void;
  interactive?: boolean;
  className?: string;
  showLabels?: boolean;
  defaultMode?: 'vector' | 'book';
}

interface ZoneInfo {
  id: MakhrajZoneId;
  name: string;
  nameArab: string;
  category: string;
  letters: string;
  color: string;
  tajwidTerm: string;
  // Percentage coordinates for overlay on textbook illustration (top, left)
  pinCoords: { top: string; left: string };
}

export const ZONE_DEFINITIONS: Record<MakhrajZoneId, ZoneInfo> = {
  'jauf-cavity': {
    id: 'jauf-cavity',
    name: 'Rongga Mulut & Tenggorokan (Jauf)',
    nameArab: 'الجَوْف',
    category: 'Jauf',
    letters: 'ا و ي (Mad)',
    color: '#10b981', // Emerald
    tajwidTerm: 'حُـرُوفُ المَـدّ الثَّـلَاثَة',
    pinCoords: { top: '56%', left: '50%' },
  },
  'khaisyum-nasal': {
    id: 'khaisyum-nasal',
    name: 'Rongga Hidung (Khaisyum)',
    nameArab: 'الخَيْشُوم',
    category: 'Khaisyum',
    letters: 'نّ مّ (Ghunnah)',
    color: '#0284c7', // Sky Blue
    tajwidTerm: 'مَخْرَجُ الغُنَّةِ المُشَدَّدَة',
    pinCoords: { top: '34%', left: '48%' },
  },
  'syafatain-lip-tooth': {
    id: 'syafatain-lip-tooth',
    name: 'Bibir Bawah & Gigi Seri Atas',
    nameArab: 'باطن الشفة السفلى',
    category: 'Syafatain',
    letters: 'ف',
    color: '#f43f5e', // Rose
    tajwidTerm: 'مَخْرَجُ الفَاء',
    pinCoords: { top: '54%', left: '72%' },
  },
  'syafatain-both': {
    id: 'syafatain-both',
    name: 'Kedua Bibir (Antara Dua Bibir)',
    nameArab: 'الشفتان',
    category: 'Syafatain',
    letters: 'ب م و',
    color: '#e11d48', // Deep Rose
    tajwidTerm: 'مَا بَيْنَ الشَّفَتَيْن',
    pinCoords: { top: '56%', left: '76%' },
  },
  'lisan-teeth': {
    id: 'lisan-teeth',
    name: 'Ujung Lidah & Gigi Seri / Gusi',
    nameArab: 'رأس اللسان مع الأسنان',
    category: 'Lisan',
    letters: 'ت ط د ص س ز ظ ذ ث',
    color: '#d97706', // Amber
    tajwidTerm: 'النَّطْعِيَّة وَالأَسَلِيَّة وَاللِّثَوِيَّة',
    pinCoords: { top: '55%', left: '66%' },
  },
  'lisan-tip': {
    id: 'lisan-tip',
    name: 'Ujung Lidah & Sekitarnya (Tharaf)',
    nameArab: 'طرف اللسان',
    category: 'Lisan',
    letters: 'ل ن ر',
    color: '#f59e0b', // Amber-500
    tajwidTerm: 'ذَلَقِيَّة - طَرَفُ اللِّسَان مَعَ لِثَةِ الثَّنَايَا',
    pinCoords: { top: '58%', left: '60%' },
  },
  'lisan-side': {
    id: 'lisan-side',
    name: 'Sisi/Tepi Lidah (Haffah)',
    nameArab: 'حافة اللسان',
    category: 'Lisan',
    letters: 'ض',
    color: '#ea580c', // Orange
    tajwidTerm: 'إِحْدَى حَافَتَيِ اللِّسَان مَعَ الأَضْرَاس',
    pinCoords: { top: '63%', left: '52%' },
  },
  'lisan-middle': {
    id: 'lisan-middle',
    name: 'Tengah Lidah (Wasath)',
    nameArab: 'وسط اللسان',
    category: 'Lisan',
    letters: 'ج ش ي',
    color: '#b45309', // Warm Ochre
    tajwidTerm: 'الشَّجَرِيَّة - مَعَ الحَنَكِ الأَعْلَى',
    pinCoords: { top: '61%', left: '55%' },
  },
  'lisan-root': {
    id: 'lisan-root',
    name: 'Pangkal Lidah (Aqsha)',
    nameArab: 'أقصى اللسان',
    category: 'Lisan',
    letters: 'ق ك',
    color: '#ca8a04', // Gold
    tajwidTerm: 'اللَّهَوِيَّة - مَعَ الحَنَكِ اللَّحْمِي وَالعَظْمِي',
    pinCoords: { top: '66%', left: '46%' },
  },
  'halqi-top': {
    id: 'halqi-top',
    name: 'Ujung Tenggorokan (Adna)',
    nameArab: 'أدنى الحلق',
    category: 'Halqi',
    letters: 'غ خ',
    color: '#8b5cf6', // Violet
    tajwidTerm: 'مِمَّا يَلِي اللِّسَان وَاللَّهَاة',
    pinCoords: { top: '69%', left: '41%' },
  },
  'halqi-middle': {
    id: 'halqi-middle',
    name: 'Tengah Tenggorokan (Wasath)',
    nameArab: 'وسط الحلق',
    category: 'Halqi',
    letters: 'ع ح',
    color: '#7c3aed', // Purple
    tajwidTerm: 'عِنْدَ لِسَانِ المِزْمَار',
    pinCoords: { top: '76%', left: '39%' },
  },
  'halqi-bottom': {
    id: 'halqi-bottom',
    name: 'Pangkal Tenggorokan (Aqsha)',
    nameArab: 'أقصى الحلق',
    category: 'Halqi',
    letters: 'ء ه',
    color: '#6d28d9', // Deep violet
    tajwidTerm: 'مِمَّا يَلِي الصَّدْر - عِنْدَ الحَبْلَيْنِ الصَّوْتِيَّيْن',
    pinCoords: { top: '84%', left: '38%' },
  },
};

export const AnatomyDiagram: React.FC<AnatomyDiagramProps> = ({
  activeZoneId,
  onSelectZone,
  interactive = true,
  className = '',
  showLabels = true,
  defaultMode = 'vector',
}) => {
  const [viewMode, setViewMode] = useState<'vector' | 'book'>(defaultMode);
  const [showOrganAnnotations, setShowOrganAnnotations] = useState(true);

  const isSelected = (zone: MakhrajZoneId) => activeZoneId === zone;

  const handleClick = (zone: MakhrajZoneId) => {
    if (interactive && onSelectZone) {
      onSelectZone(zone);
    }
  };

  const activeZone = activeZoneId ? ZONE_DEFINITIONS[activeZoneId] : null;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Mode Switcher Buttons (Interaktif vs Buku Tajwid) */}
      {interactive && (
        <div className="flex items-center justify-between w-full max-w-[500px] mb-2 px-1">
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 dark:bg-stone-800/80 rounded-xl">
            <button
              id="mode-vector-btn"
              onClick={() => setViewMode('vector')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'vector'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Layers size={13} />
              <span>Diagram Vektor Tajwid</span>
            </button>
            <button
              id="mode-book-btn"
              onClick={() => setViewMode('book')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'book'
                  ? 'bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <ImageIcon size={13} />
              <span>Ilustrasi Buku Tajwid</span>
            </button>
          </div>

          {viewMode === 'vector' && (
            <button
              id="toggle-organ-annotations"
              onClick={() => setShowOrganAnnotations(!showOrganAnnotations)}
              className="text-[11px] font-medium text-stone-500 dark:text-stone-400 hover:text-emerald-600 flex items-center gap-1"
              title="Tampilkan/sembunyikan nama organ"
            >
              <Eye size={13} />
              <span>{showOrganAnnotations ? 'Label Organ: ON' : 'Label Organ: OFF'}</span>
            </button>
          )}
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-[500px] aspect-[540/480] relative bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-2 shadow-sm overflow-hidden">
        {/* ========================================================================= */}
        {/* MODE 1: DETAILED CLASSICAL TAJWID BOOK VECTOR DIAGRAM                      */}
        {/* ========================================================================= */}
        {viewMode === 'vector' ? (
          <svg
            viewBox="0 0 540 480"
            className="w-full h-full drop-shadow-xs"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="makhrajGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="tongueGrad" cx="60%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="70%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#ef4444" />
              </radialGradient>
              <linearGradient id="palateGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fbcfe8" />
                <stop offset="60%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>

            {/* HEAD & FACIAL TISSUE PROFILE (Sagittal Anatomical Silhouette) */}
            <path
              d="M 120 40 
                 C 200 20, 340 30, 400 100 
                 C 430 135, 440 170, 440 195 
                 L 405 200 
                 C 380 200, 360 210, 360 225 
                 L 366 235 
                 C 350 238, 335 250, 335 266 
                 C 335 280, 350 290, 350 300 
                 C 350 320, 332 335, 310 340 
                 L 310 460 
                 L 165 460 
                 L 165 375 
                 C 135 345, 115 295, 105 235 
                 C 95 175, 100 95, 120 40 Z"
              fill="currentColor"
              className="text-stone-100 dark:text-stone-800/90 transition-colors"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* CRANIAL BONE & ROOF (Tulang Tengkorak Atas) */}
            <path
              d="M 130 55 C 210 35, 330 45, 385 110 C 400 130, 410 160, 410 180"
              fill="none"
              stroke="#cbd5e1"
              className="dark:stroke-stone-700"
              strokeWidth="3"
            />

            {/* NASAL CAVITY ROOF & TURBINATES (Rongga Hidung / Concha) */}
            <path
              d="M 370 190 C 350 140, 270 130, 220 150 C 180 165, 180 220, 200 235"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />
            {/* Turbinate internal folds */}
            <path
              d="M 280 165 C 260 170, 240 185, 230 200"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="2"
            />

            {/* HARD PALATE (الحنك العظمي - Langit-langit Keras Bertulang) */}
            <path
              d="M 330 238 C 300 230, 270 230, 240 240 L 240 252 C 270 242, 300 242, 330 250 Z"
              fill="#e2e8f0"
              stroke="#64748b"
              strokeWidth="1.8"
            />

            {/* SOFT PALATE (الحنك اللحمي - Langit-langit Lunak Berdaging) */}
            <path
              d="M 240 240 C 220 248, 200 265, 195 290 L 188 290 C 192 260, 215 242, 240 252 Z"
              fill="#fecdd3"
              stroke="#f43f5e"
              strokeWidth="1.5"
            />

            {/* UVULA (اللهاة - Anak Lidah) */}
            <path
              d="M 195 290 C 193 308, 187 315, 183 310 C 180 305, 186 288, 192 288 Z"
              fill="#fda4af"
              stroke="#e11d48"
              strokeWidth="1.5"
            />

            {/* UPPER INCISOR TOOTH (الثنايا العليا - Gigi Seri Atas) */}
            <path
              d="M 334 240 L 331 262 L 323 262 L 326 240 Z"
              fill="#ffffff"
              stroke="#64748b"
              strokeWidth="1.8"
            />
            {/* Upper Gum */}
            <path
              d="M 338 238 C 336 245, 330 246, 325 244"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3"
            />

            {/* LOWER INCISOR TOOTH (الثنايا السفلى - Gigi Seri Bawah) */}
            <path
              d="M 324 285 L 322 305 L 329 305 L 330 285 Z"
              fill="#ffffff"
              stroke="#64748b"
              strokeWidth="1.8"
            />
            {/* Lower Gum */}
            <path
              d="M 320 303 C 324 305, 332 305, 334 300"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3"
            />

            {/* EPIGLOTTIS (لسان المزمار - Katup Epiglotis di Tengah Tenggorokan) */}
            <path
              d="M 188 360 C 184 340, 192 335, 196 345 C 198 355, 192 375, 188 385 Z"
              fill="#fed7aa"
              stroke="#ea580c"
              strokeWidth="2"
            />

            {/* VOCAL CORDS / LARYNX (الحبلان الصوتيان - Pita Suara di Pangkal Tenggorokan) */}
            <path
              d="M 175 405 C 182 403, 190 405, 195 408 L 195 416 C 188 414, 180 414, 175 417 Z"
              fill="#cbd5e1"
              stroke="#64748b"
              strokeWidth="2"
            />

            {/* PHARYNX POSTERIOR WALL (الجدار الخلفي للحلق - Dinding Belakang Tenggorokan) */}
            <path
              d="M 166 260 L 166 445"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeDasharray="5 3"
            />

            {/* TONGUE MUSCLE BODY (جسم اللسان - Struktur Otot Lidah Utama) */}
            <path
              d="M 198 335 
                 C 205 300, 225 285, 255 282 
                 C 285 282, 310 288, 320 282 
                 C 328 277, 332 284, 326 295 
                 C 318 310, 290 340, 255 348 
                 C 225 352, 205 348, 198 335 Z"
              fill="url(#tongueGrad)"
              stroke="#e11d48"
              strokeWidth="2"
              opacity="0.85"
            />

            {/* =================================================================== */}
            {/* INTERACTIVE MAKHRAJ ZONES HIGHLIGHT WITH AUTHENTIC TAJWID LABELS    */}
            {/* =================================================================== */}

            {/* 1. JAUF: Rongga Terbuka (Mulut & Tenggorokan) */}
            <path
              d="M 180 415 
                 L 182 315 
                 C 192 275, 240 252, 312 252 
                 L 312 278 
                 C 255 278, 208 305, 198 415 Z"
              fill={isSelected('jauf-cavity') ? '#10b981' : '#10b98120'}
              stroke={isSelected('jauf-cavity') ? '#059669' : '#10b98160'}
              strokeWidth={isSelected('jauf-cavity') ? '4' : '1.8'}
              filter={isSelected('jauf-cavity') ? 'url(#makhrajGlow)' : undefined}
              className={`cursor-pointer transition-all duration-300 ${isSelected('jauf-cavity') ? 'animate-soft-pulse' : 'hover:opacity-80'}`}
              onClick={() => handleClick('jauf-cavity')}
            />

            {/* 2. KHAISYUM: Rongga Hidung */}
            <path
              d="M 355 210 
                 C 335 160, 275 145, 220 165 
                 C 180 180, 175 230, 202 238 
                 C 235 220, 285 220, 330 232 Z"
              fill={isSelected('khaisyum-nasal') ? '#0ea5e9' : '#0ea5e920'}
              stroke={isSelected('khaisyum-nasal') ? '#0284c7' : '#0ea5e960'}
              strokeWidth={isSelected('khaisyum-nasal') ? '4' : '1.8'}
              filter={isSelected('khaisyum-nasal') ? 'url(#makhrajGlow)' : undefined}
              className={`cursor-pointer transition-all duration-300 ${isSelected('khaisyum-nasal') ? 'animate-soft-pulse' : 'hover:opacity-80'}`}
              onClick={() => handleClick('khaisyum-nasal')}
            />

            {/* 3. HALQI: Adnal Halqi (Ujung Tenggorokan - Atas: Ghain & Kha) */}
            <path
              d="M 168 312 L 202 312 L 202 342 L 168 342 Z"
              fill={isSelected('halqi-top') ? '#8b5cf6' : '#8b5cf625'}
              stroke={isSelected('halqi-top') ? '#7c3aed' : '#8b5cf670'}
              strokeWidth={isSelected('halqi-top') ? '3.5' : '1.5'}
              filter={isSelected('halqi-top') ? 'url(#makhrajGlow)' : undefined}
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={() => handleClick('halqi-top')}
            />

            {/* 3. HALQI: Wasthul Halqi (Tengah Tenggorokan - Epiglotis: Ain & Ha) */}
            <path
              d="M 168 344 L 202 344 L 202 380 L 168 380 Z"
              fill={isSelected('halqi-middle') ? '#7c3aed' : '#7c3aed25'}
              stroke={isSelected('halqi-middle') ? '#6d28d9' : '#7c3aed70'}
              strokeWidth={isSelected('halqi-middle') ? '3.5' : '1.5'}
              filter={isSelected('halqi-middle') ? 'url(#makhrajGlow)' : undefined}
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={() => handleClick('halqi-middle')}
            />

            {/* 3. HALQI: Aqshal Halqi (Pangkal Tenggorokan - Pita Suara: Hamzah & Ha) */}
            <path
              d="M 168 382 L 202 382 L 202 430 L 168 430 Z"
              fill={isSelected('halqi-bottom') ? '#6d28d9' : '#6d28d925'}
              stroke={isSelected('halqi-bottom') ? '#4c1d95' : '#6d28d970'}
              strokeWidth={isSelected('halqi-bottom') ? '3.5' : '1.5'}
              filter={isSelected('halqi-bottom') ? 'url(#makhrajGlow)' : undefined}
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={() => handleClick('halqi-bottom')}
            />

            {/* 4. LISAN: Pangkal Lidah (Aqshal Lisan - Qaf & Kaf) */}
            <path
              d="M 198 325 
                 C 205 298, 220 286, 238 286 
                 L 238 342 
                 C 215 342, 204 336, 198 325 Z"
              fill={isSelected('lisan-root') ? '#eab308' : '#eab30830'}
              stroke={isSelected('lisan-root') ? '#ca8a04' : '#eab30880'}
              strokeWidth={isSelected('lisan-root') ? '3.5' : '1.5'}
              filter={isSelected('lisan-root') ? 'url(#makhrajGlow)' : undefined}
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={() => handleClick('lisan-root')}
            />

            {/* 4. LISAN: Tengah Lidah (Wasthul Lisan - Jim, Syin, Ya) */}
            <path
              d="M 238 286 
                 C 255 282, 275 282, 286 288 
                 L 286 345 
                 L 238 342 Z"
              fill={isSelected('lisan-middle') ? '#d97706' : '#d9770630'}
              stroke={isSelected('lisan-middle') ? '#b45309' : '#d9770680'}
              strokeWidth={isSelected('lisan-middle') ? '3.5' : '1.5'}
              filter={isSelected('lisan-middle') ? 'url(#makhrajGlow)' : undefined}
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={() => handleClick('lisan-middle')}
            />

            {/* 4. LISAN: Sisi Lidah (Haffatul Lisan - Dhad) */}
            <ellipse
              cx="262"
              cy="312"
              rx="26"
              ry="14"
              fill={isSelected('lisan-side') ? '#ea580c' : '#ea580c25'}
              stroke={isSelected('lisan-side') ? '#c2410c' : '#ea580c80'}
              strokeWidth={isSelected('lisan-side') ? '3.5' : '1.5'}
              strokeDasharray={isSelected('lisan-side') ? undefined : '3 3'}
              filter={isSelected('lisan-side') ? 'url(#makhrajGlow)' : undefined}
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={() => handleClick('lisan-side')}
            />

            {/* 4. LISAN: Ujung Lidah & Sekitarnya (Tharaful Lisan - Lam, Nun, Ra) */}
            <path
              d="M 286 288 
                 C 300 292, 314 294, 320 294 
                 L 318 335 
                 L 286 345 Z"
              fill={isSelected('lisan-tip') ? '#f59e0b' : '#f59e0b30'}
              stroke={isSelected('lisan-tip') ? '#d97706' : '#f59e0b80'}
              strokeWidth={isSelected('lisan-tip') ? '3.5' : '1.5'}
              filter={isSelected('lisan-tip') ? 'url(#makhrajGlow)' : undefined}
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={() => handleClick('lisan-tip')}
            />

            {/* 4. LISAN: Ujung Lidah dengan Gigi Seri/Gusi (Tha, Dal, Ta, Shad, Sin, Zai, Zha, Dzal, Tsa) */}
            <path
              d="M 320 285 
                 C 326 280, 334 274, 338 266 
                 L 338 282 
                 L 326 298 Z"
              fill={isSelected('lisan-teeth') ? '#f97316' : '#f9731630'}
              stroke={isSelected('lisan-teeth') ? '#ea580c' : '#f9731680'}
              strokeWidth={isSelected('lisan-teeth') ? '3.5' : '1.5'}
              filter={isSelected('lisan-teeth') ? 'url(#makhrajGlow)' : undefined}
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={() => handleClick('lisan-teeth')}
            />

            {/* 5. SYAFATAIN: Bibir Bawah & Gigi Seri Atas (Fa) */}
            <path
              d="M 340 260 
                 C 346 264, 354 270, 350 282 
                 C 344 288, 338 285, 334 274 Z"
              fill={isSelected('syafatain-lip-tooth') ? '#f43f5e' : '#f43f5e25'}
              stroke={isSelected('syafatain-lip-tooth') ? '#e11d48' : '#f43f5e80'}
              strokeWidth={isSelected('syafatain-lip-tooth') ? '3.5' : '1.5'}
              filter={isSelected('syafatain-lip-tooth') ? 'url(#makhrajGlow)' : undefined}
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={() => handleClick('syafatain-lip-tooth')}
            />

            {/* 5. SYAFATAIN: Kedua Bibir (Ba, Mim, Wawu) */}
            <path
              d="M 350 240 
                 C 365 246, 368 260, 355 266 
                 C 368 274, 360 292, 346 296 
                 C 340 284, 344 260, 342 250 Z"
              fill={isSelected('syafatain-both') ? '#e11d48' : '#e11d4825'}
              stroke={isSelected('syafatain-both') ? '#be123c' : '#e11d4880'}
              strokeWidth={isSelected('syafatain-both') ? '3.5' : '1.5'}
              filter={isSelected('syafatain-both') ? 'url(#makhrajGlow)' : undefined}
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={() => handleClick('syafatain-both')}
            />

            {/* OPTIONAL ANATOMICAL ORGAN LABELS (Seperti Buku Dr. Ayman Suwayd) */}
            {showOrganAnnotations && (
              <g className="text-[10px] fill-stone-500 dark:fill-stone-400 font-sans pointer-events-none">
                {/* Langit-langit Keras */}
                <line x1="280" y1="235" x2="280" y2="210" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                <text x="280" y="205" textAnchor="middle" className="font-semibold fill-stone-700 dark:fill-stone-300">
                  الحنك العظمي (Langit-langit Keras)
                </text>

                {/* Rongga Hidung / Khaisyum */}
                <line x1="250" y1="160" x2="250" y2="135" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                <text x="250" y="130" textAnchor="middle" className="font-bold fill-sky-600 dark:fill-sky-400">
                  الخَيْشُوم (Khaisyum)
                </text>

                {/* Anak Lidah */}
                <line x1="185" y1="310" x2="140" y2="310" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
                <text x="135" y="313" textAnchor="end" className="fill-stone-600 dark:fill-stone-400">
                  اللهاة (Uvula)
                </text>

                {/* Katup Epiglotis */}
                <line x1="190" y1="355" x2="140" y2="355" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
                <text x="135" y="358" textAnchor="end" className="fill-stone-600 dark:fill-stone-400">
                  لسان المزمار (Epiglotis)
                </text>

                {/* Pita Suara / Halq */}
                <line x1="180" y1="410" x2="140" y2="410" stroke="#7c3aed" strokeWidth="1" strokeDasharray="2 2" />
                <text x="135" y="413" textAnchor="end" className="fill-purple-600 dark:fill-purple-400 font-semibold">
                  الحبلان الصوتيان (Pita Suara)
                </text>

                {/* Gigi Seri Atas */}
                <line x1="334" y1="250" x2="380" y2="250" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                <text x="385" y="253" textAnchor="start" className="fill-stone-600 dark:fill-stone-400">
                  الثنايا العليا (Gigi Atas)
                </text>

                {/* Dua Bibir */}
                <line x1="365" y1="268" x2="410" y2="268" stroke="#e11d48" strokeWidth="1" strokeDasharray="2 2" />
                <text x="415" y="271" textAnchor="start" className="font-bold fill-rose-600 dark:fill-rose-400">
                  الشفتان (Dua Bibir)
                </text>
              </g>
            )}
          </svg>
        ) : (
          /* ========================================================================= */
          /* MODE 2: CLASSICAL ILLUSTRATED TAJWID TEXTBOOK ARTWORK                     */
          /* ========================================================================= */
          <div className="relative w-full h-full flex items-center justify-center bg-stone-50 dark:bg-stone-950 rounded-2xl overflow-hidden">
            <img
              src={TAJWID_IMAGES.fullAnatomy}
              alt="Ilustrasi Anatomi Makharijul Huruf Buku Tajwid"
              className="w-full h-full object-contain filter contrast-105"
              referrerPolicy="no-referrer"
            />

            {/* Interactive Anatomical Hotspot Pins directly on the textbook image */}
            {Object.values(ZONE_DEFINITIONS).map((z) => {
              const active = isSelected(z.id);
              return (
                <button
                  key={z.id}
                  id={`book-pin-${z.id}`}
                  onClick={() => handleClick(z.id)}
                  style={{ top: z.pinCoords.top, left: z.pinCoords.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform ${
                    active ? 'scale-125 z-20' : 'scale-100 z-10 hover:scale-110'
                  }`}
                  title={`${z.name} (${z.letters})`}
                >
                  {/* Radar pulse when active */}
                  {active && (
                    <span
                      className="absolute -inset-2 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: z.color }}
                    />
                  )}
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all ${
                      active ? 'ring-2 ring-white ring-offset-2 ring-offset-stone-900 scale-110' : 'opacity-90'
                    }`}
                    style={{ backgroundColor: z.color }}
                  >
                    <span className="w-1 h-1 rounded-full bg-white" />
                  </span>
                </button>
              );
            })}

            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md pointer-events-none">
              Buku Tajwid Al-Musawwar
            </div>
          </div>
        )}

        {/* Selected Zone Callout Box Overlay */}
        {activeZone && (
          <div className="absolute top-3 left-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-700 shadow-lg rounded-2xl p-3 max-w-[270px] pointer-events-none transition-all z-20">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-3 h-3 rounded-full inline-block shrink-0 shadow-xs"
                style={{ backgroundColor: activeZone.color }}
              />
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                {activeZone.name}
              </span>
            </div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-arabic font-bold mb-1" lang="ar">
              {activeZone.tajwidTerm} ({activeZone.nameArab})
            </div>
            <div className="text-[11px] text-stone-600 dark:text-stone-300">
              Huruf Makhraj:{' '}
              <strong className="text-stone-900 dark:text-stone-100 text-xs tracking-wider">
                {activeZone.letters}
              </strong>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Quick-Selector Pills */}
      {showLabels && (
        <div className="mt-3.5 w-full max-w-[500px]">
          <p className="text-xs text-stone-500 dark:text-stone-400 text-center mb-2">
            Klik titik organ pada diagram atau pilih tombol makhraj berikut:
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {Object.values(ZONE_DEFINITIONS).map((z) => {
              const active = isSelected(z.id);
              return (
                <button
                  key={z.id}
                  id={`btn-zone-${z.id}`}
                  onClick={() => handleClick(z.id)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold shadow-xs border-transparent'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: z.color }}
                  />
                  <span>{z.name.split(' (')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
