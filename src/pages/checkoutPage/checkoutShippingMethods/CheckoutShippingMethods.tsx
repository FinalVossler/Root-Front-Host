import React from "react";
import Loading from "react-loading";
import { IEntityReadDto, IShippingMethodReadDto, ITheme } from "roottypes";

import { useAppSelector } from "../../../store/hooks";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import Button from "../../../components/fundamentalComponents/button";
import useGetShippingMethods from "../../../hooks/apiHooks/useGetShippingMethods";
import formatCentsToDollars from "../../../utils/formatCentsToDollars";
import { IProductSelectedShippingMethod } from "../CheckoutPage";

import useStyles from "./checkoutShippingMethods.styles";
import getProductImageUrl from "../../../utils/getProductImageUrl";

interface ICheckoutShippingMethodsProps {
  productsSelectedShippingMethod: IProductSelectedShippingMethod[];
  setSelectedShippingMethodId: (
    selectedShippingMethodId: string | undefined,
    productId: string
  ) => void;
  products: IEntityReadDto[];
}

const CheckoutShippingMethods: React.FunctionComponent<
  ICheckoutShippingMethodsProps
> = (props: ICheckoutShippingMethodsProps) => {
  //#region Store
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );
  const shippingMethods = useAppSelector(
    (state) => state.shippingMethod.shippingMethods
  );
  const models = useAppSelector((state) => state.model.models);
  //#endregion Store

  //#region State
  const [
    isShowingOtherShippingMethodsForProduct,
    setIsShowingOtherShippingMethodsForProduct,
  ] = React.useState<{ [productId: string]: boolean }>({});
  //#endregion State

  //#region Hooks
  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getShippingMethods, loading: getShippingMethodsLoading } =
    useGetShippingMethods();

  //#endregion Hooks

  //#region Effects
  React.useEffect(() => {
    getShippingMethods();
  }, []);
  React.useEffect(() => {
    const newIsShowingOtherShippingMethodsForProduct = {
      ...isShowingOtherShippingMethodsForProduct,
    };
    props.products.forEach((product) => {
      newIsShowingOtherShippingMethodsForProduct[product._id.toString()] =
        Boolean(
          newIsShowingOtherShippingMethodsForProduct[product._id.toString()]
        );
    });
  }, [props.products]);
  //#endregion Effects

  const handleSelectShippingMethod =
    (shippingMethod: IShippingMethodReadDto, productId: string) => () => {
      props.setSelectedShippingMethodId(
        shippingMethod._id.toString(),
        productId
      );
      setIsShowingOtherShippingMethodsForProduct({
        ...isShowingOtherShippingMethodsForProduct,
        [productId]: false,
      });
    };

  return (
    <div className={styles.checkoutShippingMethodsContainer}>
      <h2 className={styles.shippingMethodTitle}>
        {getTranslatedText(staticText?.shippingMethod)}:
      </h2>
      {getShippingMethodsLoading && <Loading color={theme.primary} />}
      {!getShippingMethodsLoading &&
        props.products.map((product) => {
          {
            /* I'm using this logic to always show the selected shipping method at the top */
          }

          const allProductShippingMethods: (
            | IShippingMethodReadDto
            | undefined
          )[] = [
            ...(product.availableShippingMethods?.length
              ? (product.availableShippingMethods as IShippingMethodReadDto[])
              : shippingMethods),
          ];

          let shippingMethodsToShow: (IShippingMethodReadDto | undefined)[] = [
            ...allProductShippingMethods,
          ];

          const selectedShippingMethodIdForProduct =
            props.productsSelectedShippingMethod.find(
              (el) => el.productId === product._id.toString()
            )?.shippingMethodId;

          if (selectedShippingMethodIdForProduct) {
            shippingMethodsToShow = [
              shippingMethodsToShow.find(
                (shippingMethod) =>
                  shippingMethod?._id === selectedShippingMethodIdForProduct
              ) as IShippingMethodReadDto | undefined,
              ...shippingMethodsToShow.filter(
                (shippingMethod) =>
                  shippingMethod?._id.toString() !==
                  selectedShippingMethodIdForProduct
              ),
            ];
          }
          const actualShippingMethodsToShow =
            isShowingOtherShippingMethodsForProduct[product._id]
              ? allProductShippingMethods
              : shippingMethodsToShow;

          const productImage: string = getProductImageUrl({
            product: product,
            models,
          });

          return (
            <div
              key={product._id.toString()}
              className={
                styles.productInfoAndShippingMethodsAndActionsContainer
              }
            >
              <div className={styles.productInfoAndShippingMethodsContainer}>
                <div className={styles.productInfo}>
                  {productImage && (
                    <img className={styles.productImage} src={productImage} />
                  )}
                </div>
                <div className={styles.productShippingMethodsContainer}>
                  {actualShippingMethodsToShow.map((shippingMethod, i) => {
                    if (
                      !shippingMethod ||
                      (!isShowingOtherShippingMethodsForProduct[product._id] &&
                        i > 0)
                    )
                      return null;
                    return (
                      <div
                        key={shippingMethod._id.toString()}
                        className={
                          shippingMethod._id.toString() ===
                          selectedShippingMethodIdForProduct
                            ? styles.selectedShippingMethodInfo
                            : styles.shippingMethodInfo
                        }
                      >
                        <div className={styles.actionsAndPriceContainer}>
                          {selectedShippingMethodIdForProduct !==
                            shippingMethod._id.toString() && (
                            <span
                              className={styles.actionButton}
                              onClick={handleSelectShippingMethod(
                                shippingMethod,
                                product._id
                              )}
                            >
                              {getTranslatedText(staticText?.select)}
                            </span>
                          )}

                          <span className={styles.price}>
                            {formatCentsToDollars(
                              getTranslatedText(shippingMethod.price + "")
                            )}{" "}
                            {getTranslatedText(staticText?.moneyUnit)}
                          </span>
                        </div>

                        <div className={styles.horizontalDetails}>
                          <span className={styles.singleInfoValue}>
                            {getTranslatedText(shippingMethod.name)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.checkoutActions}>
                {allProductShippingMethods.length > 1 && (
                  <Button
                    onClick={() => {
                      const newValue = {
                        ...isShowingOtherShippingMethodsForProduct,
                      };
                      newValue[product._id] = !Boolean(
                        isShowingOtherShippingMethodsForProduct[product._id]
                      );
                      setIsShowingOtherShippingMethodsForProduct(newValue);
                    }}
                    theme={theme}
                    style={{
                      background: "transparent",
                      color: theme.darkerPrimary,
                      fontSize: 15,
                      padding: 0,
                    }}
                  >
                    {isShowingOtherShippingMethodsForProduct[product._id]
                      ? getTranslatedText(staticText?.hideOtherShippingMethods)
                      : getTranslatedText(staticText?.showOtherShippingMethods)}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CheckoutShippingMethods;
