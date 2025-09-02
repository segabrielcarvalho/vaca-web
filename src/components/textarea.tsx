import * as Headless from "@headlessui/react";
import clsx from "clsx";
import { forwardRef, ReactNode, useId } from "react";

type TextareaProps = {
  label?: ReactNode;
  labelClassName?: string;
  required?: boolean;
  id?: string;
  className?: string;
  resizable?: boolean;
  rows?: number;
} & Omit<Headless.TextareaProps, "as" | "className">;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      labelClassName,
      required,
      id,
      className,
      resizable = true,
      rows,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label
            htmlFor={textareaId}
            className={clsx(
              "block font-medium text-zinc-950 dark:text-zinc-200 text-sm leading-6 select-none",
              labelClassName
            )}
          >
            {label}
            {required && (
              <span
                className="ml-1 text-red-500 select-none"
                aria-hidden="true"
              >
                *
              </span>
            )}
          </label>
        )}

        <span
          data-slot="control"
          className={clsx(
            className,
            "relative block w-full rounded-md",
            "before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white/5 before:shadow-sm",
            "after:pointer-events-none after:absolute after:inset-0 after:rounded-md after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-zinc-500",
            "has-data-disabled:opacity-50 has-data-disabled:before:bg-white/5 has-data-disabled:before:shadow-none",
            "has-data-invalid:before:shadow-red-500/10"
          )}
        >
          <Headless.Textarea
            ref={ref}
            id={textareaId}
            aria-required={required}
            required={required}
            rows={rows}
            {...props}
            className={clsx(
              "relative block w-full appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] scrollbar-thin scrollbar-thumb-brand-600 scrollbar-track-transparent",
              "text-base/6 text-zinc-950 dark:text-zinc-200 placeholder:text-zinc-500 sm:text-sm/6",
              "border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20",
              "bg-transparent",
              "focus:outline-hidden",
              "data-invalid:border-red-500 data-invalid:data-hover:border-red-500",
              "disabled:border-zinc-950/20",
              resizable ? "resize-y" : "resize-none"
            )}
          />
        </span>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
