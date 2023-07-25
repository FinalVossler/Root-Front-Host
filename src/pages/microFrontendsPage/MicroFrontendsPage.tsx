import React from "react";

import MicroFrontendEditor from "../../components/editors/microFrontendEditor";
import Elements from "../../components/elements";
import { Theme } from "../../config/theme";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import withChat from "../../hoc/withChat";
import withWrapper from "../../hoc/wrapper";
import useGetMicroFrontends from "../../hooks/apiHooks/useGetMicroFrontends";
import useSearchMicroFrontends from "../../hooks/apiHooks/useSearchMicroFrontends";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useHasPermission from "../../hooks/useHasPermission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  microFrontendSlice,
  IMicroFrontend,
} from "../../store/slices/microFrontendSlice";
import { Permission } from "../../store/slices/roleSlice";

import useStyles from "./microFrontendsPage.styles";
import { LocalStorageConfNameEnum } from "../../utils/localStorage";
import useDeleteMicroFrontends from "../../hooks/apiHooks/useDeleteMicroFrontends";

interface IMicroFrontendsPage {}

const MicroFrontendsPage: React.FunctionComponent<IMicroFrontendsPage> = (
  props: IMicroFrontendsPage
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.microFrontends
  );
  const { microFrontends, total } = useAppSelector(
    (state) => state.microFrontend
  );
  const searchResult = useAppSelector(
    (state) => state.microFrontend.searchedMicroFrontends
  );

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const { getMicroFrontends, loading } = useGetMicroFrontends();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteMicroFrontends, loading: deleteLoading } =
    useDeleteMicroFrontends();
  const { hasPermission } = useHasPermission();
  const { handleSearchMicroFrontendsPromise } = useSearchMicroFrontends();

  React.useEffect(() => {
    handleFetchElements();
  }, [page]);

  const handleFetchElements = () => {
    getMicroFrontends({
      paginationCommand: {
        limit,
        page,
      },
    });
  };

  const handleCopyFinished = () => {
    if (page === 1) {
      handleFetchElements();
    } else {
      setPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSetSearchResult = React.useCallback(
    (res: PaginationResponse<IMicroFrontend>) => {
      dispatch(microFrontendSlice.actions.setSearchedMicroFrontends(res));
    },
    []
  );

  if (!isLoggedIn) return null;

  if (!hasPermission(Permission.ReadField)) return null;

  return (
    <div className={styles.microFrontendsPageContainer}>
      <Elements
        Editor={({ element, ...props }) => (
          <MicroFrontendEditor
            {...props}
            microFrontend={element as IMicroFrontend}
          />
        )}
        columns={[
          {
            label: getTranslatedText(staticText?.name),
            name: "name",
          },
          {
            label: getTranslatedText(staticText?.remoteEntry),
            name: "remoteEntry",
          },
          {
            label: getTranslatedText(staticText?.components),
            name: "components",
            render: (microFrontend: IMicroFrontend) => {
              if (microFrontend.components) {
                return microFrontend.components.join(", ");
              } else return "";
            },
          },
        ]}
        elements={microFrontends}
        total={total}
        limit={limit}
        page={page}
        loading={loading}
        deletePromise={deleteMicroFrontends}
        deleteLoading={deleteLoading}
        getElementName={(microFrontend: any) => microFrontend.name}
        onPageChange={handlePageChange}
        canCreate={hasPermission(Permission.CreateMicroFrontend)}
        canUpdate={hasPermission(Permission.UpdateMicroFrontend)}
        canDelete={hasPermission(Permission.DeleteMicroFrontend)}
        searchPromise={handleSearchMicroFrontendsPromise}
        searchResult={searchResult}
        setSearchResult={handleSetSearchResult}
        elementsLocalStorageConfName={LocalStorageConfNameEnum.MICRO_FRONTENDS}
      />
    </div>
  );
};

export default withWrapper(withChat(React.memo(MicroFrontendsPage)), {
  withFooter: false,
  withSideMenu: true,
});
