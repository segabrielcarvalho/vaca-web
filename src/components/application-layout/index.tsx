"use client";

import { Avatar } from "@/components/avatar";
import { Dropdown } from "@/components/dropdown";
import {
  Cog6ToothIcon,
  HomeIcon,
  MegaphoneIcon,
} from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPlus, FaSchool } from "react-icons/fa";
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

  return (
    <div className="w-full ">
      <div className="w-full flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-2 flex-col sm:flex-row ">
        <div className="shrink-0">
          <Logo className="h-10 sm:h-14 w-auto" />
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

        <div className="flex shrink-0 items-center gap-3">
          <Dropdown
            anchor="bottom end"
            button={
              <button className="cursor-pointer inline-flex items-center gap-3 rounded-lg px-2 py-1.5 text-white transition hover:border-yellow-200 hover:bg-yellow-50 hover:text-zinc-900">
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
  return (
    <StackedLayout navbar={<HorizontalNavbar />}>{children}</StackedLayout>
  );
}
