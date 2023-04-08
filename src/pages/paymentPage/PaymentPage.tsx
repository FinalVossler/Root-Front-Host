import React from "react";

import PaymentForm from "../../components/paymentForm";

import { Theme } from "../../config/theme";
import withChat from "../../hoc/withChat";

import withWrapper from "../../hoc/wrapper";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./paymentPage.styles";

interface IPaymentPage {}
const PaymentPage: React.FunctionComponent<IPaymentPage> = (
  props: IPaymentPage
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  return (
    <div className={styles.paymentPageContainer}>
      <br />
      <br />

      <PaymentForm
        price={99.0}
        currency={"EURO"}
        title="Payment information:"
      />

      <br />
      <br />
    </div>
  );
};

export default withWrapper(withChat(PaymentPage));
