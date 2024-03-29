import React from "react";
import {
  IEntityReadDto,
  IFieldReadDto,
  IFileReadDto,
  IModelReadDto,
  IOrderReadDto,
  ITheme,
  OrderNegativeStatusEnum,
  OrderStatusEnum,
} from "roottypes";

import { useAppSelector } from "../../store/hooks";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import formatCentsToDollars from "../../utils/formatCentsToDollars";

import useStyles from "./orderInfo.styles";
import showWithSpacingIfDefined from "../../utils/showWithSpacingIfDefined";
import StateTracking from "../../components/fundamentalComponents/postsComponents/stateTracking";
import { IState } from "../../components/fundamentalComponents/postsComponents/stateTracking/StateTracking";

interface IOrderInfo {
  order: IOrderReadDto;
}

const OrderInfo: React.FunctionComponent<IOrderInfo> = (props: IOrderInfo) => {
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

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  const positiveStatuses = React.useMemo(() => {
    return getOrderedStates(Object.values(OrderStatusEnum));
  }, []);

  const negativeStatuses = React.useMemo(() => {
    return getOrderedStates(Object.values(OrderNegativeStatusEnum));
  }, []);

  console.log("order status", props.order.status);
  console.log(
    "order status id",
    positiveStatuses.find(
      (state) => state._id === getIdFromStatus(props.order.status)
    )
  );

  return (
    <div className={styles.orderInfoContainer}>
      <div className={styles.orderInfoHeader}>
        <div className={styles.headerLeft}>
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
              formatCentsToDollars(props.order.total)}
            {getTranslatedText(orderStaticText?.moneyUnit)}
          </div>
        </div>
      </div>

      {props.order.products.map((p) => {
        const product: IEntityReadDto = p.product as IEntityReadDto;
        const model: IModelReadDto | undefined = models.find(
          (m) =>
            m._id.toString() === (product.model as IModelReadDto)._id.toString()
        );
        if (!model) return null;

        const imageFieldId = (model.imageField as IFieldReadDto)._id.toString();

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
          <div className={styles.productContent}>
            <div className={styles.productContentLeft}>
              <img className={styles.productImage} src={imageFile.url} />
              <div className={styles.productInfo}>
                {mainFields.map((modelMainField) => {
                  return (
                    <span className={styles.productMainInfo}>
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
              </div>
            </div>

            <div className={styles.productContentRight}></div>
          </div>
        );
      })}

      <div className={styles.statusesContainer}>
        <h2 className={styles.statusesTitle}>
          {getTranslatedText(staticText?.status)}
        </h2>
        <div className={styles.positiveStatusesContainer}>
          <StateTracking
            currentState={positiveStatuses.find(
              (state) => state._id === getIdFromStatus(props.order.status)
            )}
            states={positiveStatuses}
            theme={theme}
          />
        </div>
        {negativeStatuses.find(
          (state) => state._id === getIdFromStatus(props.order.status)
        ) && (
          <div className={styles.negativeStatusesContainer}>
            <StateTracking
              currentState={negativeStatuses.find(
                (state) => state._id === getIdFromStatus(props.order.status)
              )}
              states={negativeStatuses}
              theme={theme}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const getIdFromStatus = (state: OrderStatusEnum | OrderNegativeStatusEnum) =>
  state.replace(/\s+/g, "");

const getOrderedStates = (objectValuesOfEnum) => {
  const states: IState[] = objectValuesOfEnum.map((status) => ({
    _id: getIdFromStatus(status),
    stateName: status,
  }));

  return states;
};

export default OrderInfo;
