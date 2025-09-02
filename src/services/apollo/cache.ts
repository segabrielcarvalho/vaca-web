import { offsetLimitPagination } from "@apollo/client/utilities";

export const typePolicies = {
  Query: { fields: { notifications: offsetLimitPagination() } },
};
