import React from "react";
import { FaDirections } from "react-icons/fa";
import { Link } from "react-router-dom";

import Elements from "../../components/elements";
import UserEditor from "../../components/editors/userEditor";
import { Theme } from "../../config/theme";
import withWrapper from "../../hoc/wrapper";
import useDeleteUsers from "../../hooks/apiHooks/useDeleteUsers";
import useGetUsers from "../../hooks/apiHooks/useGetUsers";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";
import { IUser } from "../../store/slices/userSlice";

import useStyles from "./usersPage.styles";
import useSearchUsers from "../../hooks/apiHooks/useSearchUsers";
import withChat from "../../hoc/withChat";

interface IUsersPage {}

const UsersPage: React.FunctionComponent<IUsersPage> = (props: IUsersPage) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.profile
  );
  const { users, total } = useAppSelector((state) => state.user);

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getUsers, loading } = useGetUsers();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteUsers, loading: deleteLoading } = useDeleteUsers();
  const { handleSearchUsersPromise } = useSearchUsers();

  React.useEffect(() => {
    getUsers({
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
    <div className={styles.usersPageContainer}>
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
            render: (user: IUser) => getTranslatedText(user.role?.name),
          },
          {
            label: getTranslatedText(staticText?.visit),
            name: "",
            render: (user: IUser) => {
              return (
                <Link target="_blank" to={"/profile/" + user._id}>
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
      />
    </div>
  );
};

export default withWrapper(withChat(UsersPage), {
  withFooter: false,
  withSideMenu: true,
});
