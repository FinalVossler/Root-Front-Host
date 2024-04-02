import React from "react";
import { useParams } from "react-router-dom";
import Loading from "react-loading";

import useGetEntity from "../../hooks/apiHooks/useGetEntity";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./singleEntityPage.styles";
import EntityEditorForm from "../../components/appComponents/editors/entityEditor/EntityEditorForm";
import {
  IEntityReadDto,
  IModelReadDto,
  ITheme,
  IUserReadDto,
  EntityStaticPermissionEnum,
  SuperRoleEnum,
} from "roottypes";
import useHasPermission from "../../hooks/useHasPermission";

interface ISingleEntityPageProps {}

const SingleEntityPage: React.FunctionComponent<ISingleEntityPageProps> = (
  props: ISingleEntityPageProps
) => {
  const { modelId, entityId } = useParams();

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const model: IModelReadDto | undefined = useAppSelector(
    (state) => state.model.models
  ).find((model) => model._id === modelId);
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  const [entity, setEntity] = React.useState<IEntityReadDto>();

  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();
  const { getEntity, loading } = useGetEntity();
  const { hasEntityPermission } = useHasPermission();

  React.useEffect(() => {
    const handleGetEntity = async () => {
      if (model && model._id && entityId && modelId) {
        const entity: IEntityReadDto = await getEntity(entityId);
        setEntity(entity);
      }
    };

    handleGetEntity();
  }, [modelId, model, entityId]);

  if (!isLoggedIn) return null;

  return (
    <div className={styles.singleEntityPageContainer}>
      {loading && <Loading color={theme.primary} />}

      {!loading && entity && (
        <div className={styles.entityValuesContainer}>
          <EntityEditorForm
            modelId={modelId}
            entity={entity}
            readOnly={
              user.superRole !== SuperRoleEnum.SuperAdmin &&
              !hasEntityPermission(
                EntityStaticPermissionEnum.Update,
                modelId as string
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(SingleEntityPage);
