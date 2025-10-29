"use client";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LayoutSidebar } from "./stacked-layout/sidebar";

type LayoutSidebarContextValue = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const LayoutSidebarContext = createContext<LayoutSidebarContextValue | null>(
  null
);

export const useApplicationLayoutSidebar = () => {
  const ctx = useContext(LayoutSidebarContext);
  if (!ctx) {
    throw new Error(
      "useApplicationLayoutSidebar must be used within StackedLayout"
    );
  }
  return ctx;
};

const recentActivities = [
  {
    id: "activity-1",
    title: "Reunião de pais",
    description: "Turma 3º Ano Ensino Médio",
    time: "Hoje · 14:00",
  },
  {
    id: "activity-2",
    title: "Entrega de boletins",
    description: "Turmas Ensino Fundamental II",
    time: "Amanhã · 09:00",
  },
  {
    id: "activity-3",
    title: "Aula aberta de artes",
    description: "Turma Artes Cênicas",
    time: "Sexta · 19:30",
  },
  {
    id: "activity-4",
    title: "Envio de comunicados",
    description: "Responsáveis do 5º Ano B",
    time: "Ontem · 17:45",
  },
];

const weekDayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function useCurrentMonthMatrix() {
  return useMemo(() => {
    const today = new Date();
    const monthLabel = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
    }).format(today);

    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const totalCells = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;

    const cells = Array.from({ length: totalCells }, (_, index) => {
      const day = index - startOffset + 1;
      return day > 0 && day <= lastDay.getDate() ? day : null;
    });

    return {
      monthLabel,
      todayDay: today.getDate(),
      cells,
    };
  }, []);
}

type StackedLayoutProps = React.PropsWithChildren<{ navbar: React.ReactNode }>;

export function StackedLayout({ navbar, children }: StackedLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const sidebarControls = useMemo<LayoutSidebarContextValue>(
    () => ({
      isSidebarOpen,
      toggleSidebar: () => setIsSidebarOpen((prev) => !prev),
      openSidebar: () => setIsSidebarOpen(true),
      closeSidebar: () => setIsSidebarOpen(false),
    }),
    [isSidebarOpen]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const apply = (matches: boolean) => {
      setIsDesktop(matches);
      if (!matches) {
        setIsSidebarOpen(false);
      }
    };

    apply(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsSidebarOpen(true);
    }

    const listener = (event: MediaQueryListEvent) => apply(event.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const { monthLabel, todayDay, cells } = useCurrentMonthMatrix();
  const calendarData = useMemo(
    () => ({
      monthLabel,
      todayDay,
      cells,
      weekDayLabels,
    }),
    [monthLabel, todayDay, cells]
  );

  return (
    <LayoutSidebarContext.Provider value={sidebarControls}>
      <div className="relative isolate flex h-svh min-h-svh w-full flex-col overflow-hidden bg-slate-50 text-zinc-900">
        <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between bg-blue-950 px-4 py-3 text-white sm:px-6 lg:px-8">
            {navbar}
          </div>
        </header>

        <main className="relative flex flex-1 items-stretch overflow-hidden">
          <div className="relative z-10 flex flex-1 flex-col px-4 pb-6 pt-4 transition-all duration-300 sm:px-6 lg:px-8">
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-300/70 hover:scrollbar-thumb-yellow-300/80">
              <div className="w-full rounded-2xl bg-white p-6 shadow-[0_32px_90px_-50px_rgba(15,23,42,0.35)] ring-1 ring-zinc-100">
                {children}
              </div>
            </div>
          </div>

          <LayoutSidebar
            isOpen={isSidebarOpen}
            isDesktop={isDesktop}
            onOpen={sidebarControls.openSidebar}
            onClose={sidebarControls.closeSidebar}
            calendar={calendarData}
            activities={recentActivities}
          />

          {!isDesktop && !isSidebarOpen && (
            <button
              type="button"
              onClick={sidebarControls.openSidebar}
              aria-label="Abrir painel lateral"
              className="fixed bottom-6 right-4 z-30 inline-flex items-center justify-center rounded-full border border-yellow-400/60 bg-white p-3 text-yellow-600 shadow-[0_24px_70px_-45px_rgba(252,211,77,0.7)] transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700 sm:right-6"
            >
              <AdjustmentsHorizontalIcon className="size-5" />
            </button>
          )}

          {isSidebarOpen && (
            <button
              type="button"
              aria-label="Fechar painel lateral"
              onClick={sidebarControls.closeSidebar}
              className="fixed inset-0 z-20 bg-zinc-900/35 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
            />
          )}
        </main>
      </div>
    </LayoutSidebarContext.Provider>
  );
}
