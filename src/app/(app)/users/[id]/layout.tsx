"use client";

import UserDetailsLayoutComponent from "./_/components/user-details-layout";
import { UserDetailsProvider } from "./_/context/user-details.context";

export default function UserDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserDetailsProvider>
      <UserDetailsLayoutComponent>{children}</UserDetailsLayoutComponent>
    </UserDetailsProvider>
  );
}
