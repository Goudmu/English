"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Allcategories, VocabQuestions } from "@/lib/VocabQuestion";

export function SelectNumberQuestions({
  started,
  setStarted,
  questionCount,
  setQuestionCount,
  selectedCategory,
  setSelectedCategory,
}) {
  const count = Math.min(
    Math.max(1, Number.parseInt(questionCount) || 1),
    VocabQuestions.length,
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
                How many questions do you want? (1-{VocabQuestions.length})
              </label>
              <Input
                id="questionCount"
                type="number"
                min="1"
                max={VocabQuestions.length}
                placeholder="Enter number of questions"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
              />
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="capitalize cursor-pointer w-full"
                  >
                    {selectedCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {Allcategories.map((kategori) => (
                    <DropdownMenuItem
                      key={kategori}
                      onClick={() => setSelectedCategory(kategori)}
                      className="cursor-pointer"
                    >
                      {kategori}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              onClick={handleStart}
              disabled={!questionCount || Number.parseInt(questionCount) < 1}
              className="cursor-pointer"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }
}
