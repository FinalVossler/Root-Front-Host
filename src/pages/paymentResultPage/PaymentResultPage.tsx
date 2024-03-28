import React from "react";
import { IOrderReadDto, ITheme } from "roottypes";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Loading from "react-loading";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";

import useStyles from "./paymentResultPage.styles";
import { useAppSelector } from "../../store/hooks";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useGetIsPaymentSuccessful from "../../hooks/apiHooks/useGetIsPaymentSuccessful";
import Button from "../../components/fundamentalComponents/button";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import Unauthorized from "../../components/fundamentalComponents/unauthorized";

interface ISuccessfulPaymentPageProps {}

const PaymentResultPage: React.FunctionComponent<
  ISuccessfulPaymentPageProps
> = (props: ISuccessfulPaymentPageProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.paymentResult
  );
  const { orderId } = useParams();

  const [isPaymentSuccessful, setIsPaymentSuccessful] = React.useState<
    boolean | undefined
  >(undefined);
  const [order, setOrder] = React.useState<IOrderReadDto | undefined>(
    undefined
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getIsPaymentSuccessful, loading } = useGetIsPaymentSuccessful();
  const isLoggedIn: boolean = useIsLoggedIn();

  React.useEffect(() => {
    if (!orderId) {
      toast.error(getTranslatedText(staticText?.orderIdMissingInUrl));
    }
    getIsPaymentSuccessful(orderId as string).then((res) => {
      setIsPaymentSuccessful(res.isPaymentSuccessful);
      setOrder(res.order);
    });
  }, [orderId]);

  const handleRetry = () => {
    if (order && order?.checkoutSessionUrl.length > 0) {
      window.location.href = order.checkoutSessionUrl;
    } else {
      toast.error(getTranslatedText(staticText?.errorFindingCheckoutSession));
    }
  };

  if (!isLoggedIn) {
    return <Unauthorized theme={theme} />;
  }

  return (
    <div className={styles.paymentResultPageContainer}>
      {loading && <Loading color={theme.primary} />}

      {!loading && isPaymentSuccessful === true && (
        <React.Fragment>
          <FaCheckCircle fontSize={70} color={theme.primary} />
          <h1 className={styles.success}>
            {getTranslatedText(staticText?.success)}!
          </h1>
          <h2 className={styles.paymentTitle}>
            {getTranslatedText(staticText?.paymentResultTitle)}
          </h2>
          <span className={styles.confirmationEmailNotice}>
            {getTranslatedText(staticText?.confirmationEmailNotice)}
          </span>

          <Link to="/">
            <Button theme={theme} style={{ marginTop: 50 }}>
              {getTranslatedText(staticText?.continueShopping)}
            </Button>
          </Link>
        </React.Fragment>
      )}

      {!loading && !isPaymentSuccessful === true && (
        <React.Fragment>
          <ImCross fontSize={70} color={theme.errorColor} />
          <h1 className={styles.success} style={{ color: theme.errorColor }}>
            {getTranslatedText(staticText?.failure)}!
          </h1>
          <h2 className={styles.paymentTitle}>
            {getTranslatedText(staticText?.failedOrUnporcessedPayment)}
          </h2>

          <span className={styles.retryOrContinueShopping}>
            {getTranslatedText(staticText?.retryOrContinueShopping)}
          </span>

          <div className={styles.actions}>
            <Link to="/">
              <Button theme={theme} style={{ marginRight: 10 }}>
                {getTranslatedText(staticText?.continueShopping)}
              </Button>
            </Link>
            <Button theme={theme} onClick={handleRetry}>
              {getTranslatedText(staticText?.retry)}
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default PaymentResultPage;
