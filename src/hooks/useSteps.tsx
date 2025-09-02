"use client";
import { useCallback, useMemo, useState } from "react";

export type StepStatus = "complete" | "current" | "upcoming";

export interface Step<TMeta = unknown> {
  id: string | number | symbol;
  label: React.ReactNode;
  meta?: TMeta;
  disabled?: boolean;
}

export interface UseStepsReturn<TMeta = unknown> {
  steps: Step<TMeta>[];
  stepsWithStatus: (Step<TMeta> & { status: StepStatus })[];
  currentIndex: number;
  currentStep: Step<TMeta>;
  next: () => void;
  prev: () => void;
  set: (index: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function useSteps<TMeta = unknown>(
  steps: Step<TMeta>[],
  initialIndex = 0
): UseStepsReturn<TMeta> {
  const [currentIndex, setCurrentIndex] = useState(
    Math.min(Math.max(initialIndex, 0), steps.length - 1)
  );

  const hasPrev = currentIndex > 0;
  const hasNext =
    currentIndex < steps.length - 1 &&
    steps.slice(currentIndex + 1).some((s) => !s.disabled);

  const set = useCallback(
    (index: number) => {
      const safeIndex = Math.min(Math.max(index, 0), steps.length - 1);
      if (steps[safeIndex]?.disabled) return;
      setCurrentIndex(safeIndex);
    },
    [steps]
  );

  const prev = useCallback(() => {
    if (!hasPrev) return;
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!steps[i].disabled) {
        setCurrentIndex(i);
        break;
      }
    }
  }, [currentIndex, hasPrev, steps]);

  const next = useCallback(() => {
    if (!hasNext) return;
    for (let i = currentIndex + 1; i < steps.length; i++) {
      if (!steps[i].disabled) {
        setCurrentIndex(i);
        break;
      }
    }
  }, [currentIndex, hasNext, steps]);

  const stepsWithStatus = useMemo(
    () =>
      steps.map((step, idx) => ({
        ...step,
        status:
          idx < currentIndex
            ? ("complete" as const)
            : idx === currentIndex
            ? ("current" as const)
            : ("upcoming" as const),
      })),
    [steps, currentIndex]
  );

  return {
    steps,
    stepsWithStatus,
    currentIndex,
    currentStep: steps[currentIndex],
    next,
    prev,
    set,
    hasNext,
    hasPrev,
  };
}
