"use client";

import { Avatar } from "@/components/avatar";
import {
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownRoot,
} from "@/components/dropdown";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/components/sidebar";
import { SidebarLayout } from "@/components/sidebar-layout";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import getRoutes from "../../routes";
import { Divider } from "../divider";
import { Logo } from "../logo";
import { sidebarItems } from "./constants";

const norm = (p: string) => p.split("?")[0].replace(/\/+$/, "") || "/";
const pickActiveHref = (pathname: string, hrefs: string[]) => {
  const a = norm(pathname);
  const list = hrefs.map(norm).sort((x, y) => y.length - x.length);
  return list.find((b) => a === b || a.startsWith(b + "/")) || "";
};

function AccountDropdown({ anchor }: { anchor: "top start" | "bottom end" }) {
  const { signOut } = useAuthContext();
  return (
    <DropdownMenu className="min-w-56 sm:min-w-64" anchor={anchor}>
      <DropdownItem onClick={() => signOut()}>
        <ArrowRightStartOnRectangleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        <DropdownLabel>Sair</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const { user } = useAuthContext();

  const allHrefs = useMemo(
    () => [getRoutes().home.path(), ...sidebarItems.map((i) => i.href)],
    []
  );
  const activeHref = useMemo(
    () => pickActiveHref(pathname, allHrefs),
    [pathname, allHrefs]
  );

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <DropdownRoot>
              <DropdownButton as={NavbarItem}>
                <Avatar
                  src={user?.avatarUrl}
                  className="size-6 sm:size-8 md:size-9"
                  square
                />
              </DropdownButton>
              <AccountDropdown anchor="bottom end" />
            </DropdownRoot>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <div className="flex justify-center w-full">
              <Logo width={80} height={40} />
            </div>
          </SidebarHeader>

          <SidebarBody className="mx-2 sm:mx-3 lg:mx-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            <div className="mx-2 sm:mx-3 lg:mx-5">
              <SidebarItem
                href={getRoutes().home.path()}
                key={getRoutes().home.path()}
                current={norm(getRoutes().home.path()) === activeHref}
              >
                <InboxIcon data-slot="icon" className="h-5 w-5" />
                <SidebarLabel className="lg:inline">Home</SidebarLabel>
              </SidebarItem>
            </div>

            <Divider className="my-5 border-0 border-white dark:border-white" />

            <SidebarSection className="mx-2 sm:mx-3 lg:mx-5">
              {sidebarItems.map(({ href, icon: Icon, label }) => (
                <SidebarItem
                  href={href}
                  key={href}
                  current={norm(href) === activeHref}
                >
                  <Icon data-slot="icon" className="h-5 w-5" />
                  <SidebarLabel className="lg:inline">{label}</SidebarLabel>
                </SidebarItem>
              ))}
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="hidden lg:block mx-4">
            <Divider className="my-5 border-0 border-white dark:border-white" />
            <DropdownRoot>
              <DropdownButton
                as="div"
                className="flex w-full items-center justify-between focus:outline-none cursor-pointer px-4 lg:px-5"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar
                    src={user?.avatarUrl}
                    className="size-8 sm:size-9 md:size-10"
                    square
                    alt=""
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {user?.name}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {user?.email}
                    </span>
                  </span>
                </span>
                <ChevronDownIcon className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-500 dark:text-zinc-400" />
              </DropdownButton>
              <AccountDropdown anchor="top start" />
            </DropdownRoot>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
