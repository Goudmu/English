"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { shuffleQuestionsAndChoices } from "@/lib/utils";
import { VocabQuestions } from "@/lib/VocabQuestion";
import { SeinQuestions } from "@/lib/SeinQuestion";
import { HabenQuestions } from "@/lib/HabenQuestion";
import { VerbQuestions } from "@/lib/VerbQuestion";
import { TrackingQuestions } from "./trackingQuestions";

export function QuizCard({
  jumlahSoal = 5,
  setStarted,
  setQuestionCount,
  selectedCategory,
  selectedCategoryForQuiz = "vocab",
}) {
  let total = 0;

  const generateQuestions = () => {
    let shuffled = [];
    let total = 0;
    if (selectedCategoryForQuiz === "vocab") {
      shuffled = shuffleQuestionsAndChoices(
        VocabQuestions,
        selectedCategory,
        selectedCategoryForQuiz,
      );
    } else if (selectedCategoryForQuiz === "sein") {
      shuffled = shuffleQuestionsAndChoices(
        SeinQuestions,
        selectedCategory,
        selectedCategoryForQuiz,
      );
    } else if (selectedCategoryForQuiz === "haben") {
      shuffled = shuffleQuestionsAndChoices(
        HabenQuestions,
        selectedCategory,
        selectedCategoryForQuiz,
      );
    } else if (selectedCategoryForQuiz === "kata kerja kalimat") {
      shuffled = shuffleQuestionsAndChoices(
        VerbQuestions,
        selectedCategory,
        selectedCategoryForQuiz,
      );
    }
    total = Math.min(jumlahSoal, shuffled.length);
    return shuffled.slice(0, total);
  };

  const [questions, setQuestions] = useState(() => generateQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReview, setIsReview] = useState(false);
  const [answers, setAnswers] = useState(() => Array(total).fill(null));
  const [isClient, setIsClient] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  // set client flag on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Kalau jumlahSoal berubah, buat ulang set soal + reset state
  useEffect(() => {
    const nextQuestions = generateQuestions();
    setQuestions(nextQuestions);
    setAnswers(Array(nextQuestions.length).fill(null));
    setCurrentIndex(0);
    setIsReview(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  if (!isClient) return null;
  if (!questions.length) return null;

  const current = questions[currentIndex];
  const selectedOption = answers[currentIndex];
  const correctAnswerIndex = current.choices.indexOf(current.answer);

  const handleOptionClick = (index) => {
    if (isReview) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = index;
      return next;
    });
  };

  // ✅ RESET SEKALIGUS SHUFFLE ULANG
  const resetAll = () => {
    const nextQuestions = generateQuestions();
    setQuestions(nextQuestions);
    setAnswers(Array(nextQuestions.length).fill(null));
    setIsReview(false);
    setCurrentIndex(0);
    setStarted(false);
    setQuestionCount(50);
    setIsBlurred(false);
  };

  // ✅ RESET JAWABAN DI SOAL INI
  const resetThisQuestions = () => {
    setAnswers(Array(questions.length).fill(null));
    setIsReview(false);
    setIsBlurred(false);
  };

  // ✅ BLUR ANSWER
  const blurAnswer = () => {
    setIsBlurred(!isBlurred);
  };

  const goPrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((i) => i - 1);
  };

  const goNext = () => {
    if (currentIndex >= questions.length - 1) return;
    setCurrentIndex((i) => i + 1);
  };

  const submit = () => {
    setIsReview(true);
    setCurrentIndex(0); // balik ke soal pertama untuk review
  };

  const getOptionStyles = (index) => {
    if (!isReview) {
      return selectedOption === index
        ? "border-primary bg-primary/5"
        : "border-border hover:border-primary/50 hover:bg-muted/50";
    }

    if (index === correctAnswerIndex) {
      return "border-green-500 bg-green-50 text-green-900";
    }

    if (selectedOption === index && index !== correctAnswerIndex) {
      return "border-red-500 bg-red-50 text-red-900";
    }

    return "border-border opacity-50";
  };

  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="flex flex-row gap-2">
      <div className="w-2/5">
        <TrackingQuestions
          jumlahSoal={questions.length}
          answers={answers}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          isReview={isReview}
          questions={questions}
        />
      </div>
      <Card className="w-3/5">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg font-medium leading-relaxed">
              {current.question}
            </CardTitle>
            <div className="shrink-0 text-right text-sm text-muted-foreground">
              {isReview && (
                <div className="rounded px-2 py-1">
                  Score :{" "}
                  {
                    questions.filter(
                      (q, i) => q.answer === q.choices[answers[i]],
                    ).length
                  }{" "}
                  / {questions.length}
                </div>
              )}
            </div>
            <div className="shrink-0 text-right text-sm text-muted-foreground">
              <div>
                {currentIndex + 1} / {questions.length}
              </div>
              {isReview && <div className="text-xs">Review</div>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {current.choices.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={isReview}
                className={cn(
                  "flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all",
                  getOptionStyles(index),
                  !isReview && "cursor-pointer",
                  isReview && "cursor-default",
                  isBlurred && "blur-xs",
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-current font-semibold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-base">{option}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={goPrev}
                disabled={currentIndex === 0}
                className={"cursor-pointer"}
              >
                Previous
              </Button>
              <Button
                onClick={goNext}
                disabled={isLastQuestion}
                className="cursor-pointer"
              >
                Next
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={blurAnswer}
                className="cursor-pointer"
              >
                Blur
              </Button>
              <Button
                variant="outline"
                onClick={resetAll}
                className="cursor-pointer"
              >
                Back
              </Button>
              <Button
                variant="outline"
                onClick={resetThisQuestions}
                className="cursor-pointer"
              >
                Reset
              </Button>
              <Button
                onClick={submit}
                disabled={isReview}
                className="cursor-pointer"
              >
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
