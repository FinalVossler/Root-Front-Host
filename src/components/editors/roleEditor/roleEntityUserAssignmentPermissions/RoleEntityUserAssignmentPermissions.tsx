import React from "react";
import { MdDelete } from "react-icons/md";

import { ITheme } from "../../../../config/theme";
import useSearchRoles from "../../../../hooks/apiHooks/useSearchRoles";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import Checkbox from "../../../checkbox";
import SearchInput from "../../../searchInput";

import useStyles from "./roleEntityUserAssignmentPermissions.styles";
import { IRoleReadDto } from "roottypes";

interface IRoleEntityUserAssignmentPermissionsProps {
  modelId?: string;
  entityUserAssignmentPermissionsByRole: {
    // used to also add the current role that's just been added
    canAssignToUserFromSameRole: boolean;
    otherRolesIds: string[];
  };
  handleApplyUserAssignmentPermissions: (userAssignmentPermissions: {
    // used to also add the current role that's just been added
    canAssignToUserFromSameRole: boolean;
    otherRolesIds: string[];
  }) => void;
}

const RoleEntityUserAssignmentPermissions: React.FunctionComponent<
  IRoleEntityUserAssignmentPermissionsProps
> = (props: IRoleEntityUserAssignmentPermissionsProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.roles
  );
  const roles: IRoleReadDto[] = useAppSelector((state) => state.role.roles);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { handleSearchRolesPromise } = useSearchRoles({
    setStoreAfterSearch: false,
  });

  const handleChangeCanAssignToUserFromSameRole = (
    canAssignToUserFromSameRole: boolean
  ) => {
    const newEntityUserAssignmentPermissionsByRole: {
      // used to also add the current role that's just been added
      canAssignToUserFromSameRole: boolean;
      otherRolesIds: string[];
    } = {
      canAssignToUserFromSameRole: canAssignToUserFromSameRole,
      otherRolesIds: props.entityUserAssignmentPermissionsByRole.otherRolesIds,
    };

    props.handleApplyUserAssignmentPermissions(
      newEntityUserAssignmentPermissionsByRole
    );
  };

  const handleAddRole = (role: IRoleReadDto) => {
    const newEntityUserAssignmentPermissionsByRole: {
      // used to also add the current role that's just been added
      canAssignToUserFromSameRole: boolean;
      otherRolesIds: string[];
    } = {
      canAssignToUserFromSameRole:
        props.entityUserAssignmentPermissionsByRole.canAssignToUserFromSameRole,
      otherRolesIds:
        props.entityUserAssignmentPermissionsByRole.otherRolesIds.indexOf(
          role._id.toString()
        ) === -1
          ? [
              ...props.entityUserAssignmentPermissionsByRole.otherRolesIds,
              role._id,
            ]
          : props.entityUserAssignmentPermissionsByRole.otherRolesIds,
    };

    props.handleApplyUserAssignmentPermissions(
      newEntityUserAssignmentPermissionsByRole
    );
  };

  const handleRemoveRole = (role: IRoleReadDto) => {
    const newEntityUserAssignmentPermissionsByRole: {
      // used to also add the current role that's just been added
      canAssignToUserFromSameRole: boolean;
      otherRolesIds: string[];
    } = {
      canAssignToUserFromSameRole:
        props.entityUserAssignmentPermissionsByRole.canAssignToUserFromSameRole,
      otherRolesIds:
        props.entityUserAssignmentPermissionsByRole.otherRolesIds.filter(
          (id) => id !== role._id.toString()
        ),
    };

    props.handleApplyUserAssignmentPermissions(
      newEntityUserAssignmentPermissionsByRole
    );
  };

  return (
    <div
      className={styles.roleEntityUserAssignmentPermissionsContainer}
      data-cy={"roleEntityUserAssignmentPermissionsForModel" + props.modelId}
    >
      <Checkbox
        checked={
          props.entityUserAssignmentPermissionsByRole
            .canAssignToUserFromSameRole
        }
        label={getTranslatedText(staticText?.canAssignToUserFromSameRole)}
        onChange={handleChangeCanAssignToUserFromSameRole}
        inputDataCy={
          "roleEntityUserAssignmentPermissionsCanAssignToUserFromSameRoleCheckboxForModel" +
          props.modelId?.toString()
        }
      />
      <SearchInput
        getElementTitle={(el) => getTranslatedText(el.name)}
        searchPromise={handleSearchRolesPromise}
        label={getTranslatedText(staticText?.roles)}
        showSearchResult
        onElementClick={handleAddRole}
        inputDataCy={
          "roleEntityUserAssignmentPermissionsSearchRoleInputForModel" +
          props.modelId?.toString()
        }
      />

      {props.entityUserAssignmentPermissionsByRole.otherRolesIds.length > 0 && (
        <div className={styles.selectedRolesContainer}>
          {roles
            .filter(
              (role) =>
                props.entityUserAssignmentPermissionsByRole.otherRolesIds.indexOf(
                  role._id.toString()
                ) !== -1
            )
            .map((role: IRoleReadDto, roleIndex: number) => {
              return (
                <div
                  key={roleIndex}
                  className={styles.selectedRoleContainer}
                  data-cy={
                    "selectedRole" +
                    role._id.toString() +
                    "ForEntityUserAssignmentForModel" +
                    props.modelId
                  }
                >
                  <MdDelete
                    onClick={() => handleRemoveRole(role)}
                    className={styles.deleteRoleButton}
                  />
                  <span className={styles.roleName}>
                    {getTranslatedText(role.name)}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default RoleEntityUserAssignmentPermissions;
