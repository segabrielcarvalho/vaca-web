import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ schoolId: string }>;
};

export default async function SchoolLayout({ children, params }: LayoutProps) {
  await params;
  return <div className="space-y-8">{children}</div>;
}
