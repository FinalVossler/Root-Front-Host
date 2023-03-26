import React from "react";
import { useParams } from "react-router-dom";
import EntityEditor from "../../components/editors/entityEditor";

import Elements from "../../components/elements";
import { Theme } from "../../config/theme";
import withWrapper from "../../hoc/wrapper";
import useDeleteEntities from "../../hooks/apiHooks/useDeleteEntities";
import useGetEntitiesByModel from "../../hooks/apiHooks/useGetEntitiesByModel";
import useGetModels from "../../hooks/apiHooks/useGetModels";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";
import { IEntity } from "../../store/slices/entitySlice";
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
  const entitiesByModel = useAppSelector(
    (state) => state.entity.entitiesByModel
  );
  const entities = entitiesByModel?.find(
    (el) => el.modelId === modelId
  )?.entities;

  const total: number =
    useAppSelector((state) =>
      state.entity.entitiesByModel.find((el) => el.modelId === modelId)
    )?.total || 0;
  const model: IModel | undefined = useAppSelector((state) =>
    state.model.models.find((m) => m._id === modelId)
  );

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getEntitiesByModel, loading } = useGetEntitiesByModel();
  const { getModels } = useGetModels();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteEntities, loading: deleteLoading } = useDeleteEntities(
    modelId || ""
  );

  React.useEffect(() => {
    getEntitiesByModel({
      model: modelId || "",
      paginationCommand: {
        limit: 100,
        page,
      },
    });
  }, [modelId]);

  React.useEffect(() => {
    getModels({
      paginationCommand: {
        limit,
        page: 1,
      },
    });
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

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
        elements={entities || []}
        total={total || 0}
        limit={limit}
        page={page}
        loading={loading}
        deletePromise={deleteEntities}
        deleteLoading={deleteLoading}
        getElementName={(entity: any) => ""}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default withWrapper(EntitiesPage, {
  withFooter: false,
  withSideMenu: true,
});
