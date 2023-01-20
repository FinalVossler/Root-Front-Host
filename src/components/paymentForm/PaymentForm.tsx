import React from "react";
import { useTheme } from "react-jss";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

import { Theme } from "../../config/theme";

import useStyles from "./paymentForm.styles";
import Button from "../button";

interface IPaymentForm {
  price: number;
  currency: string;
  title: string;
}
const Profile: React.FunctionComponent<IPaymentForm> = (
  props: IPaymentForm
) => {
  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      toast.error(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const options = {
    style: {
      base: {
        color: theme.textColor,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: theme.subtleColor,
        },
      },
      invalid: {
        color: theme.errorColor,
        iconColor: theme.errorColor,
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className={styles.paymentFormContainer}>
      <h2 className={styles.paymentFormTitle}>
        {props.currency} {props.price}
      </h2>
      <h4 className={styles.productName}>{props.title}</h4>

      <div className={styles.inputsContainer}>
        <input
          className={styles.nameInput}
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          autoComplete="cardholder"
        />

        <CardElement className={styles.cardInput} options={options} />
      </div>

      <Button disabled={!stripe}>Pay</Button>
    </form>
  );
};

export default Profile;
