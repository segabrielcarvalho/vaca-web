import clsx from "clsx";
import Link from "next/link";
import {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

export type StepStatus = "complete" | "current" | "upcoming";

export interface Step {
  id: string | number;
  label: ReactNode;
  href?: string;
  disabled?: boolean;
}

export interface ProgressStepsHandle {
  next: () => void;
  prev: () => void;
  set: (index: number) => void;
}

interface ProgressStepsProps {
  steps: Step[];
  current?: number;
  defaultCurrent?: number;
  orientation?: "horizontal" | "vertical";
  clickable?: boolean;
  className?: string;
  onChange?: (index: number) => void;
  renderStep?: (step: Step, status: StepStatus, index: number) => ReactNode;
}

export const ProgressSteps = forwardRef<
  ProgressStepsHandle,
  ProgressStepsProps
>(function ProgressSteps(
  {
    steps,
    current,
    defaultCurrent = 0,
    orientation = "horizontal",
    clickable = true,
    className,
    onChange,
    renderStep,
  },
  ref
) {
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const active = current ?? internalCurrent;

  const update = useCallback(
    (idx: number) => {
      if (idx === active) return;
      onChange?.(idx);
      if (current === undefined) setInternalCurrent(idx);
    },
    [active, onChange, current]
  );

  const next = useCallback(() => {
    if (active < steps.length - 1) update(active + 1);
  }, [active, steps.length, update]);

  const prev = useCallback(() => {
    if (active > 0) update(active - 1);
  }, [active, update]);

  useImperativeHandle(
    ref,
    () => ({
      next,
      prev,
      set: update,
    }),
    [next, prev, update]
  );

  const listCls = useMemo(() => {
    if (orientation === "horizontal")
      return "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8";
    return "space-y-4 sm:flex sm:space-y-0 sm:space-x-8";
  }, [orientation]);

  return (
    <nav aria-label="Progress" className={className}>
      <ol role="list" className={listCls}>
        {steps.map((step, idx) => {
          const status: StepStatus =
            idx < active ? "complete" : idx === active ? "current" : "upcoming";

          if (renderStep)
            return <li key={step.id}>{renderStep(step, status, idx)}</li>;

          const baseBorder =
            orientation === "horizontal"
              ? "border-l-4 py-2 pl-4 sm:border-l-0 sm:border-t-4 sm:pt-4 sm:pb-0 sm:pl-0"
              : "border-l-4 py-2 pl-4";

          const borderColor =
            status === "complete" || status === "current"
              ? "border-yellow-600 dark:border-yellow-500"
              : "border-gray-200 dark:border-zinc-700";

          const hoverBorder =
            status === "complete"
              ? "hover:border-yellow-800 dark:hover:border-yellow-400"
              : "hover:border-gray-300 dark:hover:border-zinc-600";

          const idColor =
            status === "complete" || status === "current"
              ? "text-yellow-600 dark:text-yellow-400"
              : "text-gray-500 dark:text-zinc-400";

          const hoverText =
            status === "complete"
              ? "group-hover:text-yellow-800 dark:group-hover:text-yellow-300"
              : "group-hover:text-gray-700 dark:group-hover:text-zinc-200";

          const linkCls = clsx(
            "group flex flex-col",
            baseBorder,
            borderColor,
            hoverBorder
          );

          const spanCls = clsx("text-sm font-medium", idColor, hoverText);

          const handleClick = (e: React.MouseEvent) => {
            if (!clickable || step.disabled) {
              e.preventDefault();
              return;
            }
            update(idx);
          };

          return (
            <li
              key={step.id}
              className={
                orientation === "horizontal" ? "flex-1 sm:flex-1" : undefined
              }
            >
              <Link
                href={step.href ?? "#"}
                aria-current={status === "current" ? "step" : undefined}
                aria-disabled={step.disabled}
                className={linkCls}
                onClick={handleClick}
                tabIndex={step.disabled ? -1 : 0}
              >
                <div className="flex items-center space-x-2">
                  <span className={spanCls}>{step.id}</span>
                  <span className="text-sm font-medium w-full">
                    {step.label}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
