import { RoleEnum } from "@/graphql/__generated__/documents";
import getRoutes from "@/routes";
import {
  BeakerIcon,
  BuildingLibraryIcon,
  CreditCardIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { GoCpu, GoGitMerge } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiCarouselView, RiRobot2Line } from "react-icons/ri";

export const sidebarItems = [
  {
    label: getRoutes().users.name,
    icon: LuUsers,
    href: getRoutes().users.path(),
    roles: [RoleEnum.Admin],
    isCurrent: (pathname: string) =>
      pathname.includes(getRoutes().users.path()),
  },

  {
    label: getRoutes().plans.name,
    icon: CreditCardIcon,
    href: getRoutes().plans.path(),
    roles: [RoleEnum.Admin],
    isCurrent: (pathname: string) =>
      pathname.includes(getRoutes().plans.path()),
  },

  {
    label: getRoutes().models.name,
    icon: GoCpu,
    href: getRoutes().models.path(),
    roles: [RoleEnum.Admin],
    isCurrent: (pathname: string) =>
      pathname.includes(getRoutes().models.path()),
  },

  {
    label: getRoutes().iaAgents.name,
    icon: RiRobot2Line,
    href: getRoutes().iaAgents.path(),
    roles: [RoleEnum.Admin],
    isCurrent: (pathname: string) =>
      pathname.includes(getRoutes().iaAgents.path()),
  },
  {
    label: getRoutes().banners.name,
    icon: RiCarouselView,
    href: getRoutes().banners.path(),
    roles: [RoleEnum.Admin],
    isCurrent: (pathname: string) =>
      pathname.includes(getRoutes().banners.path()),
  },


  {
    label: getRoutes().iaAgentFlows.name,
    icon: GoGitMerge,
    href: getRoutes().iaAgentFlows.path(),
    roles: [RoleEnum.Admin],
    isCurrent: (pathname: string) =>
      pathname.includes(getRoutes().iaAgentFlows.path()),
  },

  {
    label: getRoutes().playground.name,
    icon: BeakerIcon,
    href: getRoutes().playground.path(),
    roles: [RoleEnum.Admin],
    isCurrent: (pathname: string) =>
      pathname.includes(getRoutes().playground.path()),
  },

  {
    label: getRoutes().files.name,
    icon: DocumentTextIcon,
    href: getRoutes().files.path(),
    roles: [RoleEnum.Admin],
    isCurrent: (pathname: string) =>
      pathname.includes(getRoutes().files.path()),
  },

  {
    label: getRoutes().knowledgeBases.name,
    icon: BuildingLibraryIcon,
    href: getRoutes().knowledgeBases.path(),
    roles: [RoleEnum.Admin],
    isCurrent: (pathname: string) =>
      pathname.includes(getRoutes().knowledgeBases.path()),
  },

  {
    label: getRoutes().cx.name,
    icon: MdOutlineSupportAgent,
    href: getRoutes().cx.path(),
    roles: [RoleEnum.Admin],
    isCurrent: (pathname: string) => pathname.includes(getRoutes().cx.path()),
  },
];
