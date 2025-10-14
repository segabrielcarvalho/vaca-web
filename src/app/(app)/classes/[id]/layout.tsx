import { ReactNode } from "react";
import { DetailHeader } from "./_/components/detail-header";

type LayoutProps = {
  children: ReactNode;
  params: { id: string };
};

export default function ClassDetailLayout({
  children,
  params,
}: LayoutProps) {
  return (
    <div className="space-y-10">
      <DetailHeader classId={params.id} />
      <div className="space-y-8">{children}</div>
    </div>
  );
}
