import { ApplicationLayout } from "@/components/application-layout";
import PrivateRoute from "../../components/private-route";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApplicationLayout>
      <PrivateRoute>{children}</PrivateRoute>
    </ApplicationLayout>
  );
}
