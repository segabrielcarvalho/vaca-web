"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IoIosArrowBack } from "react-icons/io";

type CalendarData = {
  monthLabel: string;
  weekDayLabels: string[];
  cells: Array<number | null>;
  todayDay: number;
};

type RecentActivity = {
  id: string;
  title: string;
  description: string;
  time: string;
};

type SidebarProps = {
  isOpen: boolean;
  isDesktop: boolean;
  onOpen: () => void;
  onClose: () => void;
  calendar: CalendarData;
  activities: RecentActivity[];
};

export function LayoutSidebar({
  isOpen,
  isDesktop,
  onOpen,
  onClose,
  calendar,
  activities,
}: SidebarProps) {
  return (
    <aside
      className={clsx(
        "fixed inset-y-0 right-0 z-30 flex h-full w-full max-w-md translate-x-full transform shadow-[0_26px_80px_-40px_rgba(15,23,42,0.35)] transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:max-w-none lg:flex-shrink-0 lg:self-start lg:transition-[width,transform] lg:duration-500",
        isOpen
          ? "pointer-events-auto translate-x-0 lg:w-[24rem] lg:translate-x-0"
          : "pointer-events-none translate-x-full lg:pointer-events-auto lg:translate-x-0 lg:w-12"
      )}
      aria-label="Painel adicional"
      aria-hidden={!isOpen && !isDesktop}
    >
      <div className="flex h-full w-full flex-1 flex-col bg-transparent">
        {isOpen ? (
          <div className="flex h-full w-full flex-1 flex-col bg-white">
            <ExpandedSidebarContent
              calendar={calendar}
              activities={activities}
              onClose={onClose}
            />
          </div>
        ) : (
          <CollapsedSidebarRail onOpen={onOpen} />
        )}
      </div>
    </aside>
  );
}

function ExpandedSidebarContent({
  calendar,
  activities,
  onClose,
}: {
  calendar: CalendarData;
  activities: RecentActivity[];
  onClose: () => void;
}) {
  return (
    <div className="flex h-full flex-1 flex-col divide-y divide-zinc-100 lg:overflow-hidden">
      <header className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Painel lateral
          </p>
          <h2 className="text-lg font-semibold text-zinc-900">Visão rápida</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Fechar painel lateral"
          className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white p-2 text-zinc-500 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700"
        >
          <XMarkIcon className="size-5" />
        </button>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6">
        <CalendarSection calendar={calendar} />
        <RecentActivitiesSection activities={activities} />
      </div>
    </div>
  );
}

function CollapsedSidebarRail({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="hidden h-full w-full flex-col items-center justify-start lg:flex">
      <div className="bg-yellow-500 mt-4 p-3 rounded-l-full cursor-pointer shadow-[0_20px_65px_-40px_rgba(250,204,21,0.75)] hover:shadow-[0_25px_65px_-40px_rgba(250,204,21,0.85)] transition">
        <IoIosArrowBack className="size-5" onClick={onOpen} />
      </div>
    </div>
  );
}

function CalendarSection({ calendar }: { calendar: CalendarData }) {
  const { monthLabel, weekDayLabels, cells, todayDay } = calendar;

  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900">Calendário</h3>
        <span className="text-xs uppercase tracking-wide text-zinc-400">
          {monthLabel}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-zinc-500">
        {weekDayLabels.map((label) => (
          <span key={label} className="py-1 text-zinc-500">
            {label}
          </span>
        ))}
        {cells.map((day, index) => (
          <span
            key={`day-${index}`}
            className={clsx(
              "flex h-8 items-center justify-center rounded-md text-sm font-medium",
              day === todayDay
                ? "bg-yellow-400 text-white"
                : day
                ? "text-zinc-600"
                : "text-transparent"
            )}
          >
            {day ?? "·"}
          </span>
        ))}
      </div>
    </section>
  );
}

function RecentActivitiesSection({
  activities,
}: {
  activities: RecentActivity[];
}) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-zinc-900">
        Atividades recentes
      </h3>
      <ul className="mt-4 space-y-3">
        {activities.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-zinc-200 bg-zinc-50 p-4"
          >
            <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
            <p className="text-sm text-zinc-500">{item.description}</p>
            <p className="text-xs text-zinc-400">{item.time}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
