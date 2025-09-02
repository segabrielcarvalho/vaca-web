import { useAuthContext } from "../contexts/AuthContext";
import { validateUserPermissions } from "../lib/validateUserPermissions";

type UseCamParams = {
  roles?: string[];
};
export function useCan({ roles }: UseCamParams) {
  const { user } = useAuthContext();

  if (!user) return false;

  const userHasValidPermissions = validateUserPermissions({
    user,
    roles,
  });

  return userHasValidPermissions;
}
