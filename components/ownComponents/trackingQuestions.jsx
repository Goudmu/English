"use client";

import { Button } from "@/components/ui/button";

export function TrackingQuestions({
  jumlahSoal,
  answers,
  setCurrentIndex,
  currentIndex,
  isReview,
  questions,
}) {
  if (isReview) {
    return (
      <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Question Tracker
        </h2>

        <div className="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {Array.from({ length: jumlahSoal }, (_, i) => i + 1).map(
            (questionNumber) => (
              <Button
                key={questionNumber}
                onClick={() => setCurrentIndex(questionNumber - 1)}
                variant="outline"
                className={`h-10 w-10 rounded-md p-0 text-sm font-medium transition-all cursor-pointer ${
                  questionNumber - 1 === currentIndex
                    ? "bg-gray-400 text-white"
                    : questions[questionNumber - 1].answer ==
                        questions[questionNumber - 1].choices[
                          answers[questionNumber - 1]
                        ]
                      ? "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                      : questions[questionNumber - 1].answer !=
                          answers[questionNumber - 1]
                        ? "border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
                        : ""
                }`}
              >
                {questionNumber}
              </Button>
            ),
          )}
        </div>

        <div className="mt-6 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded border border-red-300 bg-white"></div>
            <span className="text-gray-600">Wrong</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded border border-green-300 bg-green-50"></div>
            <span className="text-gray-600">Correct</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-black"></div>
            <span className="text-gray-600">Selected</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Progress: {answers.filter((answer) => answer !== null).length} of{" "}
          {jumlahSoal} answered
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Question Tracker
        </h2>

        <div className="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {Array.from({ length: jumlahSoal }, (_, i) => i + 1).map(
            (questionNumber) => (
              <Button
                key={questionNumber}
                onClick={() => setCurrentIndex(questionNumber - 1)}
                variant={
                  currentIndex === questionNumber - 1 ? "default" : "outline"
                }
                className={`h-10 w-10 rounded-md p-0 text-sm font-medium transition-all cursor-pointer ${
                  questionNumber - 1 === currentIndex
                    ? "bg-gray-400 text-white"
                    : answers[questionNumber - 1] !== null
                      ? "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                      : ""
                }`}
              >
                {questionNumber}
              </Button>
            ),
          )}
        </div>

        <div className="mt-6 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded border border-gray-300 bg-white"></div>
            <span className="text-gray-600">Unanswered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded border border-green-300 bg-green-50"></div>
            <span className="text-gray-600">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-blue-600"></div>
            <span className="text-gray-600">Selected</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Progress: {answers.filter((answer) => answer !== null).length} of{" "}
          {jumlahSoal} answered
        </div>
      </div>
    );
  }
}
