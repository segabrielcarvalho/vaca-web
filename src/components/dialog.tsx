import * as Headless from "@headlessui/react";
import clsx from "clsx";
import type React from "react";
import { Button } from "./button";
import { Text } from "./text";

const sizes = {
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
} as const;

type ScrollBehavior = "inside" | "outside";

type DialogProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  onActualSubmit?: () => void | Promise<void>;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  scrollBehavior?: ScrollBehavior;
} & Omit<Headless.DialogProps, "as" | "className" | "children">;

export function Dialog({
  title,
  description,
  onActualSubmit,
  size = "xl",
  className,
  children,
  loading = false,
  scrollBehavior = "inside",
  ...props
}: DialogProps) {
  const outerScroll =
    scrollBehavior === "outside" ? "overflow-y-auto" : "overflow-y-hidden";

  const panelBase =
    "row-start-2 w-full min-w-0 rounded-t-xl bg-zinc-50 p-(--gutter) ring-1 shadow-lg [--gutter:--spacing(8)] sm:mb-auto sm:rounded-xl dark:bg-zinc-800 dark:ring-zinc-600/50 ring-zinc-300 dark:shadow-zinc-900/30 forced-colors:outline";

  const panelTransition =
    "transition data-[enter]:duration-300 data-[enter]:ease-out data-[enter]:opacity-100 data-[enter]:translate-y-0 data-[enter]:scale-100 data-[leave]:duration-200 data-[leave]:ease-in data-[leave]:opacity-0 data-[leave]:translate-y-4 data-[leave]:scale-95";

  const insidePanel = scrollBehavior === "inside";

  const panelInside = insidePanel
    ? "flex flex-col max-h-[80dvh] overflow-hidden"
    : "";

  const bodyClasses = insidePanel
    ? "mt-6 pr-2 flex-1 overflow-y-auto text-zinc-800 dark:text-zinc-100 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
    : "mt-6 text-zinc-800 dark:text-zinc-100";

  return (
    <Headless.Dialog {...props}>
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 bg-zinc-400/40 dark:bg-zinc-900/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className={clsx("fixed inset-0 w-screen pt-6 sm:pt-0", outerScroll)}>
        <div className="grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4">
          <Headless.DialogPanel
            transition
            className={clsx(
              className,
              sizes[size],
              panelBase,
              panelTransition,
              panelInside
            )}
          >
            <header className="flex flex-col gap-2">
              <Headless.DialogTitle className="text-lg/6 font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
              </Headless.DialogTitle>
              {description && (
                <Headless.Description
                  as={Text}
                  className="text-pretty text-zinc-700 dark:text-zinc-200"
                >
                  {description}
                </Headless.Description>
              )}
            </header>
            <section className={bodyClasses}>{children}</section>
            <footer className="mt-6 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto">
              <Button
                type="button"
                onClick={() => props.onClose?.(false)}
                outline
              >
                Fechar
              </Button>
              {onActualSubmit && (
                <Button
                  type="button"
                  onClick={onActualSubmit}
                  color="yellow"
                  loading={loading}
                >
                  Confirmar
                </Button>
              )}
            </footer>
          </Headless.DialogPanel>
        </div>
      </div>
    </Headless.Dialog>
  );
}
