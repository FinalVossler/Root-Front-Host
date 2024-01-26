import React from "react";

import RoleEditor from "../../components/editors/roleEditor";
import Elements from "../../components/elements";
import { ITheme } from "../../config/theme";
import useDeleteRoles from "../../hooks/apiHooks/useDeleteRoles";
import useGetRoles from "../../hooks/apiHooks/useGetRoles";
import useSearchRoles from "../../hooks/apiHooks/useSearchRoles";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useHasPermission from "../../hooks/useHasPermission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { roleSlice } from "../../store/slices/roleSlice";
import { LocalStorageConfNameEnum } from "../../utils/localStorage";

import useStyles from "./rolesPage.styles";
import { IPaginationResponse, IRoleReadDto, PermissionEnum } from "roottypes";
import { EditorTypeEnum, editorSlice } from "../../store/slices/editorSlice";

interface IRolesPageProps {}

const RolesPage: React.FunctionComponent<IRolesPageProps> = (
  props: IRolesPageProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.roles
  );
  const { roles, total } = useAppSelector((state) => state.role);
  const searchResult = useAppSelector((state) => state.role.searchedRoles);

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const { getRoles, loading } = useGetRoles();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteRoles, loading: deleteLoading } = useDeleteRoles();
  const { handleSearchRolesPromise } = useSearchRoles();
  const { hasPermission } = useHasPermission();

  React.useEffect(() => {
    getRoles({
      paginationCommand: {
        limit,
        page,
      },
    });
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSetSearchResult = React.useCallback(
    (res: IPaginationResponse<IRoleReadDto>) => {
      dispatch(roleSlice.actions.setSearchedRoles(res));
    },
    []
  );

  if (!isLoggedIn) return null;

  if (!hasPermission(PermissionEnum.ReadRole)) return null;

  return (
    <div className={styles.rolesPageContainer} data-cy="rolesPage">
      <Elements
        handleOpenEditor={(element) =>
          dispatch(
            editorSlice.actions.addEditor({
              element,
              editorType: EditorTypeEnum.Role,
            })
          )
        }
        columns={[
          {
            label: getTranslatedText(staticText?.namePlaceholder),
            name: "name",
          },
        ]}
        elements={roles}
        total={total}
        limit={limit}
        page={page}
        loading={loading}
        deletePromise={deleteRoles}
        deleteLoading={deleteLoading}
        getElementName={(role: any) => getTranslatedText(role.name)}
        onPageChange={handlePageChange}
        searchPromise={handleSearchRolesPromise}
        canCreate={hasPermission(PermissionEnum.CreateRole)}
        canUpdate={hasPermission(PermissionEnum.UpdateRole)}
        canDelete={hasPermission(PermissionEnum.DeleteRole)}
        searchResult={searchResult}
        setSearchResult={handleSetSearchResult}
        elementsLocalStorageConfName={LocalStorageConfNameEnum.ROLES}
        tableDataCy="rolesTable"
      />
    </div>
  );
};

export default React.memo(RolesPage);
