import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ schoolId: string; courseId: string }>;
};

export default async function CourseLayout({ children, params }: LayoutProps) {
  await params;
  return <div className="space-y-8">{children}</div>;
}
