import SectionHeader from "@/components/section-header";
import CreateSchool from "./components/create-school";
import { SchoolFilters } from "./components/school-filters";
import { SchoolTable } from "./components/school-table";

export const Schools = () => {
  return (
    <div>
      <SectionHeader
        title="Escolas"
        description="Gerencie as escolas e navegue pelas turmas de cada unidade."
        actions={[
          <SchoolFilters key="school-filters" />,
          <CreateSchool key="create-school" />,
        ]}
      />

      <SchoolTable />
    </div>
  );
};
