import React from "react";
import { useParams } from "react-router-dom";
import EntityEditor from "../../components/editors/entityEditor";

import FieldEditor from "../../components/editors/fieldEditor";
import Elements from "../../components/elements";
import { Theme } from "../../config/theme";
import withWrapper from "../../hoc/wrapper";
import useDeleteEntities from "../../hooks/apiHooks/useDeleteEntities";
import useGetEntitiesByModel from "../../hooks/apiHooks/useGetEntitiesByModel";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";
import { IEntity } from "../../store/slices/entitySlice";
import { IField } from "../../store/slices/fieldSlice";
import { IModel } from "../../store/slices/modelSlice";

import useStyles from "./entitiesPage.styles";

interface IEntitiesPage {}

const EntitiesPage: React.FunctionComponent<IEntitiesPage> = (
  props: IEntitiesPage
) => {
  const { modelId } = useParams();

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const modelEntities = useAppSelector((state) =>
    state.entity.entities.find((el) => el.modelId === modelId)
  );
  const model: IModel | undefined = useAppSelector((state) =>
    state.model.models.find((m) => m._id === modelId)
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getEntitiesByModel, loading } = useGetEntitiesByModel();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteEntities, loading: deleteLoading } = useDeleteEntities(
    modelId || ""
  );

  React.useEffect(() => {
    getEntitiesByModel({
      model: modelId || "",
      paginationCommand: {
        limit: 100,
        page: 1,
      },
    });
  }, []);

  if (!isLoggedIn) return null;

  return (
    <div className={styles.entitiesPageContainer}>
      <Elements
        Editor={({ element, ...props }) => (
          <EntityEditor {...props} entity={element as IEntity} />
        )}
        columns={
          model?.modelFields.map((modelField) => {
            return {
              label: getTranslatedText(modelField.field.name),
              name: "",
              render: (entity: IEntity) =>
                getTranslatedText(
                  entity.entityFieldValues.find(
                    (entityField) =>
                      entityField.field._id === modelField.field._id
                  )?.value
                ),
            };
          }) || []
        }
        elements={modelEntities?.entities || []}
        total={modelEntities?.total || 0}
        loading={loading}
        deletePromise={deleteEntities}
        deleteLoading={deleteLoading}
        getElementName={(field: IField | IModel | IEntity) => ""}
      />
    </div>
  );
};

export default withWrapper(EntitiesPage, {
  withFooter: false,
  withSideMenu: true,
});
