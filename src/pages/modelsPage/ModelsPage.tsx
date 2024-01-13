import React from "react";

import ModelEditor from "../../components/editors/modelEditor";
import Elements from "../../components/elements";
import { ITheme } from "../../config/theme";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import useDeleteModels from "../../hooks/apiHooks/useDeleteModels";
import useGetModels from "../../hooks/apiHooks/useGetModels";
import useSearchModels from "../../hooks/apiHooks/useSearchModels";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useHasPermission from "../../hooks/useHasPermission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IModel, modelSlice } from "../../store/slices/modelSlice";
import { Permission } from "../../store/slices/roleSlice";

import useStyles from "./modelsPage.styles";
import { LocalStorageConfNameEnum } from "../../utils/localStorage";

interface IModelsPage {}

const ModelsPage: React.FunctionComponent<IModelsPage> = (
  props: IModelsPage
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

  React.useEffect(() => {
    getModels({
      paginationCommand: {
        limit,
        page,
      },
    });
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSetSearchResult = React.useCallback(
    (res: PaginationResponse<IModel>) => {
      dispatch(modelSlice.actions.setSearchedModels(res));
    },
    []
  );

  if (!isLoggedIn) return null;

  if (!hasPermission(Permission.ReadModel)) return null;

  return (
    <div className={styles.modelsPageContainer} data-cy="modelsPage">
      <Elements
        Editor={({ element, ...props }) => (
          <ModelEditor {...props} model={element as IModel} />
        )}
        columns={[
          {
            label: getTranslatedText(staticText?.namePlaceholder),
            name: "name",
          },
          {
            label: getTranslatedText(staticText?.fieldsPlaceholder),
            name: "fields",
            render: (model: IModel) => {
              return model.modelFields
                .map((modelField) => getTranslatedText(modelField.field.name))
                .join(", ");
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
        getElementName={(model: any) => getTranslatedText(model.name)}
        onPageChange={handlePageChange}
        searchPromise={handleSearchModelsPromise}
        canCreate={hasPermission(Permission.CreateModel)}
        canUpdate={hasPermission(Permission.UpdateModel)}
        canDelete={hasPermission(Permission.DeleteModel)}
        searchResult={searchResult}
        setSearchResult={handleSetSearchResult}
        elementsLocalStorageConfName={LocalStorageConfNameEnum.MODELS}
        tableDataCy="modelsTable"
      />
    </div>
  );
};

export default React.memo(ModelsPage);
