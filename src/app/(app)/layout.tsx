import { ApplicationLayout } from "@/components/application-layout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApplicationLayout>{children}</ApplicationLayout>;
}
