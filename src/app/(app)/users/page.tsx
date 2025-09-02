"use client";
import { Users } from "./_";
import { UserProvider } from "./_/contexts/users.context";

const UsersPage = () => {
  return (
    <UserProvider>
      <Users />
    </UserProvider>
  );
};

export default UsersPage;
