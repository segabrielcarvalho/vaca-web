"use client";

import * as Headless from "@headlessui/react";
import clsx from "clsx";
import React, { useEffect } from "react";
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
};

export interface AlertProps
  extends Omit<
    Headless.DialogProps,
    "as" | "className" | "children" | "open" | "onClose" | "title"
  > {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  onConfirm?: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  size?: keyof typeof sizes;
  className?: string;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  loading?: boolean;
  children?: React.ReactNode;
}

export function Alert({
  isOpen,
  onClose,
  onOpen,
  onConfirm,
  title,
  description,
  size = "md",
  className,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  loading = false,
  children,
  ...props
}: AlertProps) {
  useEffect(() => {
    if (isOpen && onOpen) onOpen();
  }, [isOpen, onOpen]);

  return (
    <Headless.Dialog open={isOpen} onClose={onClose} {...props}>
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 flex w-screen justify-center overflow-y-auto bg-zinc-950/15 px-2 py-2 transition duration-100 data-closed:opacity-0 sm:px-6 sm:py-8 lg:px-8 lg:py-16 dark:bg-zinc-950/50"
      />
      <div className="fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0">
        <div className="grid min-h-full grid-rows-[1fr_auto_1fr] justify-items-center p-8 sm:grid-rows-[1fr_auto_3fr] sm:p-4">
          <Headless.DialogPanel
            transition
            className={clsx(
              className,
              sizes[size],
              "row-start-2 w-full rounded-2xl bg-white p-8 shadow-lg ring-1 ring-zinc-950/10 sm:rounded-2xl sm:p-6 dark:bg-zinc-900 dark:ring-white/10",
              "transition duration-100 data-closed:opacity-0 data-closed:data-enter:scale-95"
            )}
          >
            <Headless.DialogTitle className="text-center text-base/6 font-semibold text-zinc-950 sm:text-left sm:text-sm/6 dark:text-white">
              {title}
            </Headless.DialogTitle>

            {description && (
              <Headless.Description
                as={Text}
                className="mt-2 text-center sm:text-left text-pretty"
              >
                {description}
              </Headless.Description>
            )}

            {children ? (
              children
            ) : (
              <>
                <div className="mt-6 flex flex-col-reverse items-center justify-end gap-3 sm:mt-4 sm:flex-row">
                  <Button
                    outline
                    onClick={onClose}
                    className="w-full sm:w-auto"
                    disabled={loading}
                  >
                    {cancelLabel}
                  </Button>
                  <Button
                    onClick={() => {
                      if (!loading && onConfirm) onConfirm();
                      if (!loading) onClose();
                    }}
                    className="w-full sm:w-auto"
                    loading={loading}
                    color="purple"
                    disabled={loading}
                  >
                    {confirmLabel}
                  </Button>
                </div>
              </>
            )}
          </Headless.DialogPanel>
        </div>
      </div>
    </Headless.Dialog>
  );
}

export function AlertBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={clsx(className, "mt-4")} />;
}

export function AlertActions({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "mt-6 flex flex-col-reverse items-center justify-end gap-3 sm:mt-4 sm:flex-row"
      )}
    />
  );
}
