import React, { useState } from 'react';
import { Volume2, Info, Check, Filter } from 'lucide-react';
import { AnatomyDiagram, ZONE_DEFINITIONS } from '../components/AnatomyDiagram';
import { ALL_HURUF_DATA } from '../data/makharijData';
import { HurufItem, MakhrajZoneId } from '../types';
import { audioPlayer } from '../utils/audioPlayer';

interface MapViewProps {
  onOpenDetail: (huruf: HurufItem) => void;
}

export const MapView: React.FC<MapViewProps> = ({ onOpenDetail }) => {
  const [activeZoneId, setActiveZoneId] = useState<MakhrajZoneId>('lisan-root');
  const [selectedLetter, setSelectedLetter] = useState<HurufItem | null>(
    ALL_HURUF_DATA.find((h) => h.id === 'qaf') || ALL_HURUF_DATA[0]
  );
  const [playingId, setPlayingId] = useState<string | null>(null);

  // When user clicks a zone on the diagram
  const handleSelectZone = (zoneId: MakhrajZoneId) => {
    setActiveZoneId(zoneId);
    // Select first letter in this zone if any
    const firstInZone = ALL_HURUF_DATA.find((h) => h.makhrajZoneId === zoneId);
    if (firstInZone) {
      setSelectedLetter(firstInZone);
    }
  };

  // When user clicks a specific letter
  const handleSelectLetter = (huruf: HurufItem) => {
    setSelectedLetter(huruf);
    setActiveZoneId(huruf.makhrajZoneId);
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

  const currentZoneLetters = ALL_HURUF_DATA.filter(
    (h) => h.makhrajZoneId === activeZoneId
  );

  const activeZoneInfo = ZONE_DEFINITIONS[activeZoneId];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-50">
          Peta Anatomi Makharijul Huruf
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Klik salah satu organ pada diagram anatomi atau pilih huruf di bawah untuk melihat titik artikulasi suara secara presisi.
        </p>
      </div>

      {/* Main Split View: Diagram on Left/Top, Articulation Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Diagram Column */}
        <div className="lg:col-span-6 bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Diagram Penampang Samping (Sagital)
            </h2>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">
              Interaktif
            </span>
          </div>

          <AnatomyDiagram
            activeZoneId={activeZoneId}
            onSelectZone={handleSelectZone}
            interactive={true}
            showLabels={true}
          />
        </div>

        {/* Articulation & Associated Letters Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Active Zone Overview Banner */}
          {activeZoneInfo && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Makhraj {activeZoneInfo.category}
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    {activeZoneInfo.name}
                  </h3>
                </div>
                <span className="font-arabic text-2xl font-bold text-emerald-700 dark:text-emerald-400" lang="ar">
                  {activeZoneInfo.nameArab}
                </span>
              </div>

              {/* Selected Letter Spotlight */}
              {selectedLetter && (
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 flex items-center justify-center shadow-xs">
                    <span className="font-arabic text-5xl font-bold text-stone-900 dark:text-white" lang="ar">
                      {selectedLetter.huruf}
                    </span>
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                        {selectedLetter.nama}
                      </h4>
                      <span className="font-arabic text-sm text-stone-400">
                        ({selectedLetter.namaArab})
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      {selectedLetter.caraPengucapan}
                    </p>
                    <div className="font-arabic text-sm font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider pt-1" lang="ar">
                      Contoh: {selectedLetter.contoh.harakat}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <button
                      id={`btn-play-spotlight-${selectedLetter.id}`}
                      onClick={(e) => handlePlayLetter(e, selectedLetter)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                        playingId === selectedLetter.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900'
                      }`}
                    >
                      <Volume2 size={15} />
                      <span>{playingId === selectedLetter.id ? 'Memutar...' : 'Dengarkan'}</span>
                    </button>
                    <button
                      id={`btn-modal-spotlight-${selectedLetter.id}`}
                      onClick={() => onOpenDetail(selectedLetter)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-200/80 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Info size={15} />
                      <span>Detail Huruf</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Huruf yang keluar dari zona ini */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                  Huruf dari Bagian Ini ({currentZoneLetters.length} Huruf):
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {currentZoneLetters.map((h) => {
                    const isSelected = selectedLetter?.id === h.id;
                    return (
                      <div
                        key={h.id}
                        id={`zone-huruf-item-${h.id}`}
                        onClick={() => handleSelectLetter(h)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-xs'
                            : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-700 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-arabic text-2xl font-bold" lang="ar">
                            {h.huruf}
                          </span>
                          <div>
                            <div className="text-xs font-bold leading-tight">{h.nama}</div>
                            <div className="text-[10px] text-stone-500 dark:text-stone-400">{h.subkategori}</div>
                          </div>
                        </div>
                        <button
                          id={`quick-play-${h.id}`}
                          onClick={(e) => handlePlayLetter(e, h)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-stone-700 transition-colors"
                          title="Dengarkan"
                        >
                          <Volume2 size={15} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* All Letters Quick Selector Strip */}
      <section className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Daftar Seluruh Huruf Hijaiyah
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Klik huruf mana saja untuk langsung menyorot titik makhrajnya pada peta di atas
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {ALL_HURUF_DATA.map((h) => {
            const isSelected = selectedLetter?.id === h.id;
            return (
              <button
                key={h.id}
                id={`all-huruf-pill-${h.id}`}
                onClick={() => handleSelectLetter(h)}
                className={`min-w-[52px] h-[52px] p-2 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md scale-105'
                    : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-emerald-500'
                }`}
              >
                <span className="font-arabic text-xl font-bold leading-none" lang="ar">
                  {h.huruf}
                </span>
                <span className={`text-[10px] font-medium leading-none mt-1 ${isSelected ? 'text-emerald-100' : 'text-stone-500 dark:text-stone-400'}`}>
                  {h.nama}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
