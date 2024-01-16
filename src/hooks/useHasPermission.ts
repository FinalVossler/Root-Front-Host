import {
  IEntityPermissionReadDto,
  IModelReadDto,
  IRoleReadDto,
  IUserReadDto,
  PermissionEnum,
  StaticPermissionEnum,
  SuperRoleEnum,
} from "roottypes";
import { useAppSelector } from "../store/hooks";

const useHasPermission = () => {
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  const hasPermission = (permission: PermissionEnum): boolean => {
    if (!user) return false;

    if (user.superRole === SuperRoleEnum.SuperAdmin) return true;

    return Boolean(
      user.role &&
        (user.role as IRoleReadDto).permissions &&
        (user.role as IRoleReadDto)?.permissions.indexOf(permission) > -1
    );
  };

  const hasEntityPermission = (
    staticPermission: StaticPermissionEnum,
    modelId: string
  ): boolean => {
    return (
      user.superRole === SuperRoleEnum.SuperAdmin ||
      (
        (user.role as IRoleReadDto)?.entityPermissions as
          | IEntityPermissionReadDto[]
          | undefined
      )
        ?.find(
          (ePermission) =>
            (ePermission?.model as IModelReadDto)?._id === modelId
        )
        ?.permissions.indexOf(staticPermission) !== -1
    );
  };

  return { hasPermission, hasEntityPermission };
};

export default useHasPermission;
