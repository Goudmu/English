"use client";

import { useState } from "react";
import { QuizCard } from "@/components/ownComponents/quizCard";
import { SelectNumberQuestions } from "@/components/ownComponents/selectNumber";

export default function Page() {
  const [started, setStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(50);
  const [selectedCategory, setSelectedCategory] = useState("sein");
  const [selectedCategoryForQuiz, setSelectedCategoryForQuiz] =
    useState("sein");

  if (!started) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-4">
        <SelectNumberQuestions
          setStarted={setStarted}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          started={started}
          setQuestionCount={setQuestionCount}
          questionCount={questionCount}
        />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <QuizCard
          selectedCategoryForQuiz={selectedCategoryForQuiz}
          jumlahSoal={questionCount}
          selectedCategory={selectedCategory}
          setStarted={setStarted}
          setQuestionCount={setQuestionCount}
        />
      </div>
    </main>
  );
}
