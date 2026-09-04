import React, { useState } from 'react';
import { CheckCircle2, XCircle, Volume2, RotateCcw, Award, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { ALL_HURUF_DATA } from '../data/makharijData';
import { QuizQuestion, ActiveTab } from '../types';
import { audioPlayer } from '../utils/audioPlayer';

// Metadata for the 5 simplified general options
const MAKHRAJ_OPTION_DETAILS = [
  { id: 'jauf', name: 'Jauf', nameArab: 'الجوف', desc: 'Rongga Mulut & Tenggorokan', color: '#059669' },
  { id: 'halqi', name: 'Halqi', nameArab: 'الحلق', desc: 'Tenggorokan', color: '#7c3aed' },
  { id: 'lisan', name: 'Lisan', nameArab: 'اللسان', desc: 'Lidah', color: '#d97706' },
  { id: 'syafatain', name: 'Syafatain', nameArab: 'الشفتان', desc: 'Dua Bibir', color: '#e11d48' },
  { id: 'khoisyum', name: 'Khoisyum', nameArab: 'الخيشوم', desc: 'Rongga Hidung (Ghunnah)', color: '#0284c7' },
];

interface QuizViewProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onNavigateTab }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<{ isCorrect: boolean; question: QuizQuestion }[]>([]);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const progressPercent = ((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  // Find corresponding huruf data to play sound if user wants to listen
  const matchedHuruf = ALL_HURUF_DATA.find((h) => h.huruf === currentQuestion.huruf);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQuestion.jawabanBenar;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    audioPlayer.playFeedback(isCorrect);
    setAnswersHistory((prev) => [...prev, { isCorrect, question: currentQuestion }]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
    setAnswersHistory([]);
  };

  const handlePlayHurufSound = () => {
    if (matchedHuruf) {
      audioPlayer.playLetter(matchedHuruf);
    }
  };

  // Completion Screen
  if (isCompleted) {
    const finalPercentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    let feedbackTitle = 'Mumtaz! Luar Biasa';
    let feedbackDesc = 'Pemahaman Anda mengenai 5 makhraj utama huruf hijaiyah sudah sangat mantap!';
    if (finalPercentage < 60) {
      feedbackTitle = 'Terus Berlatih!';
      feedbackDesc = 'Jangan berkecil hati, ulangi materi dan latihan kembali untuk semakin lancar mengenali 5 makhraj.';
    } else if (finalPercentage < 85) {
      feedbackTitle = 'Jayyid Jiddan! Sangat Baik';
      feedbackDesc = 'Sebagian besar huruf sudah berhasil Anda kelompokkan ke 5 makhraj dengan benar.';
    }

    return (
      <div className="max-w-xl mx-auto py-8 text-center space-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-lg space-y-6"
        >
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner">
            <Award size={44} />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Hasil Latihan 5 Makhraj
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-50 mt-1">
              {feedbackTitle}
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-sm mx-auto">
              {feedbackDesc}
            </p>
          </div>

          {/* Big Score Counter */}
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
            <div className="text-5xl font-extrabold text-stone-900 dark:text-stone-50">
              {score} <span className="text-2xl text-stone-400 font-normal">/ {QUIZ_QUESTIONS.length}</span>
            </div>
            <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-1">
              Skor Akhir: {finalPercentage}%
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              id="quiz-restart-btn"
              onClick={handleRestartQuiz}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>Ulangi Latihan</span>
            </button>

            <button
              id="quiz-review-lessons-btn"
              onClick={() => onNavigateTab('map')}
              className="px-6 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen size={16} />
              <span>Lihat Peta 5 Makhraj</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQuestion.jawabanBenar;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Header Info */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
          <Sparkles size={13} />
          <span>Latihan 5 Makhraj Umum</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-50">
          Tebak Makhraj Huruf
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Tentukan dari salah satu 5 makhraj umum manakah huruf ini dikeluarkan: <strong>Jauf, Halqi, Lisan, Syafatain, atau Khoisyum</strong>.
        </p>
      </div>

      {/* Top Progress & Score Strip */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
            Soal {currentIndex + 1} dari {QUIZ_QUESTIONS.length}
          </span>
          <div className="w-36 sm:w-48 h-2 bg-stone-100 dark:bg-stone-800 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-stone-500 dark:text-stone-400">Skor:</span>
          <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 leading-none">
            {score} <span className="text-xs font-normal text-stone-400">/ {QUIZ_QUESTIONS.length}</span>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6"
      >
        {/* Giant Letter Prompt Box */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80 text-center relative">
          <span className="font-arabic text-7xl sm:text-8xl font-bold text-stone-900 dark:text-stone-50 select-none leading-none mb-2" lang="ar">
            {currentQuestion.huruf}
          </span>
          <span className="text-sm font-bold text-stone-700 dark:text-stone-300">
            Huruf {currentQuestion.namaHuruf}
          </span>

          {/* Audio Pronunciation Button */}
          {matchedHuruf && (
            <button
              id={`quiz-play-btn-${currentQuestion.huruf}`}
              onClick={handlePlayHurufSound}
              className="mt-3 px-3 py-1.5 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Volume2 size={15} />
              <span>Dengarkan Bunyi</span>
            </button>
          )}
        </div>

        {/* Question Text */}
        <div className="text-center">
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
            {currentQuestion.pertanyaan}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Pilih salah satu dari 5 makhraj utama berikut:
          </p>
        </div>

        {/* The 5 Standard Options (Jauf, Halqi, Lisan, Syafatain, Khoisyum) */}
        <div className="space-y-2.5">
          {MAKHRAJ_OPTION_DETAILS.map((detail, idx) => {
            const isThisSelected = selectedOption === idx;
            const isThisCorrect = idx === currentQuestion.jawabanBenar;

            let btnStyle =
              'bg-stone-50 dark:bg-stone-800/70 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20';

            if (isAnswered) {
              if (isThisCorrect) {
                btnStyle =
                  'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-500 shadow-xs';
              } else if (isThisSelected) {
                btnStyle =
                  'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200 font-bold ring-1 ring-rose-400';
              } else {
                btnStyle = 'opacity-40 border-stone-200 dark:border-stone-800';
              }
            }

            return (
              <button
                key={detail.id}
                id={`quiz-option-${detail.id}`}
                type="button"
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: detail.color }}
                  />
                  <div>
                    <div className="text-sm font-bold flex items-center gap-2">
                      <span>{detail.name}</span>
                      <span className="text-xs text-stone-400 font-normal">({detail.desc})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-arabic text-xl font-bold" lang="ar" style={{ color: isAnswered && isThisCorrect ? undefined : detail.color }}>
                    {detail.nameArab}
                  </span>

                  {isAnswered && (
                    <span className="shrink-0">
                      {isThisCorrect && <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400" />}
                      {isThisSelected && !isThisCorrect && <XCircle size={20} className="text-rose-600 dark:text-rose-400" />}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Instant Feedback Box */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`p-4 rounded-2xl border ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {isCorrect ? (
                  <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="text-sm font-bold">
                    {isCorrect ? '✓ Tepat Sekali!' : 'Belum Tepat'}
                  </div>
                  <div className="text-xs sm:text-sm leading-relaxed">
                    {isCorrect ? currentQuestion.keteranganBenar : currentQuestion.keteranganSalah}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Question Action */}
        {isAnswered && (
          <div className="pt-2">
            <button
              id="quiz-next-btn"
              onClick={handleNextQuestion}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Latihan'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
