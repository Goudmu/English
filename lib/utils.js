import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Mengacak Soal */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Mengacak soal + mengacak choices di tiap soal.
 * - Tidak memodifikasi input asli.
 * - Jawaban tetap benar karena menggunakan string `answer`.
 */
export function shuffleQuestionsAndChoices(questions) {
  const shuffledQuestions = shuffleArray(questions).map((q) => {
    const shuffledChoices = shuffleArray(q.choices);

    // Pastikan jawaban masih ada di choices (safety check)
    if (!shuffledChoices.includes(q.answer)) {
      throw new Error(
        `Answer "${q.answer}" tidak ditemukan di choices untuk soal: "${q.question}"`
      );
    }

    return {
      ...q,
      choices: shuffledChoices,
      // answer tetap string yang sama
      answer: q.answer,
    };
  });

  return shuffledQuestions;
}
