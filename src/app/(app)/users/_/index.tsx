import SectionHeader from "@/components/section-header";
import CreateUser from "./components/create-user";
import { UserFilters } from "./components/user-filters";
import { UserTable } from "./components/user-table";

export const Users = () => {
  return (
    <div>
      <SectionHeader
        title="Usuários"
        description="Gerencie os Usuários disponíveis."
        actions={[
          <UserFilters key="user-filters" />,
          <CreateUser key="create-user-button" />,
        ]}
      />

      <UserTable />
    </div>
  );
};
