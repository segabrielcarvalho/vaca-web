"use client";

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";

export interface PaginationProps {
  className?: string;
  page: number;
  pageSize: number;
  totalArraySize: number;
  setPageSize?: (size: number) => void;
  setPage: (page: number) => void;
}

export function Pagination({
  className,
  page,
  pageSize,
  totalArraySize,
  setPage,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalArraySize / pageSize));

  const createRange = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);

  const getDisplayedPages = (): (number | "...")[] => {
    if (totalPages <= 7) return createRange(1, totalPages);
    if (page <= 4) return [...createRange(1, 5), "...", totalPages];
    if (page >= totalPages - 3)
      return [1, "...", ...createRange(totalPages - 4, totalPages)];
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  const pages = getDisplayedPages();

  const goTo = (p: number) => () =>
    setPage(Math.min(Math.max(p, 1), totalPages));

  return (
    <nav
      className={clsx(
        "flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 dark:border-zinc-700",
        className
      )}
    >
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={goTo(page - 1)}
          disabled={page === 1}
          className={clsx(
            "inline-flex items-center border-t-2 pt-4 pr-1 text-sm font-medium",
            page === 1
              ? "border-transparent text-gray-300 dark:text-zinc-500 cursor-not-allowed"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          )}
        >
          <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5" />
          Anterior
        </button>
      </div>

      <div className="hidden md:-mt-px md:flex">
        {pages.map((p, idx) =>
          p === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 dark:text-zinc-400"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={goTo(p as number)}
              aria-current={p === page ? "page" : undefined}
              className={clsx(
                "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium",
                p === page
                  ? "border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-300"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              {p}
            </button>
          )
        )}
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={goTo(page + 1)}
          disabled={page === totalPages}
          className={clsx(
            "inline-flex items-center border-t-2 pt-4 pl-1 text-sm font-medium",
            page === totalPages
              ? "border-transparent text-gray-300 dark:text-zinc-500 cursor-not-allowed"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          )}
        >
          Próximo
          <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
