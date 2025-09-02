"use client";

import * as Headless from "@headlessui/react";
import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import React, { forwardRef, useId } from "react";
import { TouchTarget } from "./button";
import { Link } from "./link";

export function Sidebar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      {...props}
      className={clsx(className, "flex h-full min-h-0 flex-col w-84")}
    />
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "flex flex-col p-4 [&>[data-slot=section]+[data-slot=section]]:mt-2.5 justify-start items-start"
      )}
    />
  );
}

export function SidebarBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "flex flex-1 flex-col overflow-y-auto p-4 [&>[data-slot=section]+[data-slot=section]]:mt-8"
      )}
    />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "flex flex-col p-4 [&>[data-slot=section]+[data-slot=section]]:mt-2.5"
      )}
    />
  );
}

export function SidebarSection({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const id = useId();

  return (
    <LayoutGroup id={id}>
      <div
        {...props}
        data-slot="section"
        className={clsx(className, "flex flex-col gap-1")}
      />
    </LayoutGroup>
  );
}

export function SidebarDivider({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"hr">) {
  return (
    <hr
      {...props}
      className={clsx(
        className,
        "my-4 border-t border-zinc-950/5 lg:-mx-4 dark:border-white/5"
      )}
    />
  );
}

export function SidebarSpacer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={clsx(className, "mt-8 flex-1")}
    />
  );
}

export function SidebarHeading({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      {...props}
      className={clsx(
        className,
        "mb-1 px-2 text-xs/6 font-medium text-zinc-500 dark:text-zinc-400"
      )}
    />
  );
}

export const SidebarItem = forwardRef(function SidebarItem(
  {
    current,
    className,
    children,
    ...props
  }: { current?: boolean; className?: string; children: React.ReactNode } & (
    | Omit<Headless.ButtonProps, "as" | "className">
    | Omit<Headless.ButtonProps<typeof Link>, "as" | "className">
  ),
  ref: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
) {
  const classes = clsx(
    // Base
    "flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-base/6 font-medium text-zinc-950 dark:text-zinc-200 sm:py-3 sm:text-sm/5",

    // Leading icon / icon-only
    "*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 dark:*:data-[slot=icon]:text-zinc-400 sm:*:data-[slot=icon]:size-5",

    // Trailing icon
    "*:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4",

    // Avatar
    "*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 sm:*:data-[slot=avatar]:size-6",

    // hover
    "data-hover:bg-purple-600/10 data-hover:text-purple-700/80 data-hover:*:data-[slot=icon]:text-purple-500 data-hover:*:data-[slot=chat]:text-purple-500",
    "dark:data-hover:bg-purple-300/10 dark:data-hover:text-purple-200 dark:data-hover:*:data-[slot=icon]:text-purple-400 dark:data-hover:*:data-[slot=chat]:text-purple-400",

    // active
    "data-active:bg-zinc-950/10 data-active:*:data-[slot=icon]:text-zinc-950",
    "dark:data-active:bg-white/10 dark:data-active:*:data-[slot=icon]:text-zinc-200",

    // current
    "data-current:bg-purple-600/10 data-current:text-purple-800/80 data-current:*:data-[slot=icon]:text-purple-500 data-current:*:data-[slot=chat]:text-purple-500",
    "dark:data-current:bg-purple-400/10 dark:data-current:text-purple-200 dark:data-current:*:data-[slot=icon]:text-purple-400 dark:data-current:*:data-[slot=chat]:text-purple-400"
  );

  return (
    <span className={clsx(className, "relative")}>
      {current && (
        <motion.span
          layoutId="current-indicator"
          className="absolute inset-y-2 -left-4 w-0.5 rounded-full bg-purple-500 dark:bg-purple-500 "
        />
      )}
      {"href" in props ? (
        <Headless.CloseButton
          as={Link}
          {...props}
          className={classes}
          data-current={current ? "true" : undefined}
          ref={ref}
        >
          <TouchTarget>{children}</TouchTarget>
        </Headless.CloseButton>
      ) : (
        <Headless.Button
          {...props}
          className={clsx("cursor-default", classes)}
          data-current={current ? "true" : undefined}
          ref={ref}
        >
          <TouchTarget>{children}</TouchTarget>
        </Headless.Button>
      )}
    </span>
  );
});

export function SidebarLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return <span {...props} className={clsx(className, "truncate")} />;
}
