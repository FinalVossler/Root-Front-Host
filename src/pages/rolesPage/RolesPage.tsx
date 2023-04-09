import React from "react";

import RoleEditor from "../../components/editors/roleEditor";
import Elements from "../../components/elements";
import { Theme } from "../../config/theme";
import withChat from "../../hoc/withChat";
import withWrapper from "../../hoc/wrapper";
import useDeleteRoles from "../../hooks/apiHooks/useDeleteRoles";
import useGetRoles from "../../hooks/apiHooks/useGetRoles";
import useSearchRoles from "../../hooks/apiHooks/useSearchRoles";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";
import { IRole } from "../../store/slices/roleSlice";

import useStyles from "./rolesPage.styles";

interface IRolesPage {}

const RolesPage: React.FunctionComponent<IRolesPage> = (props: IRolesPage) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.roles
  );
  const { roles, total } = useAppSelector((state) => state.role);

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getRoles, loading } = useGetRoles();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteRoles, loading: deleteLoading } = useDeleteRoles();
  const { handleSearchRolesPromise } = useSearchRoles();

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

  if (!isLoggedIn) return null;

  return (
    <div className={styles.rolesPageContainer}>
      <Elements
        Editor={({ element, ...props }) => (
          <RoleEditor {...props} role={element as IRole} />
        )}
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
      />
    </div>
  );
};

export default withWrapper(withChat(React.memo(RolesPage)), {
  withFooter: false,
  withSideMenu: true,
});
