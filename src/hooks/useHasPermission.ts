import { useAppSelector } from "../store/hooks";
import { Permission } from "../store/slices/roleSlice";
import { IUser, SuperRole } from "../store/slices/userSlice";

const useHasPermission = () => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;

    if (user.superRole === SuperRole.SuperAdmin) return true;

    return Boolean(
      user.role &&
        user.role.permissions &&
        user.role?.permissions.indexOf(permission) > -1
    );
  };

  return { hasPermission };
};

export default useHasPermission;
