import React, { useState } from 'react';
import { CheckCircle2, XCircle, Volume2, RotateCcw, Award, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { ALL_HURUF_DATA } from '../data/makharijData';
import { QuizQuestion, ActiveTab } from '../types';
import { audioPlayer } from '../utils/audioPlayer';
import { AnatomyDiagram, ZONE_DEFINITIONS } from '../components/AnatomyDiagram';

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
    let feedbackDesc = 'Pemahaman Anda mengenai makharijul huruf sudah sangat mantap!';
    if (finalPercentage < 60) {
      feedbackTitle = 'Terus Berlatih!';
      feedbackDesc = 'Jangan berkecil hati, ulangi materi dan latihan kembali untuk hasil yang lebih baik.';
    } else if (finalPercentage < 85) {
      feedbackTitle = 'Jayyid Jiddan! Sangat Baik';
      feedbackDesc = 'Sebagian besar makhraj huruf sudah Anda pahami dengan benar.';
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
              Hasil Latihan Kuis
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
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <RotateCcw size={16} />
              <span>Ulangi Kuis</span>
            </button>

            <button
              id="quiz-review-lessons-btn"
              onClick={() => onNavigateTab('lessons')}
              className="px-6 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <BookOpen size={16} />
              <span>Buka Materi Pembelajaran</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQuestion.jawabanBenar;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
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
          <span className="text-xs text-stone-500 dark:text-stone-400">Skor Saat Ini:</span>
          <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 leading-none">
            {score}
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

          {/* Optional Audio Button */}
          {matchedHuruf && (
            <button
              id={`quiz-play-btn-${currentQuestion.huruf}`}
              onClick={handlePlayHurufSound}
              className="mt-3 px-3 py-1.5 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Volume2 size={15} />
              <span>🔊 Dengarkan Bunyi</span>
            </button>
          )}
        </div>

        {/* Question Text */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            {currentQuestion.pertanyaan}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-2.5">
          {currentQuestion.pilihan.map((option, idx) => {
            const isThisSelected = selectedOption === idx;
            const isThisCorrect = idx === currentQuestion.jawabanBenar;

            let btnStyle =
              'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20';

            if (isAnswered) {
              if (isThisCorrect) {
                btnStyle =
                  'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
              } else if (isThisSelected) {
                btnStyle =
                  'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200 font-bold';
              } else {
                btnStyle = 'opacity-40 border-stone-200 dark:border-stone-800';
              }
            }

            return (
              <button
                key={idx}
                id={`quiz-option-${idx}`}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between text-sm font-medium transition-all ${btnStyle}`}
              >
                <span>{option}</span>
                {isAnswered && (
                  <span>
                    {isThisCorrect && <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />}
                    {isThisSelected && !isThisCorrect && <XCircle size={18} className="text-rose-600 dark:text-rose-400" />}
                  </span>
                )}
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
                    {isCorrect ? '✓ Jawaban Anda Benar!' : 'Jawaban Belum Tepat'}
                  </div>
                  <div className="text-xs leading-relaxed">
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
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
