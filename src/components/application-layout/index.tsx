"use client";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  Cog6ToothIcon,
  HomeIcon,
  MegaphoneIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import getRoutes, { isPathActive } from "../../routes";
import { Logo } from "../logo";
import { StackedLayout } from "../stacked-layout";

function NavItem({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "inline-flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 sm:px-4 md:px-5",
        active
          ? "bg-yellow-400 text-zinc-900 shadow-[0_25px_65px_-40px_rgba(250,204,21,0.75)]"
          : "text-white hover:bg-yellow-400 hover:text-zinc-900"
      )}
    >
      {children}
    </Link>
  );
}
function HorizontalNavbar() {
  const pathname = usePathname();
  const routes = getRoutes();
  const homeHref = routes.home.path();
  const classesHref = "/classes";
  const settingsHref = "/settings";
  const { user, signOut, isLoading } = useAuthContext();

  console.log("User in Navbar:", user);

  const displayName = user?.name || "Usuário";
  const displayEmail = user?.email || "";
  const avatarUrl = user?.avatarUrl || undefined;
  const initials =
    !avatarUrl && displayName
      ? displayName
          .split(/\s+/)
          .map((part) => part[0])
          .filter(Boolean)
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : undefined;

  return (
    <div className="w-full ">
      <div className="w-full flex items-center gap-3 px-4 sm:px-6 lg:px-8 flex-col sm:flex-row ">
        <div className="shrink-0">
          <Logo className="h-10 sm:h-18 w-auto" />
        </div>

        <nav className="flex-1">
          <div className="flex flex-wrap justify-center items-center gap-x-1 sm:gap-x-2 gap-y-2">
            <NavItem href={homeHref} active={isPathActive(pathname, homeHref)}>
              <HomeIcon className="size-4 sm:size-5" />
              <span>Home</span>
            </NavItem>

            <NavItem
              href={classesHref}
              active={isPathActive(pathname, classesHref)}
            >
              <MegaphoneIcon className="size-4 sm:size-5" />
              <span>Salas de Aula</span>
            </NavItem>

            <NavItem
              href={settingsHref}
              active={isPathActive(pathname, settingsHref)}
            >
              <Cog6ToothIcon className="size-4 sm:size-5" />
              <span>Configurações</span>
            </NavItem>
          </div>
        </nav>

        <div className="flex w-full sm:w-auto shrink-0 items-stretch justify-center sm:justify-end">
          <div className="flex w-full max-w-sm items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white shadow-sm backdrop-blur">
            <Avatar
              className="size-10 bg-yellow-400 text-zinc-900"
              alt={displayName}
              src={avatarUrl}
              initials={initials}
            />
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-semibold uppercase tracking-wide text-yellow-200">
                Perfil
              </span>
              <span className="block truncate text-sm font-medium">
                {displayName}
              </span>
              {displayEmail && (
                <span className="block truncate text-xs text-zinc-200">
                  {displayEmail}
                </span>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              plain
              className="border border-yellow-400/60 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:border-yellow-400 hover:bg-yellow-400 hover:text-zinc-900"
              onClick={() => signOut()}
              disabled={isLoading}
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <StackedLayout navbar={<HorizontalNavbar />}>{children}</StackedLayout>
  );
}
