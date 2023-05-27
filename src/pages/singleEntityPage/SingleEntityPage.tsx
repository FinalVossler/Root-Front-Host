import React from "react";
import { useParams } from "react-router-dom";
import Loading from "react-loading";

import { Theme } from "../../config/theme";
import withChat from "../../hoc/withChat";
import withWrapper from "../../hoc/wrapper";
import useGetEntity, {
  EntitiesGetEntityCommand,
} from "../../hooks/apiHooks/useGetEntity";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";
import { IModel, IModelField } from "../../store/slices/modelSlice";

import useStyles from "./singleEntityPage.styles";
import { IEntity } from "../../store/slices/entitySlice";
import { FieldType } from "../../store/slices/fieldSlice";
import Input from "../../components/input";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import EntityEditorForm from "../../components/editors/entityEditor/EntityEditorForm";

interface ISingleEntityPage {}

const SingleEntityPage: React.FunctionComponent<ISingleEntityPage> = (
  props: ISingleEntityPage
) => {
  const { modelId, entityId } = useParams();

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const model: IModel | undefined = useAppSelector((state) =>
    state.model.models.find((model) => model._id === modelId)
  );

  const [entity, setEntity] = React.useState<IEntity>();

  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();
  const { getEntity, loading } = useGetEntity();

  React.useEffect(() => {
    const handleGetEntity = async () => {
      if (model && model._id && entityId && modelId) {
        const command: EntitiesGetEntityCommand = {
          entityId,
          modelId,
        };

        const entity: IEntity = await getEntity(command);
        setEntity(entity);
      }
    };

    handleGetEntity();
  }, [model]);

  if (!isLoggedIn) return null;

  return (
    <div className={styles.singleEntityPageContainer}>
      {loading && <Loading />}

      {!loading && entity && (
        <div className={styles.entityValuesContainer}>
          <EntityEditorForm modelId={modelId} entity={entity} readOnly />
        </div>
      )}
    </div>
  );
};

export default withWrapper(withChat(React.memo(SingleEntityPage)), {
  withFooter: false,
  withSideMenu: true,
});
