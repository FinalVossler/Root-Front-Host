import React from "react";
import { ITheme } from "roottypes";

import { useAppSelector } from "../../store/hooks";

import useStyles from "./checkoutPage.styles";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useGetPaymentMethods from "../../hooks/apiHooks/useGetPaymentMethods";
import CheckoutAddresses from "./checkoutAddresses";

interface ICheckoutPageProps {}

const CheckoutPage: React.FunctionComponent<ICheckoutPageProps> = (
  props: ICheckoutPageProps
) => {
  //#region Store
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );
  //#endregion Store

  //#region State
  const [selectedAddressId, setSelectedAddressId] = React.useState<
    string | undefined
  >();
  //#endregion State

  //#region Hooks
  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getPaymentMethods } = useGetPaymentMethods();
  //#endregion Hooks

  //#region Effects
  React.useEffect(() => {
    getPaymentMethods();
  }, []);
  //#endregion Effects
  return (
    <div className={styles.checkoutPageContainer}>
      <CheckoutAddresses
        selectedAddressId={selectedAddressId}
        setSelectedAddressId={setSelectedAddressId}
      />
    </div>
  );
};

export default CheckoutPage;
