"use client";

import { Schools } from "./_";
import { SchoolsProvider } from "./_/contexts/schools.context";

const SchoolsPage = () => {
  return (
    <SchoolsProvider>
      <Schools />
    </SchoolsProvider>
  );
};

export default SchoolsPage;
