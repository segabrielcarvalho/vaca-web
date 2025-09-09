import { RoleEnum } from "@/graphql/__generated__/documents";
import getRoutes from "@/routes";
import { LuUsers } from "react-icons/lu";

export const sidebarItems = [
  {
    label: getRoutes().users.name,
    icon: LuUsers,
    href: getRoutes().users.path(),
    roles: [RoleEnum.Admin],
    isCurrent: (pathname: string) =>
      pathname.includes(getRoutes().users.path()),
  },
];
