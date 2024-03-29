import React from "react";
import {
  IEntityReadDto,
  IFieldReadDto,
  IFileReadDto,
  IModelReadDto,
  IOrderReadDto,
  ITheme,
} from "roottypes";

import { useAppSelector } from "../../store/hooks";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import formatCentsToDollars from "../../utils/formatCentsToDollars";
import Button from "../../components/fundamentalComponents/button";

import useStyles from "./orderInfo.styles";

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

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  return (
    <div className={styles.orderInfoContainer}>
      <div className={styles.orderInfoHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.orderDate}>
            {getTranslatedText(staticText?.orderMadeIn) +
              ": " +
              props.order.date}
          </span>
          <span className={styles.orderTotal}>
            {getTranslatedText(staticText?.total) +
              ": " +
              formatCentsToDollars(props.order.total)}
          </span>
          <span className={styles.shippedTo}>
            {getTranslatedText(staticText?.shipmentTo)}
          </span>
        </div>
        <div className={styles.headerRight}>
          {getTranslatedText(staticText?.orderNumer) +
            ": " +
            props.order.number}
        </div>
      </div>

      {props.order.products.map((p) => {
        const product: IEntityReadDto = p.product as IEntityReadDto;
        const model: IModelReadDto = product.model as IModelReadDto;
        const imageFieldId = model.imageField;

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

            <div className={styles.productContentRight}>
              <Button theme={theme}>
                {getTranslatedText(staticText?.writeAComment)}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderInfo;
