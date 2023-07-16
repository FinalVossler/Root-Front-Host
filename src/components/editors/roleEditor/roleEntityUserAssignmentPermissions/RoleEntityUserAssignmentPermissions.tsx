import React from "react";

import { Theme } from "../../../../config/theme";
import useSearchRoles from "../../../../hooks/apiHooks/useSearchRoles";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import Checkbox from "../../../checkbox";
import SearchInput from "../../../searchInput";
import { IRole } from "../../../../store/slices/roleSlice";

import useStyles from "./RoleEntityUserAssignmentPermissions.styles";
import { MdDelete } from "react-icons/md";

interface IRoleEntityUserAssignmentPermissions {
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

const RoleEntityUserAssignmentPermissions: React.FunctionComponent<IRoleEntityUserAssignmentPermissions> =
  (props: IRoleEntityUserAssignmentPermissions) => {
    const theme: Theme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );
    const staticText = useAppSelector(
      (state) => state.websiteConfiguration.staticText?.roles
    );
    const roles: IRole[] = useAppSelector((state) => state.role.roles);

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
        otherRolesIds:
          props.entityUserAssignmentPermissionsByRole.otherRolesIds,
      };

      props.handleApplyUserAssignmentPermissions(
        newEntityUserAssignmentPermissionsByRole
      );
    };

    const handleAddRole = (role: IRole) => {
      const newEntityUserAssignmentPermissionsByRole: {
        // used to also add the current role that's just been added
        canAssignToUserFromSameRole: boolean;
        otherRolesIds: string[];
      } = {
        canAssignToUserFromSameRole:
          props.entityUserAssignmentPermissionsByRole
            .canAssignToUserFromSameRole,
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

    const handleRemoveRole = (role: IRole) => {
      const newEntityUserAssignmentPermissionsByRole: {
        // used to also add the current role that's just been added
        canAssignToUserFromSameRole: boolean;
        otherRolesIds: string[];
      } = {
        canAssignToUserFromSameRole:
          props.entityUserAssignmentPermissionsByRole
            .canAssignToUserFromSameRole,
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
      <div className={styles.roleEntityUserAssignmentPermissionsContainer}>
        <Checkbox
          checked={
            props.entityUserAssignmentPermissionsByRole
              .canAssignToUserFromSameRole
          }
          label={getTranslatedText(staticText?.canAssignToUserFromSameRole)}
          onChange={handleChangeCanAssignToUserFromSameRole}
        />
        <SearchInput
          getElementTitle={(el) => getTranslatedText(el.name)}
          searchPromise={handleSearchRolesPromise}
          label={getTranslatedText(staticText?.roles)}
          showSearchResult
          onElementClick={handleAddRole}
        />

        {props.entityUserAssignmentPermissionsByRole.otherRolesIds.length >
          0 && (
          <div className={styles.selectedRolesContainer}>
            {roles
              .filter(
                (role) =>
                  props.entityUserAssignmentPermissionsByRole.otherRolesIds.indexOf(
                    role._id.toString()
                  ) !== -1
              )
              .map((role: IRole, roleIndex: number) => {
                return (
                  <div key={roleIndex} className={styles.selectedRoleContainer}>
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
