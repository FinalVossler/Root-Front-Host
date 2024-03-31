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

import useStyles from "./orderModelAssociatedInfo.styles";
import { useAppSelector } from "../../../../store/hooks";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import ExtendSection from "../../../../components/fundamentalComponents/extendSection";
import { ExtendSectionSizeEnum } from "../../../../components/fundamentalComponents/extendSection/ExtendSection";
import EntityEditorForm from "../../../../components/appComponents/editors/entityEditor/EntityEditorForm";
import Button from "../../../../components/fundamentalComponents/button";
import _ from "lodash";

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

  const [shown, setShown] = React.useState<boolean>(true);
  const [addNew, setAddNew] = React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  const currentUserIsBuyer = React.useMemo(
    () => (props.order.user as IUserReadDto)._id === currentUser._id,
    [currentUser._id, (props.order.user as IUserReadDto)._id]
  );
  const currentUserIsSeller = React.useMemo(
    () =>
      (props.product?.owner as IUserReadDto)?._id === currentUser._id ||
      (!props.product &&
        props.order.products.some(
          (productInfo) =>
            ((productInfo.product as IEntityReadDto).owner as IUserReadDto)
              ._id === currentUser._id.toString()
        )),
    [
      (props.product?.owner as IUserReadDto)?._id,
      currentUser._id,
      props.order.products,
    ]
  );

  const readOnly =
    (!currentUserIsBuyer &&
      props.modelOrderAssociationConfig.modelOrderAssociationPermission ===
        ModelOrderAssociationPermissionEnum.ForBuyer) ||
    (!currentUserIsSeller &&
      props.modelOrderAssociationConfig.modelOrderAssociationPermission ===
        ModelOrderAssociationPermissionEnum.ForSeller) ||
    (!currentUserIsBuyer && !currentUserIsSeller);

  const showNewForm =
    (addNew && props.modelOrderAssociationConfig.isList) ||
    (orderModelAssociatedEntities.length === 0 &&
      !props.modelOrderAssociationConfig.isList);

  const automaticallyAssignedUsersIds = React.useMemo((): string[] => {
    const buyerUserId: string = (props.order.user as IUserReadDto)._id;
    const sellersUsersIds: string[] = [];
    props.order.products?.forEach((productInfo) => {
      const userId: string = (
        (productInfo.product as IEntityReadDto).owner as IUserReadDto
      )._id;
      if (sellersUsersIds.indexOf(userId) === -1) {
        sellersUsersIds.push(userId);
      }
    });

    // If current user is the buyer, then set the automatically assigned users to all sellers
    if (currentUserIsBuyer) {
      return sellersUsersIds;
    }
    if (currentUserIsSeller) {
      // If current user is not a buyer, then set the automatically assigned user to the buyer
      return [buyerUserId];
    }

    return _.uniq([...sellersUsersIds, buyerUserId]);
  }, [currentUserIsBuyer, currentUserIsSeller, props.order.products]);

  return (
    <div className={styles.orderModelAssociatedInfo}>
      <ExtendSection
        isSectionShown={shown}
        onClick={() => setShown(!shown)}
        theme={theme}
        title={getTranslatedText(props.model.name)}
        size={ExtendSectionSizeEnum.Small}
      />

      {shown && (
        <React.Fragment>
          {orderModelAssociatedEntities
            .filter((associationedEntity) =>
              associationedEntity.orderAssociationConfig?.productId &&
              props.product?._id
                ? associationedEntity.orderAssociationConfig?.productId ===
                  props.product?._id
                : true
            )
            .map((associatedEntity) => {
              return (
                <EntityEditorForm
                  key={associatedEntity._id}
                  entity={associatedEntity}
                  modelId={props.model._id}
                  withoutLanguage
                  withoutTitle
                  withoutUserAssignment
                  automaticallyAssignedUserIds={automaticallyAssignedUsersIds}
                  orderAssociationConfig={{
                    orderId: props.order._id,
                    productId: props.product?._id,
                  }}
                  readOnly
                />
              );
            })}
          {showNewForm && (
            <EntityEditorForm
              modelId={props.model._id}
              withoutLanguage
              withoutTitle
              withoutUserAssignment
              automaticallyAssignedUserIds={automaticallyAssignedUsersIds}
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
        </React.Fragment>
      )}
    </div>
  );
};

export default OrderModelAssociatedInfo;
