import React from "react";

import ModelEditor from "../../components/editors/modelEditor";
import Elements from "../../components/elements";
import { Theme } from "../../config/theme";
import withWrapper from "../../hoc/wrapper";
import useDeleteModels from "../../hooks/apiHooks/useDeleteModels";
import useGetModels from "../../hooks/apiHooks/useGetModels";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";
import { IField } from "../../store/slices/fieldSlice";
import { IModel } from "../../store/slices/modelSlice";
import { IUser, Role } from "../../store/slices/userSlice";

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

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getModels, loading } = useGetModels();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteModels, loading: deleteLoading } = useDeleteModels();

  React.useEffect(() => {
    getModels({
      paginationCommand: {
        limit: 100,
        page: 1,
      },
    });
  }, []);

  if (!isLoggedIn) return null;

  if (user.role !== Role.Admin) return null;

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
        loading={loading}
        deletePromise={deleteModels}
        deleteLoading={deleteLoading}
        getElementName={(model: any) => getTranslatedText(model.name)}
      />
    </div>
  );
};

export default withWrapper(ModelsPage, {
  withFooter: false,
  withSideMenu: true,
});
