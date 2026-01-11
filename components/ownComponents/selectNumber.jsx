"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { allQuestions } from "@/lib/Allquestions";

export function SelectNumberQuestions({
  started,
  setStarted,
  questionCount,
  setQuestionCount,
}) {
  const count = Math.min(
    Math.max(1, Number.parseInt(questionCount) || 1),
    allQuestions.length
  );

  const handleStart = () => {
    if (questionCount && Number.parseInt(questionCount) > 0) {
      setStarted(true);
    }
  };

  if (!started) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Quiz Setup</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="questionCount"
                className="text-sm font-medium text-muted-foreground"
              >
                How many questions do you want? (1-{allQuestions.length})
              </label>
              <Input
                id="questionCount"
                type="number"
                min="1"
                max={allQuestions.length}
                placeholder="Enter number of questions"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
              />
            </div>
            <Button
              onClick={handleStart}
              disabled={!questionCount || Number.parseInt(questionCount) < 1}
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }
}
