"use client";

import { Avatar } from "@/components/avatar";
import { Dropdown } from "@/components/dropdown";
import {
  Cog6ToothIcon,
  HomeIcon,
  MegaphoneIcon,
  Square2StackIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaPlus, FaSchool } from "react-icons/fa";
import { useAuthContext } from "../../contexts/AuthContext";
import getRoutes from "../../routes";
import { Logo } from "../logo";
import { StackedLayout } from "../stacked-layout";

const norm = (p: string) => p.split("?")[0].replace(/\/+$/, "") || "/";
const pickActiveHref = (pathname: string, hrefs: string[]) => {
  const a = norm(pathname);
  const list = hrefs.map(norm).sort((x, y) => y.length - x.length);
  return list.find((b) => a === b || a.startsWith(b + "/")) || "";
};

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
      className={[
        "inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition",
        active
          ? "bg-yellow-500 text-black dark:bg-yellow-500 dark:text-black"
          : "text-zinc-700 hover:bg-yellow-500 hover:text-black dark:text-zinc-300 dark:hover:bg-yellow-500 dark:hover:text-black",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function HorizontalNavbar() {
  const pathname = usePathname() || "";
  const allHrefs = useMemo(
    () => [
      getRoutes().home.path(),
      "/events",
      "/orders",
      "/broadcasts",
      "/settings",
      "/support",
      "/changelog",
    ],
    []
  );
  const activeHref = useMemo(
    () => pickActiveHref(pathname, allHrefs),
    [pathname, allHrefs]
  );

  return (
    <div className="w-full">
      <div className="w-full items-center gap-4 px-4 sm:px-6 lg:px-8 flex flex-row py-2 justify-between">
        <div className="justify-self-start shrink-0">
          <Logo className="h-16 w-auto" />
        </div>

        <nav className="justify-self-center">
          <div className="flex flex-nowrap items-center gap-1 whitespace-nowrap">
            <NavItem href="/home" active={norm("/home") === activeHref}>
              <HomeIcon className="size-5" />
              <span>Home</span>
            </NavItem>

            <NavItem
              href="/broadcasts"
              active={norm("/broadcasts") === activeHref}
            >
              <MegaphoneIcon className="size-5" />
              <span>Sala de Aula</span>
            </NavItem>

            <NavItem href="/events" active={norm("/events") === activeHref}>
              <Square2StackIcon className="size-5" />
              <span>Estudantes</span>
            </NavItem>
            <NavItem href="/orders" active={norm("/orders") === activeHref}>
              <TicketIcon className="size-5" />
              <span>Provas</span>
            </NavItem>

            <NavItem href="/settings" active={norm("/settings") === activeHref}>
              <Cog6ToothIcon className="size-5" />
              <span>Configurações</span>
            </NavItem>
          </div>
        </nav>

        <div className="justify-self-end shrink-0">
          <Dropdown
            anchor="bottom end"
            button={
              <button className="inline-flex items-center gap-3 rounded-lg px-2 py-1.5 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:text-white dark:hover:bg-zinc-700/50">
                <Avatar
                  className="size-8"
                  alt="UniEvangélica"
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />
                <span className="hidden sm:block text-sm font-medium">
                  UniEvangélica
                </span>
                <ChevronDownIcon className="size-4" />
              </button>
            }
            items={[
              {
                href: "/my-profile",
                icon: <FaSchool />,
                label: "Colégio Delta - Anápolis",
              },
              {
                href: "/settings",
                icon: <FaSchool />,
                label: "CPMG Senador Onefre Quinan",
              },
              "divider",
              { href: "/new-school", icon: <FaPlus />, label: "Nova Escola" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  return (
    <StackedLayout navbar={<HorizontalNavbar />}>{children}</StackedLayout>
  );
}
