"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AUDIT_QUESTIONS } from "@/lib/audit/questions";
import { computeAuditResult } from "@/lib/audit/score";
import type { AuditAnswers } from "@/lib/audit/types";
import { storeAuditAnswers } from "@/lib/audit/session";
import { AuditProgress } from "./AuditProgress";
import { AuditLeadGate } from "./AuditLeadGate";

type AuditWizardProps = {
  onComplete: (submissionId: string) => void;
};

export function AuditWizard({ onComplete }: AuditWizardProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<AuditAnswers>>({});
  const [showGate, setShowGate] = useState(false);

  const question = AUDIT_QUESTIONS[step];
  const selected = question ? answers[question.id] : undefined;

  function selectOption(value: string) {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function goNext() {
    if (!selected) return;
    if (step < AUDIT_QUESTIONS.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    storeAuditAnswers(answers as AuditAnswers);
    setShowGate(true);
  }

  function goBack() {
    if (showGate) {
      setShowGate(false);
      return;
    }
    if (step > 0) setStep((s) => s - 1);
  }

  if (showGate) {
    const preview = computeAuditResult(answers as AuditAnswers);
    return (
      <AuditLeadGate
        answers={answers as AuditAnswers}
        previewScore={preview.score}
        previewTierLabel={preview.tierLabel}
        onBack={goBack}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <AuditProgress current={step + 1} total={AUDIT_QUESTIONS.length} />

      <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="font-heading text-2xl sm:text-3xl">{question.question}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{question.hint}</p>

        <div className="mt-6 space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => selectOption(option.value)}
              className={cn(
                "flex w-full items-center rounded-xl border px-4 py-3.5 text-left text-sm transition-colors sm:text-base",
                selected === option.value
                  ? "border-accent bg-accent/10 font-medium text-accent"
                  : "border-border hover:border-accent/40 hover:bg-accent/5",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            disabled={step === 0}
            className={cn(step === 0 && "invisible")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          <Button
            type="button"
            variant="accent"
            onClick={goNext}
            disabled={!selected}
          >
            {step === AUDIT_QUESTIONS.length - 1 ? "See my score" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
