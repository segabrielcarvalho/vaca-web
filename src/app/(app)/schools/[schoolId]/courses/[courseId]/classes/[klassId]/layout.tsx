import { ReactNode } from "react";
import { ClassHeader } from "./_/components/class-header";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ schoolId: string; courseId: string; klassId: string }>;
};

export default async function KlassLayout({ children, params }: LayoutProps) {
  const { schoolId, courseId, klassId } = await params;

  return (
    <div className="space-y-10">
      <ClassHeader
        schoolId={schoolId}
        courseId={courseId}
        klassId={klassId}
      />
      <div className="space-y-8">{children}</div>
    </div>
  );
}
