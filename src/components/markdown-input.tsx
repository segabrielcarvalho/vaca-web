"use client";

import clsx from "clsx";
import { ChangeEvent, useId } from "react";
import { MarkdownComponent } from "./markdown-component";

interface MarkdownInputProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  previewClassName?: string;
  previewPosition?: "below" | "right";
  label?: string;
  labelClassName?: string;
  required?: boolean;
  inputId?: string;
}

export default function MarkdownInput({
  value,
  onChange,
  readOnly = false,
  placeholder = "Digite markdown…",
  className,
  inputClassName,
  previewClassName,
  previewPosition = "below",
  label,
  labelClassName,
  required = false,
  inputId,
}: MarkdownInputProps) {
  const generatedId = useId();
  const id = inputId ?? generatedId;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    onChange?.(e.target.value);

  const wrapperClasses = clsx("w-full", className);
  const rowClasses = clsx(previewPosition === "right" && "md:flex md:gap-6");
  const sideBySideClasses =
    previewPosition === "right"
      ? "w-full md:basis-1/2 md:shrink-0 md:min-w-0"
      : "w-full";

  const inputClasses = clsx(
    sideBySideClasses,
    "min-h-[160px] resize-vertical rounded-lg border border-zinc-300 dark:border-neutral-700/40",
    "bg-white dark:bg-neutral-800/60",
    "px-4 py-3 text-sm leading-6 text-zinc-900 dark:text-zinc-100",
    "placeholder-zinc-500 dark:placeholder-neutral-500",
    "focus:outline-none focus:ring-2 focus:ring-yellow-600",
    "max-w-full md:max-w-xl lg:max-w-2xl",
    inputClassName
  );

  const previewClasses = clsx(
    sideBySideClasses,
    "prose dark:prose-invert text-zinc-900 dark:text-zinc-100",
    "max-w-lg lg:max-w-3xl",
    previewPosition === "below" && "mt-6",
    previewClassName
  );

  return (
    <div className={wrapperClasses}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "mb-2 block font-medium text-zinc-900 dark:text-zinc-200 text-sm leading-6 select-none",
            labelClassName
          )}
        >
          {label}
          {required && (
            <span
              className="ml-1 text-red-600 dark:text-red-500"
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}
      <div className={rowClasses}>
        {!readOnly && (
          <textarea
            id={id}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            className={inputClasses}
          />
        )}
        <div className={previewClasses}>
          <MarkdownComponent>{value}</MarkdownComponent>
        </div>
      </div>
    </div>
  );
}
