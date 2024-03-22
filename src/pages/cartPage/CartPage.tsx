import React from "react";
import { ICartReadDto, IEntityReadDto, IModelReadDto, ITheme } from "roottypes";

import { useAppSelector } from "../../store/hooks";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

import getCartTotal from "../../utils/getCartTotal";
import Button from "../../components/fundamentalComponents/button";

import useStyles from "./cartPage.styles";
import CartProduct from "./cartProduct/CartProduct";

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
  const cart: ICartReadDto | undefined = useAppSelector(
    (state) => state.cart.cart
  );
  const models = useAppSelector((state) => state.model.models);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const isLoggedIn: boolean = useIsLoggedIn();

  if (!isLoggedIn || !cart) return null;

  return (
    <div className={styles.cartPageContainer}>
      <div className={styles.cartProducts}>
        {cart.products.map((productInfo, i) => {
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
              }}
            />
          );
        })}
      </div>

      <div className={styles.subTotalContainer}>
        <div className={styles.subTotalTitleAndValueContainer}>
          <span className={styles.subTotalTitle}>
            {getTranslatedText(staticText?.subTotal)}:
          </span>
          <span className={styles.subTotal}>{getCartTotal(cart)}$</span>
        </div>

        <Button theme={theme}>
          {getTranslatedText(staticText?.proceedToCheckout)}
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
