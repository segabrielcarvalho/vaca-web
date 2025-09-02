"use client";

import clsx from "clsx";
import { createContext, useContext, useState } from "react";
import { Link } from "./link";

type RowConfig = {
  cells: React.ReactNode[];
  href?: string;
  isExternal?: boolean;
  target?: string;
  title?: string;
};

const TableContext = createContext({
  bleed: false,
  dense: false,
  grid: false,
  striped: false,
});

export function Table({
  headers,
  rows,
  bleed = false,
  dense = false,
  grid = false,
  striped = false,
  total = 0,
  className,
  children,
  ...props
}: {
  headers?: React.ReactNode[];
  rows?: RowConfig[];
  bleed?: boolean;
  dense?: boolean;
  grid?: boolean;
  striped?: boolean;
  total?: number;
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <TableContext.Provider value={{ bleed, dense, grid, striped }}>
      <div className="flow-root">
        {total > 0 && (
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Total de itens: {total}
          </div>
        )}

        <div
          {...props}
          className={clsx(
            className,
            "-mx-[--gutter] overflow-x-auto whitespace-nowrap"
          )}
        >
          <div
            className={clsx(
              "inline-block min-w-full align-middle",
              !bleed && "sm:px-[--gutter]"
            )}
          >
            <table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
              {headers && (
                <TableHead>
                  <tr>
                    {headers.map((h, idx) => (
                      <TableHeader key={idx}>{h}</TableHeader>
                    ))}
                  </tr>
                </TableHead>
              )}
              {rows ? (
                <TableBody>
                  {rows.map(
                    ({ cells, href, target, title, isExternal }, rowIdx) => (
                      <TableRow
                        key={rowIdx}
                        href={href}
                        target={target}
                        title={title}
                        isExternal={isExternal}
                      >
                        {cells.map((c, cellIdx) => (
                          <TableCell key={cellIdx}>{c}</TableCell>
                        ))}
                      </TableRow>
                    )
                  )}
                </TableBody>
              ) : (
                children
              )}
            </table>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
}

export function TableHead(props: React.ComponentPropsWithoutRef<"thead">) {
  return <thead {...props} className="text-zinc-600 dark:text-zinc-400" />;
}

export function TableBody(props: React.ComponentPropsWithoutRef<"tbody">) {
  return <tbody {...props} />;
}

interface TableRowContextProps {
  href?: string;
  target?: string;
  title?: string;
  isExternal?: boolean;
}

const TableRowContext = createContext<TableRowContextProps>({
  href: undefined,
  target: undefined,
  title: undefined,
  isExternal: false,
});

export function TableRow({
  href,
  target,
  title,
  isExternal = false,
  className,
  ...props
}: {
  href?: string;
  target?: string;
  title?: string;
  isExternal?: boolean;
} & React.ComponentPropsWithoutRef<"tr">) {
  const { striped } = useContext(TableContext);
  return (
    <TableRowContext.Provider value={{ href, target, title, isExternal }}>
      <tr
        {...props}
        className={clsx(
          className,
          href &&
            "has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-orange-500 dark:focus-within:bg-white/[2.5%]",
          striped && "even:bg-zinc-950/[4%] dark:even:bg-white/[2.5%]",
          href && striped && "hover:bg-zinc-950/5 dark:hover:bg-white/5",
          href &&
            !striped &&
            "hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%]"
        )}
      />
    </TableRowContext.Provider>
  );
}

export function TableHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"th">) {
  const { bleed, grid } = useContext(TableContext);
  return (
    <th
      {...props}
      className={clsx(
        className,
        "first:pl-5 last:pr-5",
        "text-zinc-700 dark:text-zinc-200 border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10",
        grid &&
          "border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5",
        !bleed && "sm:first:pl-5 sm:last:pr-5"
      )}
    />
  );
}

export function TableCell({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"td">) {
  const { bleed, dense, grid, striped } = useContext(TableContext);
  const { href, target, title, isExternal } = useContext(TableRowContext);
  const [cellRef, setCellRef] = useState<HTMLElement | null>(null);

  return (
    <td
      ref={href ? setCellRef : undefined}
      {...props}
      className={clsx(
        className,
        "first:pl-5 last:pr-5",
        "relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]",
        !striped && "border-b border-zinc-950/5 dark:border-white/5",
        grid &&
          "border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5",
        dense ? "py-2.5" : "py-4",
        !bleed && "sm:first:pl-5 sm:last:pr-5"
      )}
    >
      {href && (
        <Link
          data-row-link
          href={href}
          target={isExternal ? "_blank" : target}
          rel={isExternal ? "noopener noreferrer" : undefined}
          aria-label={title}
          tabIndex={cellRef?.previousElementSibling === null ? 0 : -1}
          className="absolute inset-0 focus:outline-none"
        />
      )}
      {children}
    </td>
  );
}
