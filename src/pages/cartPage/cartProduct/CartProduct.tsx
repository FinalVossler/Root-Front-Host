import React from "react";
import {
  ITheme,
  IEntityReadDto,
  IFieldReadDto,
  IModelReadDto,
  IFileReadDto,
} from "roottypes";

import { useAppSelector } from "../../../store/hooks";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";

import useStyles from "./cartProduct.styles";
import CartProductActions from "../cartProductActions/CartProductActions";
import formatCentsToDollars from "../../../utils/formatCentsToDollars";

interface ICartProductProps {
  productInfo: {
    product: IEntityReadDto;
    quantity: number;
    sided: boolean;
  };
  model: IModelReadDto | undefined;
}

const CartProduct: React.FunctionComponent<ICartProductProps> = (
  props: ICartProductProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const getTranslatedText = useGetTranslatedText();
  const checkoutStaticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );

  const styles = useStyles({ theme });

  if (!props.model) {
    return null;
  }

  const priceFieldId: string | undefined = (
    props.model?.priceField as IFieldReadDto
  )._id.toString();
  const imageFieldId: string | undefined = (
    props.model?.imageField as IFieldReadDto
  )._id.toString();

  // Todo: give default image value
  let imageUrl: string;
  const imageFiles = props.productInfo.product.entityFieldValues.find(
    (efv) => (efv.field as IFieldReadDto)._id.toString() === imageFieldId
  )?.files as IFileReadDto[] | undefined;

  if (!props.model) {
    return null;
  }

  if (!imageFiles || imageFiles.length === 0) {
    return null;
  }

  imageUrl = imageFiles[0].url;

  return (
    <div className={styles.cartProductContainer}>
      <div className={styles.left}>
        <img className={styles.productImage} src={imageUrl} />
        <div className={styles.productInfoAndActions}>
          <div className={styles.productMainFields}>
            {props.model.modelFields
              .filter((modelField) => modelField.mainField)
              .map((modelField, i) => {
                const value = (
                  props.productInfo.product as IEntityReadDto
                ).entityFieldValues.find(
                  (efv) =>
                    (efv.field as IFieldReadDto)._id.toString() ===
                    (modelField.field as IFieldReadDto)._id.toString()
                )?.value;

                return (
                  <span key={i} className={styles.productMainInfo}>
                    <span className={styles.productSingleMainInfoTitle}>
                      {getTranslatedText(
                        (modelField.field as IFieldReadDto).name
                      )}
                      :{" "}
                    </span>
                    <span className={styles.productSingleManInfoValue}>
                      {getTranslatedText(value)}
                    </span>
                  </span>
                );
              })}
          </div>
          <CartProductActions productInfo={props.productInfo} />
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.price}>
          {formatCentsToDollars(
            getTranslatedText(
              (
                props.productInfo.product as IEntityReadDto
              ).entityFieldValues.find(
                (efv) =>
                  (efv.field as IFieldReadDto)._id.toString() === priceFieldId
              )?.value
            )
          ) + " "}
          {getTranslatedText(checkoutStaticText?.moneyUnit)}
        </span>
      </div>
    </div>
  );
};

export default CartProduct;
