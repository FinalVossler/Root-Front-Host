import React from "react";
import { ICartReadDto, IEntityReadDto, IModelReadDto, ITheme } from "roottypes";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

import getCartProductsTotal from "../../utils/getCartProductsTotal";
import Button from "../../components/fundamentalComponents/button";

import CartProduct from "./cartProduct/CartProduct";
import useStyles from "./cartPage.styles";
import getCartTotalProducts from "../../utils/getCartTotalProducts";
import formatCentsToDollars from "../../utils/formatCentsToDollars";

interface ICartPageProps {}

const CartPage: React.FunctionComponent<ICartPageProps> = (
  props: ICartPageProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );
  const checkoutStaticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );
  const cart: ICartReadDto | undefined = useAppSelector(
    (state) => state.cart.cart
  );
  const models = useAppSelector((state) => state.model.models);
  const withEcommerce = useAppSelector(
    (state) => state.websiteConfiguration.withEcommerce
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const isLoggedIn: boolean = useIsLoggedIn();

  if (!isLoggedIn || !cart || !withEcommerce) return null;

  return (
    <div className={styles.cartPageContainer}>
      <div className={styles.cartPageLeft}>
        <div className={styles.cartProducts}>
          <div className={styles.yourCartTitle}>
            {getTranslatedText(staticText?.yourCart)}
          </div>
          <span className={styles.priceTitle}>
            {getTranslatedText(staticText?.price)}
          </span>
          {cart.products
            .filter((p) => !p.sided)
            .map((productInfo, i) => {
              return (
                <CartProduct
                  key={i}
                  model={models.find(
                    (model) =>
                      model._id.toString() ===
                      (
                        (productInfo.product as IEntityReadDto)
                          .model as IModelReadDto
                      )._id.toString()
                  )}
                  productInfo={{
                    product: productInfo.product as IEntityReadDto,
                    quantity: productInfo.quantity,
                    sided: Boolean(productInfo.sided),
                  }}
                />
              );
            })}
          <CartSubTotal />
        </div>

        {cart.products.filter((p) => p.sided).length > 0 && (
          <div className={styles.cartSidedProducts}>
            <div className={styles.sidedProductsTitle}>
              {getTranslatedText(staticText?.sidedProducts)}
            </div>
            <span className={styles.priceTitle}>
              {getTranslatedText(staticText?.price)}
            </span>
            {cart.products
              .filter((p) => p.sided)
              .map((productInfo, i) => {
                return (
                  <CartProduct
                    key={i}
                    model={models.find(
                      (model) =>
                        model._id.toString() ===
                        (
                          (productInfo.product as IEntityReadDto)
                            .model as IModelReadDto
                        )._id.toString()
                    )}
                    productInfo={{
                      product: productInfo.product as IEntityReadDto,
                      quantity: productInfo.quantity,
                      sided: Boolean(productInfo.sided),
                    }}
                  />
                );
              })}
          </div>
        )}
      </div>

      <CartSideSubtotal />
    </div>
  );
};

const CartSubTotal = () => {
  const theme = useAppSelector((state) => state.websiteConfiguration.theme);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );
  const checkoutStaticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );
  const cart = useAppSelector((state) => state.cart.cart);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  if (!cart) return null;

  return (
    <div className={styles.subTotalContainer}>
      <div className={styles.subTotalTitleAndValueContainer}>
        <span className={styles.subTotalTitle}>
          {getTranslatedText(staticText?.subTotal)} (
          {getCartTotalProducts(cart)} {getTranslatedText(staticText?.articles)}
          ):
        </span>
        <span className={styles.subTotal}>
          {formatCentsToDollars(getCartProductsTotal(cart))}{" "}
          {getTranslatedText(checkoutStaticText?.moneyUnit)}
        </span>
      </div>
    </div>
  );
};

const CartSideSubtotal = () => {
  const theme = useAppSelector((state) => state.websiteConfiguration.theme);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );
  const cart = useAppSelector((state) => state.cart.cart);
  const checkoutStaticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  if (!cart) return null;

  return (
    <div className={styles.sideSubTotalContainer}>
      <div className={styles.subTotalTitleAndValueContainer}>
        <span className={styles.subTotalTitle}>
          {getTranslatedText(staticText?.subTotal)} (
          {getCartTotalProducts(cart)} {getTranslatedText(staticText?.articles)}
          ):
        </span>
        <span className={styles.subTotal}>
          {formatCentsToDollars(getCartProductsTotal(cart))}
          {getTranslatedText(checkoutStaticText?.moneyUnit)}
        </span>
      </div>

      <Link to="/checkout">
        <Button theme={theme} disabled={getCartTotalProducts(cart) === 0}>
          {getTranslatedText(staticText?.proceedToCheckout)}
        </Button>
      </Link>
    </div>
  );
};

export default CartPage;
