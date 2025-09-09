"use client";

import { Avatar } from "@/components/avatar";
import {
  Dropdown,
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
  SidebarSpacer,
} from "@/components/sidebar";
import { SidebarLayout } from "@/components/sidebar-layout";
import {
  Cog6ToothIcon,
  HomeIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import getRoutes from "../../routes";
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
            <Dropdown
              anchor="bottom end"
              button={
                <SidebarItem>
                  <Avatar src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                  <SidebarLabel>UniEvangelica</SidebarLabel>
                  <ChevronDownIcon className="ml-auto size-4" />
                </SidebarItem>
              }
              items={[
                {
                  href: "/teams/1",
                  className: "items-center flex gap-3 flex-row justify-center",
                  icon: (
                    <Avatar
                      initials="UNI"
                      className="bg-purple-500 text-white size-6"
                    />
                  ),
                  label: "UniEvangelica",
                },
                {
                  href: "/teams/2",
                  className: "items-center flex gap-3 flex-row justify-center",
                  icon: (
                    <div>
                      <Avatar
                        initials="CC"
                        className="bg-purple-500 text-white size-6"
                      />
                    </div>
                  ),
                  label: "Colegio Colto",
                },
                "divider",
                {
                  href: "/teams/create",
                  icon: <PlusIcon />,
                  label: "Nova Escola",
                },
              ]}
              className="w-full"
            />
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem current={norm("/home") === activeHref} href="/home">
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/events">
                <Square2StackIcon />
                <SidebarLabel>Events</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/orders">
                <TicketIcon />
                <SidebarLabel>Orders</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/broadcasts">
                <MegaphoneIcon />
                <SidebarLabel>Broadcasts</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/settings">
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
            <SidebarSpacer />
            <SidebarSection>
              <SidebarItem href="/support">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/changelog">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
          <SidebarFooter>
            <Dropdown
              anchor="top start"
              button={
                <SidebarItem className="flex min-w-0 items-center gap-3">
                  <div>
                    <Avatar
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=500&h=500&q=80"
                      square
                      className="size-10"
                      alt="Erica"
                    />
                  </div>

                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-100 ">
                      Erica
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500">
                      erica@example.com
                    </span>
                  </span>
                  <ChevronUpIcon className="ml-auto size-4" />
                </SidebarItem>
              }
              items={[
                {
                  href: "/my-profile",
                  icon: <UserIcon />,
                  label: "My profile",
                },
                {
                  href: "/settings",
                  icon: <Cog8ToothIcon />,
                  label: "Settings",
                },
                "divider",
                {
                  href: "/privacy-policy",
                  icon: <ShieldCheckIcon />,
                  label: "Privacy policy",
                },
                {
                  href: "/share-feedback",
                  icon: <LightBulbIcon />,
                  label: "Share feedback",
                },
                "divider",
                {
                  href: "/logout",
                  icon: <ArrowRightStartOnRectangleIcon />,
                  label: "Sign out",
                },
              ]}
              className="w-full"
            />
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
