import {
  IEntityPermissionReadDto,
  IModelReadDto,
  IRoleReadDto,
  IUserReadDto,
  PermissionEnum,
  EntityStaticPermissionEnum,
  SuperRoleEnum,
} from "roottypes";
import { useAppSelector } from "../store/hooks";

const useHasPermission = () => {
  const currentUser: IUserReadDto = useAppSelector((state) => state.user.user);

  const hasPermission = (
    permission: PermissionEnum,
    ownStaticPermission?: PermissionEnum,
    owners?: (string | IUserReadDto | undefined)[]
  ): boolean => {
    if (!currentUser) return false;

    if (currentUser.superRole === SuperRoleEnum.SuperAdmin) return true;

    const permissionGranted = Boolean(
      currentUser.role &&
        (currentUser.role as IRoleReadDto).permissions &&
        (currentUser.role as IRoleReadDto)?.permissions.indexOf(permission) > -1
    );

    if (!permissionGranted) {
      if (owners && owners.length > 0 && ownStaticPermission) {
        const isOwner: boolean = owners.every(
          (owner) =>
            (typeof owner === "string" ? owner : owner?._id.toString()) ===
            currentUser._id
        );
        if (isOwner) {
          return hasPermission(ownStaticPermission);
        }
        return false;
      }
      if (ownStaticPermission && (!owners || owners.length === 0)) {
        return hasPermission(ownStaticPermission);
      }
      return false;
    }

    return permissionGranted;
  };

  const hasEntityPermission = (
    staticPermission: EntityStaticPermissionEnum,
    modelId: string,

    ownStaticPermission?: EntityStaticPermissionEnum,
    owners?: (string | IUserReadDto | undefined)[]
  ): boolean => {
    const hasPermission: boolean =
      currentUser.superRole === SuperRoleEnum.SuperAdmin ||
      (
        (currentUser.role as IRoleReadDto)?.entityPermissions as
          | IEntityPermissionReadDto[]
          | undefined
      )
        ?.find(
          (ePermission) =>
            (ePermission?.model as IModelReadDto)?._id === modelId
        )
        ?.permissions.indexOf(staticPermission) !== -1;

    if (!hasPermission) {
      if (owners && owners.length > 0 && ownStaticPermission) {
        const isOwner: boolean = owners.every(
          (owner) =>
            (typeof owner === "string" ? owner : owner?._id.toString()) ===
            currentUser._id
        );
        if (isOwner) {
          return hasEntityPermission(ownStaticPermission, modelId);
        }
        return false;
      }
      if (ownStaticPermission && (!owners || owners.length === 0)) {
        return hasEntityPermission(ownStaticPermission, modelId);
      }
      return false;
    }

    return hasPermission;
  };

  return { hasPermission, hasEntityPermission };
};

export default useHasPermission;
