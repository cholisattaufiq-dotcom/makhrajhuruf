import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './views/HomeView';
import { MapView } from './views/MapView';
import { LessonsView } from './views/LessonsView';
import { QuizView } from './views/QuizView';
import { ReferenceView } from './views/ReferenceView';
import { LetterDetailModal } from './components/LetterDetailModal';
import { ActiveTab, MakhrajCategoryId, HurufItem } from './types';
import { ALL_HURUF_DATA } from './data/makharijData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<MakhrajCategoryId>('jauf');
  const [detailHuruf, setDetailHuruf] = useState<HurufItem | null>(null);

  // Dark mode detection and state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('makharij_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('makharij_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('makharij_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleOpenDetail = (huruf: HurufItem) => {
    setDetailHuruf(huruf);
  };

  const handleCloseDetail = () => {
    setDetailHuruf(null);
  };

  // Next / Previous letter inside modal
  const handleNavigateNext = () => {
    if (!detailHuruf) return;
    const currentIndex = ALL_HURUF_DATA.findIndex((h) => h.id === detailHuruf.id);
    if (currentIndex >= 0 && currentIndex < ALL_HURUF_DATA.length - 1) {
      setDetailHuruf(ALL_HURUF_DATA[currentIndex + 1]);
    } else {
      setDetailHuruf(ALL_HURUF_DATA[0]);
    }
  };

  const handleNavigatePrev = () => {
    if (!detailHuruf) return;
    const currentIndex = ALL_HURUF_DATA.findIndex((h) => h.id === detailHuruf.id);
    if (currentIndex > 0) {
      setDetailHuruf(ALL_HURUF_DATA[currentIndex - 1]);
    } else {
      setDetailHuruf(ALL_HURUF_DATA[ALL_HURUF_DATA.length - 1]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-200">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 pb-20 md:pb-12">
        {activeTab === 'home' && (
          <HomeView
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCategory={(catId) => setSelectedCategory(catId)}
          />
        )}

        {activeTab === 'map' && (
          <MapView onOpenDetail={handleOpenDetail} />
        )}

        {activeTab === 'lessons' && (
          <LessonsView
            selectedCategoryId={selectedCategory}
            onSelectCategory={(catId) => setSelectedCategory(catId)}
            onOpenDetail={handleOpenDetail}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'reference' && <ReferenceView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 py-6 px-4 text-center text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              Belajar Makharijul Huruf
            </span>
            <span>— Pembelajaran Tajwid Al-Qur'an Interaktif</span>
          </div>
          <div>
            Disusun berdasarkan kaidah tajwid Al-Jazariyyah untuk pemula
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {detailHuruf && (
        <LetterDetailModal
          huruf={detailHuruf}
          onClose={handleCloseDetail}
          onNavigateNext={handleNavigateNext}
          onNavigatePrev={handleNavigatePrev}
        />
      )}
    </div>
  );
}
