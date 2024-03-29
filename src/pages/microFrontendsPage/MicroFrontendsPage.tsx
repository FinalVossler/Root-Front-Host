import React from "react";

import MicroFrontendEditor from "../../components/appComponents/editors/microFrontendEditor";
import Elements from "../../components/appComponents/elements";
import useGetMicroFrontends from "../../hooks/apiHooks/useGetMicroFrontends";
import useSearchMicroFrontends from "../../hooks/apiHooks/useSearchMicroFrontends";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useHasPermission from "../../hooks/useHasPermission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { microFrontendSlice } from "../../store/slices/microFrontendSlice";

import useStyles from "./microFrontendsPage.styles";
import { LocalStorageConfNameEnum } from "../../utils/localStorage";
import useDeleteMicroFrontends from "../../hooks/apiHooks/useDeleteMicroFrontends";
import {
  IMicroFrontendComponentReadDto,
  IMicroFrontendReadDto,
  IPaginationResponse,
  ITheme,
  PermissionEnum,
} from "roottypes";
import { EditorTypeEnum, editorSlice } from "../../store/slices/editorSlice";

interface IMicroFrontendsPageProps {}

const MicroFrontendsPage: React.FunctionComponent<IMicroFrontendsPageProps> = (
  props: IMicroFrontendsPageProps
) => {
  const theme: ITheme = useAppSelector(
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

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSetSearchResult = React.useCallback(
    (res: IPaginationResponse<IMicroFrontendReadDto>) => {
      dispatch(microFrontendSlice.actions.setSearchedMicroFrontends(res));
    },
    []
  );

  if (!isLoggedIn) return null;

  if (!hasPermission(PermissionEnum.ReadField)) return null;

  return (
    <div className={styles.microFrontendsPageContainer}>
      <Elements
        handleOpenEditor={(element) =>
          dispatch(
            editorSlice.actions.addEditor({
              element,
              editorType: EditorTypeEnum.MicroFrontend,
            })
          )
        }
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
            render: (microFrontend: IMicroFrontendReadDto) => {
              if (microFrontend.components) {
                return (
                  microFrontend.components as IMicroFrontendComponentReadDto[]
                )
                  .map((el) => el.name)
                  .join(", ");
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
        canCreate={hasPermission(PermissionEnum.CreateMicroFrontend)}
        canUpdate={hasPermission(PermissionEnum.UpdateMicroFrontend)}
        canDelete={hasPermission(PermissionEnum.DeleteMicroFrontend)}
        searchPromise={handleSearchMicroFrontendsPromise}
        searchResult={searchResult}
        setSearchResult={handleSetSearchResult}
        elementsLocalStorageConfName={LocalStorageConfNameEnum.MICRO_FRONTENDS}
      />
    </div>
  );
};

export default React.memo(MicroFrontendsPage);
