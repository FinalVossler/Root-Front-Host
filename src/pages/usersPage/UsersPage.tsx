import React from "react";
import { FaDirections } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

import Elements from "../../components/elements";
import UserEditor from "../../components/editors/userEditor";
import { ITheme } from "../../config/theme";
import useDeleteUsers from "../../hooks/apiHooks/useDeleteUsers";
import useGetUsers from "../../hooks/apiHooks/useGetUsers";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IUser, SuperRole, userSlice } from "../../store/slices/userSlice";

import useStyles from "./usersPage.styles";
import useSearchUsers from "../../hooks/apiHooks/useSearchUsers";
import useHasPermission from "../../hooks/useHasPermission";
import { Permission } from "../../store/slices/roleSlice";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { LocalStorageConfNameEnum } from "../../utils/localStorage";

interface IUsersPageProps {}

const UsersPage: React.FunctionComponent<IUsersPageProps> = (
  props: IUsersPageProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.profile
  );
  const { users, total } = useAppSelector((state) => state.user);
  const searchResult = useAppSelector((state) => state.user.searchedUsers);

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);
  const dispatch = useAppDispatch();

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { roleId } = useParams();
  const { getUsers, loading } = useGetUsers();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteUsers, loading: deleteLoading } = useDeleteUsers();
  const { handleSearchUsersPromise } = useSearchUsers();
  const { hasPermission } = useHasPermission();

  React.useEffect(() => {
    getUsers({
      paginationCommand: {
        limit,
        page,
      },
      roleId,
    });
  }, [page, roleId]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSetSearchResult = React.useCallback(
    (res: PaginationResponse<IUser>) => {
      dispatch(userSlice.actions.setSearchedUsers(res));
    },
    []
  );

  if (!isLoggedIn) return null;

  if (!hasPermission(Permission.ReadUser)) return null;

  return (
    <div className={styles.usersPageContainer} data-cy="usersPage">
      <Elements
        Editor={({ element, ...props }) => (
          <UserEditor {...props} user={element as IUser} />
        )}
        columns={[
          {
            label: getTranslatedText(staticText?.firstName),
            name: "firstName",
          },
          {
            label: getTranslatedText(staticText?.lastName),
            name: "lastName",
          },
          {
            label: getTranslatedText(staticText?.email),
            name: "email",
          },
          {
            label: getTranslatedText(staticText?.role),
            name: "",
            render: (user: IUser) =>
              (user.superRole === SuperRole.SuperAdmin
                ? user.superRole +
                  (Boolean(getTranslatedText(user.role?.name)) ? " + " : "")
                : "") + getTranslatedText(user.role?.name),
          },
          {
            label: getTranslatedText(staticText?.visit),
            name: "",
            render: (user: IUser) => {
              return (
                <Link
                  rel="noreferrer"
                  target="_blank"
                  to={"/profile/" + user._id}
                >
                  <FaDirections />
                </Link>
              );
            },
          },
        ]}
        elements={users}
        total={total}
        limit={limit}
        page={page}
        loading={loading}
        deletePromise={deleteUsers}
        deleteLoading={deleteLoading}
        getElementName={(user: any) =>
          getTranslatedText(user.firstName + " " + user.lastName)
        }
        onPageChange={handlePageChange}
        searchPromise={handleSearchUsersPromise}
        canUpdate={hasPermission(Permission.UpdatePage)}
        canCreate={hasPermission(Permission.CreatePage)}
        canDelete={hasPermission(Permission.DeletePage)}
        searchResult={searchResult}
        setSearchResult={handleSetSearchResult}
        elementsLocalStorageConfName={LocalStorageConfNameEnum.USERS}
        tableDataCy="usersTable"
      />
    </div>
  );
};

export default React.memo(UsersPage);
