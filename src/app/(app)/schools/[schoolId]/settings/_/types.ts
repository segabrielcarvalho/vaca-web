export type DetailsFormValues = {
  name: string;
  description?: string | null;
  isActive: boolean;
};

export type DirectorOptionType = {
  id: string;
  name?: string | null;
  email: string;
  isActive: boolean;
};
