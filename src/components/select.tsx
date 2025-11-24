import * as Headless from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import {
  forwardRef,
  ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

export type Option = {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
};

interface BaseProps
  extends Omit<
    Headless.SelectProps,
    "as" | "multiple" | "className" | "value" | "onChange" | "children"
  > {
  id?: string;
  placeholder?: string;
}

export interface SelectProps extends BaseProps {
  options: Option[];
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  multiple?: boolean;
  label?: ReactNode;
  className?: string;
  isClearable?: boolean;
  onClear?: () => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      className,
      options,
      multiple = false,
      value,
      onChange,
      label,
      required,
      id,
      placeholder,
      isClearable,
      onClear,
      disabled,
      ...props
    },
    ref
  ) {
    const autoId = useId();
    const selectId = id ?? (label ? autoId : undefined);
    const clearable = isClearable === true;

    const selectRef = useRef<HTMLSelectElement | null>(null);
    const setRefs = (node: HTMLSelectElement | null) => {
      selectRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLSelectElement | null>).current =
          node;
    };

    const initialHasValue = useMemo(() => {
      if (Array.isArray(value)) return value.length > 0;
      if (value !== undefined && value !== null) return String(value) !== "";
      const dv = props.defaultValue;
      if (Array.isArray(dv)) return dv.length > 0;
      if (dv !== undefined && dv !== null) return String(dv) !== "";
      return false;
    }, [value, props]);

    const [hasValue, setHasValue] = useState<boolean>(initialHasValue);

    useEffect(() => {
      if (Array.isArray(value)) setHasValue(value.length > 0);
      else if (value !== undefined && value !== null)
        setHasValue(String(value) !== "");
    }, [value]);

    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (
      event
    ) => {
      if (multiple) {
        const selectedValues = Array.from(event.target.selectedOptions).map(
          (o) => o.value
        );
        setHasValue(selectedValues.length > 0);
        onChange?.(selectedValues);
      } else {
        const v = event.target.value;
        setHasValue(v !== "");
        onChange?.(v);
      }
    };

    const clearUncontrolled = () => {
      const el = selectRef.current;
      if (!el) return;
      if (multiple) {
        Array.from(el.options).forEach((o) => (o.selected = false));
      } else {
        el.value = "";
      }
      const ev = new Event("change", { bubbles: true });
      el.dispatchEvent(ev);
      el.focus();
    };

    const handleClear = () => {
      if (disabled) return;
      if (onChange) onChange(multiple ? [] : "");
      else clearUncontrolled();
      setHasValue(false);
      onClear?.();
    };

    const control = (
      <span
        data-slot="control"
        className={clsx(
          className,
          "group relative block w-full before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset has-data-focus:after:ring-2 has-data-focus:after:ring-yellow-500 has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none"
        )}
      >
        <Headless.Select
          id={selectId}
          ref={setRefs}
          multiple={multiple}
          disabled={disabled}
          value={
            Array.isArray(value)
              ? value.map(String)
              : value !== undefined
              ? String(value)
              : value
          }
          onChange={handleChange}
          {...props}
          className={clsx(
            "relative block w-full appearance-none rounded-lg py-[calc(--spacing(2.5)-1px)] sm:py-[calc(--spacing(2.3)-1px)] cursor-pointer",
            multiple
              ? "px-[calc(--spacing(3.5)-1px)] sm:px-[calc(--spacing(3)-1px)]"
              : clearable
              ? "pr-[calc(--spacing(14)-1px)] pl-[calc(--spacing(3.5)-1px)] sm:pr-[calc(--spacing(12)-1px)] sm:pl-[calc(--spacing(3)-1px)]"
              : "pr-[calc(--spacing(10)-1px)] pl-[calc(--spacing(3.5)-1px)] sm:pr-[calc(--spacing(9)-1px)] sm:pl-[calc(--spacing(3)-1px)]",
            "[&_optgroup]:font-semibold",
            "text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white dark:*:text-white",
            "border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20",
            "bg-transparent dark:bg-white/5 dark:*:bg-zinc-800",
            "focus:outline-hidden",
            "data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-600 dark:data-invalid:data-hover:border-red-600",
            "data-disabled:border-zinc-950/20 data-disabled:opacity-100 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/2.5 dark:data-hover:data-disabled:border-white/15"
          )}
        >
          {!multiple && placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </Headless.Select>

        {clearable && hasValue && (
          <button
            type="button"
            aria-label="Limpar seleção"
            onClick={handleClear}
            disabled={Boolean(disabled)}
            className={clsx(
              "absolute top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-1 text-zinc-500 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50",
              multiple ? "right-2.5" : "right-8 sm:right-7"
            )}
          >
            <XMarkIcon className="size-4" />
          </button>
        )}

        {!multiple && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="size-5 stroke-zinc-500 group-has-data-disabled:stroke-zinc-600 sm:size-4 dark:stroke-zinc-400 forced-colors:stroke-[CanvasText]"
              viewBox="0 0 16 16"
              aria-hidden="true"
              fill="none"
            >
              <path
                d="M5.75 10.75L8 13L10.25 10.75"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.25 5.25L8 3L5.75 5.25"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </span>
    );

    if (label) {
      return (
        <div className="flex flex-col gap-1">
          <label
            htmlFor={selectId}
            className="font-medium text-zinc-950 dark:text-zinc-200 text-sm leading-6 select-none"
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

          {control}
        </div>
      );
    }

    return control;
  }
);
