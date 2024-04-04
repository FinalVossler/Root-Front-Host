import React from "react";
import {
  IEntityReadDto,
  IFieldReadDto,
  IFileReadDto,
  IModelOrderAssociationConfig,
  IModelReadDto,
  IOrderReadDto,
  IShippingMethodReadDto,
  ITheme,
  ModelOrderAssociationLevelEnum,
  OrderPaymentStatusEnum,
} from "roottypes";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import _ from "lodash";

import useStyles from "./orderInfo.styles";
import { useAppSelector } from "../../../store/hooks";
import useGetOrderAssociatedEntities from "../../../hooks/apiHooks/useGetOrderAssociatedEntities";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import showWithSpacingIfDefined from "../../../utils/showWithSpacingIfDefined";
import formatCentsToDollars from "../../../utils/formatCentsToDollars";
import OrderModelAssociatedInfo from "./orderModelAssociatedInfo";
import StateTracking from "../../../components/fundamentalComponents/postsComponents/stateTracking";
import { IStateTrackingState } from "../../../components/fundamentalComponents/postsComponents/stateTracking/StateTracking";
import Loading from "react-loading";

interface IOrderInfoProps {
  order: IOrderReadDto;
}

const OrderInfo: React.FunctionComponent<IOrderInfoProps> = (
  props: IOrderInfoProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.orders
  );
  const orderStaticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );
  const models = useAppSelector((state) => state.model.models);
  const orderOrderLevelModels = models
    .filter((model) => model.isForOrders)
    .filter(
      (model) =>
        model.orderAssociationConfig?.modelOrderAssociationLevel ===
        ModelOrderAssociationLevelEnum.OrderLevel
    );
  const orderProductLevelModels = models
    .filter((model) => model.isForOrders)
    .filter(
      (model) =>
        model.orderAssociationConfig?.modelOrderAssociationLevel ===
        ModelOrderAssociationLevelEnum.ProductLevel
    );

  const [showingDetails, setShowingDetails] = React.useState<boolean>(false);

  const {
    getOrderAssociatedEntities,
    loading: getOrderAssociatedEntitiesLoading,
  } = useGetOrderAssociatedEntities();
  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  React.useEffect(() => {
    getOrderAssociatedEntities(props.order._id);
  }, [props.order._id]);

  //#region View
  const paymentStatuses = React.useMemo(() => {
    return getOrderedStates(Object.values(OrderPaymentStatusEnum));
  }, []);
  //#endregion View

  return (
    <div className={styles.orderInfoContainer}>
      <div
        className={styles.orderInfoHeader}
        onClick={() => setShowingDetails(!showingDetails)}
      >
        <div className={styles.headerLeft}>
          {!showingDetails && (
            <MdArrowDownward className={styles.extendDetails} />
          )}
          {showingDetails && <MdArrowUpward className={styles.extendDetails} />}

          <div className={styles.orderDate}>
            {getTranslatedText(staticText?.orderMadeIn) +
              " " +
              props.order.date}
          </div>
          <div className={styles.shippedTo}>
            {getTranslatedText(staticText?.shipmentTo) + ": "}
            {props.order.shippingAddress.addressLine1 +
              showWithSpacingIfDefined(
                props.order.shippingAddress.addressLine2
              ) +
              showWithSpacingIfDefined(props.order.shippingAddress.city) +
              showWithSpacingIfDefined(props.order.shippingAddress.postalCode) +
              showWithSpacingIfDefined(props.order.shippingAddress.region) +
              showWithSpacingIfDefined(props.order.shippingAddress.country)}
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.orderNumber}>
            {getTranslatedText(staticText?.orderNumer) +
              ": " +
              props.order.number}
          </div>

          <div className={styles.orderTotal}>
            {getTranslatedText(staticText?.total) +
              ": " +
              formatCentsToDollars(props.order.total) +
              " "}
            {getTranslatedText(orderStaticText?.moneyUnit)}
          </div>
        </div>
      </div>

      {showingDetails &&
        props.order.products.map((p) => {
          const product: IEntityReadDto = p.product as IEntityReadDto;
          const model: IModelReadDto | undefined = models.find(
            (m) =>
              m._id.toString() ===
              (product.model as IModelReadDto)._id.toString()
          );
          if (!model) return null;

          const imageFieldId = (
            model.imageField as IFieldReadDto
          )._id.toString();

          if (!imageFieldId) return null;

          const imageFile: IFileReadDto | undefined = product.entityFieldValues
            .find(
              (efv) =>
                (efv.field as IFieldReadDto)?._id.toString() === imageFieldId
            )
            ?.files.at(0) as undefined | IFileReadDto;

          if (!imageFile) return null;

          const mainFields = model.modelFields.filter(
            (modelField) => modelField.mainField
          );

          return (
            <div className={styles.productContent} key={product._id}>
              <div className={styles.productBasicContent}>
                <img className={styles.productImage} src={imageFile.url} />
                <div className={styles.productInfo}>
                  {mainFields.map((modelMainField, i) => {
                    return (
                      <span className={styles.productMainInfo} key={i}>
                        {getTranslatedText(
                          (modelMainField.field as IFieldReadDto).name
                        )}
                        :{" "}
                        {getTranslatedText(
                          product.entityFieldValues.find(
                            (efv) =>
                              (efv.field as IFieldReadDto)._id.toString() ===
                              (
                                modelMainField.field as IFieldReadDto
                              )._id.toString()
                          )?.value
                        )}
                      </span>
                    );
                  })}
                  <span className={styles.productMainInfo}>
                    {getTranslatedText(orderStaticText?.shippingMethod) +
                      ": " +
                      getTranslatedText(
                        (p.shippingMethod as IShippingMethodReadDto).name
                      )}
                  </span>
                </div>
              </div>

              {getOrderAssociatedEntitiesLoading && (
                <Loading color={theme.primary} />
              )}
              {!getOrderAssociatedEntitiesLoading &&
                orderProductLevelModels.map((model) => {
                  return (
                    <OrderModelAssociatedInfo
                      key={model._id}
                      order={props.order}
                      model={model}
                      modelOrderAssociationConfig={
                        model.orderAssociationConfig as IModelOrderAssociationConfig
                      }
                      product={product}
                    />
                  );
                })}
            </div>
          );
        })}

      {getOrderAssociatedEntitiesLoading && <Loading color={theme.primary} />}

      {!getOrderAssociatedEntitiesLoading &&
        showingDetails &&
        orderOrderLevelModels.map((model) => {
          return (
            <OrderModelAssociatedInfo
              key={model._id}
              order={props.order}
              model={model}
              modelOrderAssociationConfig={
                model.orderAssociationConfig as IModelOrderAssociationConfig
              }
            />
          );
        })}

      {showingDetails && (
        <div className={styles.statusesContainer}>
          <h2 className={styles.paymentStatusesTitle}>
            {getTranslatedText(staticText?.paymentStatus)}
          </h2>
          <StateTracking
            currentState={paymentStatuses.find(
              (state) => state._id === props.order.paymentStatus
            )}
            states={paymentStatuses}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
};

const getOrderedStates = (objectValuesOfEnum) => {
  const states: IStateTrackingState[] = objectValuesOfEnum.map((status) => ({
    _id: status,
    stateName: status,
  }));

  return states;
};

export default OrderInfo;
