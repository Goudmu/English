"use client";

import { useState } from "react";
import { QuizCard } from "@/components/ownComponents/quizCard";
import { SelectNumberQuestions } from "@/components/ownComponents/selectNumber";

export default function Page() {
  const [started, setStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  if (!started) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-4">
        <SelectNumberQuestions
          setStarted={setStarted}
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
          jumlahSoal={questionCount}
          setStarted={setStarted}
          setQuestionCount={setQuestionCount}
        />
      </div>
    </main>
  );
}
