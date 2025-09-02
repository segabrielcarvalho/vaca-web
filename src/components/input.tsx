"use client";
import * as Headless from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export function InputGroup({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="control"
      className={clsx(
        "relative isolate block",
        "has-[[data-slot=icon]:first-child]:[&_input]:pl-10 has-[[data-slot=icon]:last-child]:[&_input]:pr-10 sm:has-[[data-slot=icon]:first-child]:[&_input]:pl-8 sm:has-[[data-slot=icon]:last-child]:[&_input]:pr-8",
        "*:data-[slot=icon]:pointer-events-none *:data-[slot=icon]:absolute *:data-[slot=icon]:top-3 *:data-[slot=icon]:z-10 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:top-2.5 sm:*:data-[slot=icon]:size-4",
        "[&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5",
        "*:data-[slot=icon]:text-zinc-500",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

const dateTypes = ["date", "datetime-local", "month", "time", "week"] as const;
type DateType = (typeof dateTypes)[number];

type InputProps = {
  label?: ReactNode;
  labelClassName?: string;
  required?: boolean;
  id?: string;
  className?: string;
  isClearable?: boolean;
  onClear?: () => void;
  type?:
    | "email"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "url"
    | DateType;
} & Omit<Headless.InputProps, "as" | "className">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    labelClassName,
    required,
    id,
    className,
    isClearable,
    onClear,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const clearable = isClearable === true;
  const innerRef = useRef<HTMLInputElement>(null);
  const setRefs = (node: HTMLInputElement | null) => {
    innerRef.current = node as HTMLInputElement | null;
    if (typeof ref === "function") ref(node);
    else if (ref)
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
  };

  const [hasValue, setHasValue] = useState<boolean>(() => {
    if (props.value != null) return String(props.value).length > 0;
    if (props.defaultValue != null)
      return String(props.defaultValue as string).length > 0;
    return false;
  });

  useEffect(() => {
    if (props.value != null) setHasValue(String(props.value).length > 0);
  }, [props.value]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setHasValue(e.currentTarget.value.length > 0);
    props.onChange?.(e);
  };

  const handleClear = () => {
    const el = innerRef.current;
    if (!el) return;
    const descriptor = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value"
    );
    descriptor?.set?.call(el, "");
    const ev = new Event("input", { bubbles: true });
    el.dispatchEvent(ev);
    setHasValue(false);
    onClear?.();
    el.focus();
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(
            "block font-medium text-zinc-950 dark:text-zinc-200 text-sm leading-6 select-none",
            labelClassName
          )}
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500 select-none" aria-hidden="true">
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
        <Headless.Input
          ref={setRefs}
          id={inputId}
          aria-required={required}
          required={required}
          {...props}
          onChange={handleChange}
          className={clsx(
            props.type &&
              dateTypes.includes(props.type as DateType) && [
                "[&::-webkit-datetime-edit-fields-wrapper]:p-0",
                "[&::-webkit-date-and-time-value]:min-h-[1.5em]",
                "[&::-webkit-datetime-edit]:inline-flex",
                "[&::-webkit-datetime-edit]:p-0",
                "[&::-webkit-datetime-edit-year-field]:p-0",
                "[&::-webkit-datetime-edit-month-field]:p-0",
                "[&::-webkit-datetime-edit-day-field]:p-0",
                "[&::-webkit-datetime-edit-hour-field]:p-0",
                "[&::-webkit-datetime-edit-minute-field]:p-0",
                "[&::-webkit-datetime-edit-second-field]:p-0",
                "[&::-webkit-datetime-edit-millisecond-field]:p-0",
                "[&::-webkit-datetime-edit-meridiem-field]:p-0",
              ],
            "relative block w-full appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(2.3)-1px)]",
            "text-base/6 text-zinc-950 dark:text-zinc-200 placeholder:text-zinc-500 sm:text-sm/6",
            "border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20",
            "bg-transparent",
            "focus:outline-hidden",
            "data-invalid:border-red-500 data-invalid:data-hover:border-red-500",
            "data-disabled:border-zinc-950/20",
            clearable && "pr-10 sm:pr-8"
          )}
        />

        {clearable && hasValue && (
          <button
            type="button"
            onClick={handleClear}
            disabled={Boolean(props.disabled)}
            className="absolute right-2.5 top-2.5 inline-flex items-center justify-center rounded-md p-1 text-zinc-500 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50 sm:top-2"
            aria-label="Limpar"
          >
            <XMarkIcon className="size-4" />
          </button>
        )}
      </span>
    </div>
  );
});
