import { PlusIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

import { Button } from "./button";

type ButtonLikeProps = Partial<Omit<ComponentProps<typeof Button>, "children">>;

type EmptyStateAction =
  | ({ label: string; icon?: ReactNode } & ButtonLikeProps)
  | { render: ReactNode };

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;

  tone?: "neutral" | "brand";

  align?: "center" | "start";

  actions?: EmptyStateAction | EmptyStateAction[];

  children?: ReactNode;
  className?: string;
};

const toneStyles: Record<
  NonNullable<EmptyStateProps["tone"]>,
  { icon: string }
> = {
  neutral: {
    icon: "bg-zinc-50 text-zinc-500 ring-zinc-200 dark:bg-white/5 dark:text-zinc-300 dark:ring-white/10",
  },
  brand: {
    icon: "bg-brand-50 text-brand-600 ring-brand-200 dark:bg-brand-900/40 dark:text-brand-300 dark:ring-brand-800",
  },
};

export function EmptyState({
  title,
  description,
  icon,
  tone = "neutral",
  align = "center",
  actions,
  children,
  className,
}: EmptyStateProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  const actionAlignment =
    align === "center" ? "justify-center" : "justify-start";
  const resolvedActions = actions
    ? Array.isArray(actions)
      ? actions
      : [actions]
    : [];

  const toneClass = toneStyles[tone];

  const defaultIcon = (
    <span
      aria-hidden="true"
      className={clsx(
        "flex size-14 items-center justify-center rounded-2xl ring-1 ring-inset",
        toneClass.icon
      )}
    >
      <PlusIcon aria-hidden="true" className="size-6" />
    </span>
  );

  return (
    <div className={clsx("flex flex-col gap-4 sm:gap-5", alignment, className)}>
      {icon ?? defaultIcon}
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-zinc-950 sm:text-lg dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
            {description}
          </p>
        )}
        {children}
      </div>
      {resolvedActions.length > 0 && (
        <div className={clsx("mt-2 flex flex-wrap gap-3", actionAlignment)}>
          {resolvedActions.map((action, index) => {
            if ("render" in action) {
              return (
                <div key={index} className="contents">
                  {action.render}
                </div>
              );
            }

            const { label, icon: actionIcon, ...buttonProps } = action;

            return (
              <Button key={index} {...(buttonProps as any)}>
                {actionIcon && (
                  <span aria-hidden="true" data-slot="icon">
                    {actionIcon}
                  </span>
                )}
                {label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
