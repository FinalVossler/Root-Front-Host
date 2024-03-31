import React from "react";
import {
  IEntityReadDto,
  IModelOrderAssociationConfig,
  IModelReadDto,
  IOrderReadDto,
  ITheme,
  IUserReadDto,
  ModelOrderAssociationPermissionEnum,
} from "roottypes";

import { useAppSelector } from "../../../store/hooks";

import useStyles from "./orderModelAssociatedInfo.styles";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import EntityEditorForm from "../../../components/appComponents/editors/entityEditor/EntityEditorForm";
import Button from "../../../components/fundamentalComponents/button";

interface IOrderModelAssociatedInfoProps {
  order: IOrderReadDto;
  model: IModelReadDto;
  modelOrderAssociationConfig: IModelOrderAssociationConfig;
  product?: IEntityReadDto;
}

const OrderModelAssociatedInfo: React.FunctionComponent<
  IOrderModelAssociatedInfoProps
> = (props: IOrderModelAssociatedInfoProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.orders
  );
  const currentUser = useAppSelector((state) => state.user.user);
  const models = useAppSelector((state) => state.model.models);
  const orderModelAssociatedEntities = (
    useAppSelector((state) => state.order.orderAssociatedEntities)[
      props.order._id.toString()
    ] || []
  ).filter(
    (e) =>
      (e.model as IModelReadDto)._id.toString() === props.model._id.toString()
  );

  const [addNew, setAddNew] = React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  const currentUserIsBuyer =
    (props.order.user as IUserReadDto)._id === currentUser._id;
  const currentUserIsSeller =
    (props.product?.owner as IUserReadDto)?._id === currentUser._id;
  const readOnly =
    (!currentUserIsBuyer &&
      props.modelOrderAssociationConfig.modelOrderAssociationPermission ===
        ModelOrderAssociationPermissionEnum.ForBuyer) ||
    (!currentUserIsSeller &&
      props.modelOrderAssociationConfig.modelOrderAssociationPermission ===
        ModelOrderAssociationPermissionEnum.ForSeller) ||
    (!currentUserIsBuyer && !currentUserIsSeller);

  console.log(
    "addNew && props.modelOrderAssociationConfig.isList)",
    addNew && props.modelOrderAssociationConfig.isList
  );
  const showNewForm =
    (addNew && props.modelOrderAssociationConfig.isList) ||
    (orderModelAssociatedEntities.length === 0 &&
      !props.modelOrderAssociationConfig.isList);
  return (
    <div className={styles.orderModelAssociatedInfo}>
      {orderModelAssociatedEntities.map((associatedEntity) => {
        return (
          <EntityEditorForm
            key={associatedEntity._id}
            entity={associatedEntity}
            modelId={props.model._id}
            withoutLanguage
            orderAssociationConfig={{
              orderId: props.order._id,
              productId: props.product?._id,
            }}
            readOnly={readOnly}
          />
        );
      })}
      {showNewForm && (
        <EntityEditorForm
          modelId={props.model._id}
          withoutLanguage
          orderAssociationConfig={{
            orderId: props.order._id,
            productId: props.product?._id,
          }}
          readOnly={readOnly}
        />
      )}

      {props.modelOrderAssociationConfig.isList && (
        <Button theme={theme} onClick={() => setAddNew(!addNew)}>
          {!addNew
            ? getTranslatedText(props.model.name) + " +"
            : getTranslatedText(staticText?.cancel)}
        </Button>
      )}
    </div>
  );
};

export default OrderModelAssociatedInfo;
