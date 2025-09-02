import { useCan } from "@/hooks/useCan";
import type { ReactNode } from "react";

export type Roles = "admin" | "user" | "mentee";
interface ICanProps {
  children: ReactNode;
  roles?: Roles[];
}

const Can = ({ children, roles }: ICanProps) => {
  const can = useCan({ roles });

  if (can) return <>{children}</>;

  return null;
};

export default Can;
