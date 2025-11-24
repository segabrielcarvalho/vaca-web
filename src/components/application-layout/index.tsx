"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import {
  BuildingOffice2Icon,
  ChartPieIcon,
  Cog6ToothIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import type { SVGProps } from "react";
import getRoutes from "../../routes";
import { StackedLayout } from "../stacked-layout";

export type NavigationItem = {
  href: string;
  label: string;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const routes = getRoutes();
  const { user, signOut, isLoading } = useAuthContext();

  const navItems: NavigationItem[] = [
    { href: routes.home.path(), label: "Home", Icon: HomeIcon },
    { href: routes.schools.path(), label: "Escolas", Icon: BuildingOffice2Icon },
    { href: routes.reports.path(), label: "Relatórios", Icon: ChartPieIcon },
    { href: routes.settings.path(), label: "Configurações", Icon: Cog6ToothIcon },
  ];

  const displayName = user?.name || "Usuário";

  return (
    <StackedLayout
      navItems={navItems}
      user={{
        name: displayName,
        email: user?.email || "",
        avatarUrl: user?.avatarUrl || undefined,
      }}
      onSignOut={() => void signOut()}
      signingOut={isLoading}
    >
      {children}
    </StackedLayout>
  );
}
