"use client";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { isPathActive } from "@/routes";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type CSSProperties } from "react";
import type { NavigationItem } from "./application-layout";
import { Divider } from "./divider";
import { Logo } from "./logo";

type StackedLayoutProps = {
  navItems: NavigationItem[];
  user?: { name: string; email?: string; avatarUrl?: string };
  onSignOut?: () => void;
  signingOut?: boolean;
  children: React.ReactNode;
};

export function StackedLayout({
  navItems,
  user,
  onSignOut,
  signingOut,
  children,
}: StackedLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeItem =
    navItems.find((item) => isPathActive(pathname, item.href)) ?? navItems[0];

  const sidebarStyle = useMemo<CSSProperties>(
    () => ({
      ["--sidebar-width" as string]: "min(22vw, 18rem)",
    }),
    []
  );

  const initials =
    !user?.avatarUrl && user?.name
      ? user.name
          .split(/\s+/)
          .map((part) => part[0])
          .filter(Boolean)
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : undefined;

  const renderNavList = (isMobile?: boolean) => (
    <ul role="list" className="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          {navItems.map((item) => {
            const active = isPathActive(pathname, item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => {
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={clsx(
                    active
                      ? "bg-white/5 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white",
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition"
                  )}
                >
                  <item.Icon aria-hidden="true" className="size-6 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
      {user && (
        <li className="-mx-2 mt-auto">
          <div className="flex items-center gap-x-3 rounded-lg px-2 py-3 text-sm font-semibold text-white transition hover:bg-white/5">
            <Avatar
              src={user.avatarUrl}
              initials={initials}
              alt={user.name}
              className="size-9 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-white">{user.name}</p>
              {user.email && (
                <p className="truncate text-xs text-white/70">{user.email}</p>
              )}
            </div>
            {onSignOut && (
              <Button
                size="sm"
                color="light"
                outline
                className="px-3 py-1 text-xs"
                onClick={onSignOut}
                loading={signingOut}
              >
                Sair
              </Button>
            )}
          </div>
        </li>
      )}
    </ul>
  );

  return (
    <div className="min-h-svh bg-slate-50 text-zinc-900" style={sidebarStyle}>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-zinc-950/70 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-[min(82vw,var(--sidebar-width))] flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 rounded-full p-2.5 text-white hover:bg-white/10"
                >
                  <span className="sr-only">Fechar menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
            </TransitionChild>

            <div className="relative flex grow flex-col gap-y-6 overflow-y-auto bg-slate-900 px-6 pb-4 pt-6 ring-1 ring-white/10">
              <div className="flex h-12 items-center">
                <Logo className="h-9 w-auto text-white" />
              </div>
              <nav className="flex flex-1 flex-col">{renderNavList(true)}</nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:flex-col">
        <div className="flex h-full flex-col gap-y-6 bg-slate-900 px-6 pb-6 pt-8 ring-1 ring-black/10 lg:w-[var(--sidebar-width)]">
          <div className="flex h-10 items-center justify-center">
            <Logo className="h-16 w-auto text-white" />
          </div>
          <Divider className="border-white/10" />
          <nav className="flex flex-1 flex-col">{renderNavList()}</nav>
        </div>
      </div>

      <div className="sticky top-0 z-30 flex items-center gap-x-4 bg-slate-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 rounded-full p-2.5 text-white hover:bg-white/10"
        >
          <span className="sr-only">Abrir menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <div className="flex-1 text-sm font-semibold text-white">
          {activeItem?.label || "Navegação"}
        </div>
        {user && (
          <Avatar
            src={user.avatarUrl}
            initials={initials}
            alt={user.name}
            className="size-9 border border-white/15 bg-white/10 text-white"
          />
        )}
      </div>

      <main className="pt-6 lg:pl-[var(--sidebar-width)]">
        <div className="px-4 pb-10 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
