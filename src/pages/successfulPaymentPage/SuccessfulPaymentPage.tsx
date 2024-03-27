import React from "react";
import { IOrderReadDto, ITheme } from "roottypes";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Loading from "react-loading";
import { toast } from "react-toastify";

import useStyles from "./successfulPaymentPage.styles";
import { useAppSelector } from "../../store/hooks";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useGetIsPaymentSuccessful from "../../hooks/apiHooks/useGetIsPaymentSuccessful";
import Button from "../../components/fundamentalComponents/button";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import Unauthorized from "../../components/fundamentalComponents/unauthorized";

interface ISuccessfulPaymentPageProps {}

const SuccessfulPaymentPage: React.FunctionComponent<
  ISuccessfulPaymentPageProps
> = (props: ISuccessfulPaymentPageProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.successfulPayment
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

  if (!isLoggedIn) {
    return <Unauthorized theme={theme} />;
  }

  return (
    <div className={styles.successfulPaymentPageContainer}>
      {loading && <Loading color={theme.primary} />}

      {!loading && isPaymentSuccessful === true && (
        <React.Fragment>
          <FaCheckCircle fontSize={70} color={theme.primary} />
          <h1 className={styles.success}>
            {getTranslatedText(staticText?.success)}!
          </h1>
          <h2 className={styles.successfulPaymentTitle}>
            {getTranslatedText(staticText?.successfulPaymentTitle)}
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
      {!loading && isPaymentSuccessful === false && <div>{":("}</div>}
    </div>
  );
};

export default SuccessfulPaymentPage;
