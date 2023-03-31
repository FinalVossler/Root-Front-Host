import React from "react";

import ModelEditor from "../../components/editors/modelEditor";
import Elements from "../../components/elements";
import { Theme } from "../../config/theme";
import withWrapper from "../../hoc/wrapper";
import useDeleteModels from "../../hooks/apiHooks/useDeleteModels";
import useGetModels from "../../hooks/apiHooks/useGetModels";
import useSearchModels from "../../hooks/apiHooks/useSearchModels";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";
import { IModel } from "../../store/slices/modelSlice";
import { IUser, SuperRole } from "../../store/slices/userSlice";

import useStyles from "./modelsPage.styles";

interface IModelsPage {}

const ModelsPage: React.FunctionComponent<IModelsPage> = (
  props: IModelsPage
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.models
  );
  const { models, total } = useAppSelector((state) => state.model);
  const user: IUser = useAppSelector((state) => state.user.user);

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getModels, loading } = useGetModels();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteModels, loading: deleteLoading } = useDeleteModels();
  const { handleSearchModelsPromise } = useSearchModels();

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

  if (!isLoggedIn) return null;

  if (user.superRole !== SuperRole.SuperAdmin) return null;

  return (
    <div className={styles.modelsPageContainer}>
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
      />
    </div>
  );
};

export default withWrapper(ModelsPage, {
  withFooter: false,
  withSideMenu: true,
});
