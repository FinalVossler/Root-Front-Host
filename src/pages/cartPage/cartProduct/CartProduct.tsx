import React from "react";
import {
  ITheme,
  IEntityReadDto,
  IFieldReadDto,
  IModelReadDto,
  IFileReadDto,
} from "roottypes";

import { useAppSelector } from "../../../store/hooks";

import useStyles from "./cartProduct.styles";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";

interface ICartProductProps {
  productInfo: {
    product: IEntityReadDto;
    quantity: number;
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

  const styles = useStyles({ theme });

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
        <div className={styles.productInfo}>
          {props.model.modelFields
            .filter((modelField) => modelField.mainField)
            .map((modelField) => {
              const value = (
                props.productInfo.product as IEntityReadDto
              ).entityFieldValues.find(
                (efv) =>
                  (efv.field as IFieldReadDto)._id.toString() ===
                  (modelField.field as IFieldReadDto)._id.toString()
              )?.value;

              return (
                <span className={styles.productMainInfo}>
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
      </div>
      <div className={styles.right}></div>
    </div>
  );
};

export default CartProduct;
