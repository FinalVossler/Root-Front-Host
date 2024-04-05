import React from "react";

import Elements from "../../components/appComponents/elements";
import useDeleteModels from "../../hooks/apiHooks/useDeleteModels";
import useGetModels from "../../hooks/apiHooks/useGetModels";
import useSearchModels from "../../hooks/apiHooks/useSearchModels";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useHasPermission from "../../hooks/useHasPermission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { modelSlice } from "../../store/slices/modelSlice";

import useStyles from "./modelsPage.styles";
import { LocalStorageConfNameEnum } from "../../utils/localStorage";
import {
  IFieldReadDto,
  IModelReadDto,
  IPaginationResponse,
  ITheme,
  IUserReadDto,
  PermissionEnum,
} from "roottypes";
import { EditorTypeEnum, editorSlice } from "../../store/slices/editorSlice";
import useCopyModels from "../../hooks/apiHooks/useCopyModels";

interface IModelsPageProps {}

const ModelsPage: React.FunctionComponent<IModelsPageProps> = (
  props: IModelsPageProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.models
  );
  const { models, total } = useAppSelector((state) => state.model);
  const searchResult = useAppSelector((state) => state.model.searchedModels);

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const { getModels, loading } = useGetModels();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteModels, loading: deleteLoading } = useDeleteModels();
  const { handleSearchModelsPromise } = useSearchModels();
  const { hasPermission } = useHasPermission();
  const { copyModels, loading: copyLoading } = useCopyModels();

  React.useEffect(() => {
    // We are already getting the models at the page loading
    // getModels({
    //   paginationCommand: {
    //     limit,
    //     page,
    //   },
    // });
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSetSearchResult = React.useCallback(
    (res: IPaginationResponse<IModelReadDto>) => {
      dispatch(modelSlice.actions.setSearchedModels(res));
    },
    []
  );

  const handleFetchElements = () => {
    getModels({
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

  if (!isLoggedIn) return null;

  if (
    !hasPermission(PermissionEnum.ReadModel) &&
    !hasPermission(PermissionEnum.ReadOwnModel)
  )
    return null;

  return (
    <div className={styles.modelsPageContainer} data-cy="modelsPage">
      <Elements
        handleOpenEditor={(element) => {
          dispatch(
            editorSlice.actions.addEditor({
              element,
              editorType: EditorTypeEnum.Model,
            })
          );
        }}
        columns={[
          {
            label: getTranslatedText(staticText?.namePlaceholder),
            name: "name",
          },
          {
            label: getTranslatedText(staticText?.fieldsPlaceholder),
            name: "fields",
            render: (model: IModelReadDto) => {
              return model.modelFields
                .map((modelField) =>
                  getTranslatedText((modelField.field as IFieldReadDto).name)
                )
                .join(", ");
            },
          },
          {
            label: getTranslatedText(staticText?.owner),
            name: "owner",
            render: (model: IModelReadDto) => {
              return model.owner
                ? (model.owner as IUserReadDto).firstName +
                    " " +
                    (model.owner as IUserReadDto).lastName
                : "";
            },
          },
        ]}
        elements={models}
        total={total}
        limit={limit}
        page={page}
        loading={loading}
        deletePromise={deleteModels}
        deleteLoading={deleteLoading}
        copyPromise={copyModels}
        copyLoading={copyLoading}
        onCopyFinished={handleCopyFinished}
        getElementName={(model: any) => getTranslatedText(model.name)}
        onPageChange={handlePageChange}
        searchPromise={handleSearchModelsPromise}
        canCreate={hasPermission(PermissionEnum.CreateModel)}
        canUpdate={hasPermission(
          PermissionEnum.UpdateModel,
          PermissionEnum.UpdateOwnModel
        )}
        canUpdateElement={(model) =>
          hasPermission(
            PermissionEnum.UpdateModel,
            PermissionEnum.UpdateOwnModel,
            [(model as IModelReadDto).owner]
          )
        }
        canDelete={hasPermission(
          PermissionEnum.DeleteModel,
          PermissionEnum.DeleteOwnField
        )}
        canDeleteElements={(models) =>
          hasPermission(
            PermissionEnum.DeleteField,
            PermissionEnum.DeleteOwnField,
            (models as IModelReadDto[]).map((m) => m.owner)
          )
        }
        searchResult={searchResult}
        setSearchResult={handleSetSearchResult}
        elementsLocalStorageConfName={LocalStorageConfNameEnum.MODELS}
        tableDataCy="modelsTable"
      />
    </div>
  );
};

export default React.memo(ModelsPage);
