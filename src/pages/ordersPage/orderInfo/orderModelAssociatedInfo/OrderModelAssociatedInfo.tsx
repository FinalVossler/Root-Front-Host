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
import _ from "lodash";

import useStyles from "./orderModelAssociatedInfo.styles";
import { useAppSelector } from "../../../../store/hooks";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import ExtendSection from "../../../../components/fundamentalComponents/extendSection";
import { ExtendSectionSizeEnum } from "../../../../components/fundamentalComponents/extendSection/ExtendSection";
import EntityEditorForm from "../../../../components/appComponents/editors/entityEditor/EntityEditorForm";
import Button from "../../../../components/fundamentalComponents/button";

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
  const orderModelAssociatedEntities = (
    useAppSelector((state) => state.order.orderAssociatedEntities)[
      props.order._id.toString()
    ] || []
  ).filter(
    (e) =>
      (e.model as IModelReadDto)._id.toString() === props.model._id.toString()
  );

  const [shown, setShown] = React.useState<boolean>(false);
  const [addNew, setAddNew] = React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  //#region View
  const existingEntities: IEntityReadDto[] =
    orderModelAssociatedEntities.filter((associatedEntity) =>
      associatedEntity.orderAssociationConfig?.productId && props.product?._id
        ? associatedEntity.orderAssociationConfig?.productId ===
          props.product?._id
        : true
    );

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
    (existingEntities.length === 0 &&
      !props.modelOrderAssociationConfig.isList);

  const automaticallyAssignedUsers = React.useMemo((): IUserReadDto[] => {
    const buyerUser: IUserReadDto = props.order.user as IUserReadDto;
    const sellersUsers: IUserReadDto[] = [];
    props.order.products?.forEach((productInfo) => {
      const seller = (productInfo.product as IEntityReadDto)
        .owner as IUserReadDto;
      if (
        sellersUsers.find((el) => el._id.toString() === seller._id.toString())
      ) {
        sellersUsers.push(seller);
      }
    });

    // If current user is the buyer, then set the automatically assigned users to all sellers
    if (currentUserIsBuyer) {
      return sellersUsers;
    }
    if (currentUserIsSeller) {
      // If current user is not a buyer, then set the automatically assigned user to the buyer
      return [buyerUser];
    }

    return _.uniq([...sellersUsers, buyerUser]);
  }, [currentUserIsBuyer, currentUserIsSeller, props.order.products]);
  //#endregion View

  return (
    <div
      className={
        props.product
          ? styles.orderProductModelAssociatedInfo
          : styles.orderModelAssociatedInfo
      }
    >
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
            .filter((associatedEntity) =>
              associatedEntity.orderAssociationConfig?.productId &&
              props.product?._id
                ? associatedEntity.orderAssociationConfig?.productId ===
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
                  automaticallyAssignedUsers={automaticallyAssignedUsers}
                  orderAssociationConfig={{
                    orderId: props.order._id,
                    productId: props.product?._id,
                  }}
                  readOnly={
                    associatedEntity.owner
                      ? (
                          associatedEntity.owner as IUserReadDto
                        )._id.toString() !== currentUser._id.toString()
                      : true
                  }
                />
              );
            })}
          {showNewForm && (
            <EntityEditorForm
              modelId={props.model._id}
              withoutLanguage
              withoutTitle
              withoutUserAssignment
              automaticallyAssignedUsers={automaticallyAssignedUsers}
              orderAssociationConfig={{
                orderId: props.order._id,
                productId: props.product?._id,
              }}
              readOnly={readOnly}
            />
          )}

          {props.modelOrderAssociationConfig.isList && (
            <Button
              theme={theme}
              onClick={() => setAddNew(!addNew)}
              style={{
                marginTop: 10,
                width: "100%",
                background: theme.secondary,
              }}
            >
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
