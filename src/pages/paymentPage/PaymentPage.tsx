import React from "react";
import { useTheme } from "react-jss";

import PaymentForm from "../../components/paymentForm";

import { Theme } from "../../config/theme";

import withWrapper from "../../hoc/wrapper";

import useStyles from "./paymentPage.styles";

interface IPaymentPage {}
const PaymentPage: React.FunctionComponent<IPaymentPage> = (
  props: IPaymentPage
) => {
  const theme: Theme = useTheme();
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

export default withWrapper(PaymentPage);
