import React from "react";
import { ITheme } from "roottypes";

import { useAppSelector } from "../../store/hooks";

import useStyles from "./checkoutPage.styles";
import AddressForm from "./addressForm/AddressForm";

interface ICheckoutPageProps {}

const CheckoutPage: React.FunctionComponent<ICheckoutPageProps> = (
  props: ICheckoutPageProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const cart = useAppSelector((state) => state.cart.cart);

  const styles = useStyles({ theme });

  if (!cart) return null;

  return (
    <div className={styles.checkoutPageContainer}>
      <AddressForm />
    </div>
  );
};

export default CheckoutPage;
