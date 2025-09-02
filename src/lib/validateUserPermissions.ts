import type { User } from "../contexts/AuthContext";

type UserPermission = Partial<User>;

type ValidateUserPermissionsParams = {
  user: UserPermission;
  roles?: string[];
};

export function validateUserPermissions({
  user,
  roles,
}: ValidateUserPermissionsParams) {
  if (roles?.length) {
    const hasRole = roles.some((role) => user.role === role);
    if (!hasRole) return false;
  }

  return true;
}
