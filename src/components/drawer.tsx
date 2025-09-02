"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import useDisclosure from "../hooks/useDisclosure";
import { Button } from "./button";
import { Divider } from "./divider";

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
} as const;

export default function Drawer({
  children,
  title = "Filtros Disponíveis",
  label = "Filtros",
  size = "md",
  width,
}: {
  title?: string;
  label?: string;
  children?: React.ReactNode;
  size?: keyof typeof sizeMap;
  width?: number | string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const style = width
    ? { width: typeof width === "number" ? `${width}px` : String(width) }
    : undefined;

  return (
    <div>
      <div className="flex justify-end items-center w-full">
        <Button outline onClick={onOpen}>
          {label}
        </Button>
      </div>

      <Dialog open={isOpen} onClose={onClose} className="relative z-10">
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                style={style}
                className={clsx(
                  "pointer-events-auto transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700",
                  width ? null : "w-screen",
                  width ? null : sizeMap[size]
                )}
              >
                <div className="relative flex h-full flex-col overflow-y-auto bg-zinc-800 py-6 shadow-xl after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-white/10">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between flex-col gap-3">
                      <div className="flex flex-1 flex-row w-full justify-between items-center">
                        <DialogTitle className="text-base font-semibold text-zinc-200">
                          {title}
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            onClick={onClose}
                            className="relative cursor-pointer rounded-md text-zinc-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Fechar Painel</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                          </button>
                        </div>
                      </div>
                      <Divider />
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {children}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
