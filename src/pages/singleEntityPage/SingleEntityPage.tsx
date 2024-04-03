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
  IOrderReadDto,
} from "roottypes";
import useHasPermission from "../../hooks/useHasPermission";
import OrderInfo from "../ordersPage/orderInfo";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";

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
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );

  const [entity, setEntity] = React.useState<IEntityReadDto>();
  const [concernedOrder, setConcernedOrder] = React.useState<
    IOrderReadDto | null | undefined
  >();

  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();
  const { getEntity, loading } = useGetEntity();
  const { hasEntityPermission } = useHasPermission();
  const getTranslatedText = useGetTranslatedText();

  React.useEffect(() => {
    const handleGetEntity = async () => {
      if (model && model._id && entityId && modelId) {
        const { entity, concernedOrder } = await getEntity(entityId);
        setEntity(entity);
        setConcernedOrder(concernedOrder);
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
      {!loading && concernedOrder && (
        <React.Fragment>
          <h2 className={styles.concernedOrderTitle}>
            {getTranslatedText(staticText?.concernedOrder)}
          </h2>
          <OrderInfo order={concernedOrder} />
        </React.Fragment>
      )}
    </div>
  );
};

export default React.memo(SingleEntityPage);
