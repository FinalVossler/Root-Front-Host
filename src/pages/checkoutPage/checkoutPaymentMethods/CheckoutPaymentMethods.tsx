import React from "react";
import Loading from "react-loading";
import { IPaymentMethodReadDto, ITheme } from "roottypes";

import { useAppSelector } from "../../../store/hooks";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import Button from "../../../components/fundamentalComponents/button";

import useStyles from "./checkoutPaymentMethods.styles";
import useGetPaymentMethods from "../../../hooks/apiHooks/useGetPaymentMethods";

interface ICheckoutPaymentMethodsProps {
  selectedPaymentMethodId?: string;
  setSelectedPaymentMethodId: (
    selectedPaymentMethodId: string | undefined
  ) => void;
}

const CheckoutPaymentMethods: React.FunctionComponent<
  ICheckoutPaymentMethodsProps
> = (props: ICheckoutPaymentMethodsProps) => {
  //#region Store
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );
  const paymentMethods = useAppSelector(
    (state) => state.paymentMethod.paymentMethods
  );
  //#endregion Store

  //#region State
  const [isShowingOtherPaymentMethods, setIsShowingOtherPaymentMethods] =
    React.useState<boolean>(false);
  //#endregion State

  //#region Hooks
  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getPaymentMethods, loading: getPaymentMethodsLoading } =
    useGetPaymentMethods();

  //#endregion Hooks

  //#region Effects
  React.useEffect(() => {
    getPaymentMethods();
  }, []);
  //#endregion Effects

  const handleSelectPaymentMethod =
    (paymentMethod: IPaymentMethodReadDto) => () => {
      props.setSelectedPaymentMethodId(paymentMethod._id.toString());
      setIsShowingOtherPaymentMethods(false);
    };

  {
    /* I'm using this logic to always show the selected payment method at the top */
  }
  let paymentMethodsToShow: (IPaymentMethodReadDto | undefined)[] = [
    ...paymentMethods,
  ];
  if (props.selectedPaymentMethodId) {
    paymentMethodsToShow = [
      paymentMethodsToShow.find(
        (paymentMethod) => paymentMethod?._id === props.selectedPaymentMethodId
      ) as IPaymentMethodReadDto | undefined,
      ...paymentMethodsToShow.filter(
        (paymentMethod) =>
          paymentMethod?._id.toString() !== props.selectedPaymentMethodId
      ),
    ];
  }
  const actualPaymentMethodsToShow = isShowingOtherPaymentMethods
    ? paymentMethods
    : paymentMethodsToShow;
  return (
    <div className={styles.checkoutPaymentMethodsContainer}>
      <h2 className={styles.paymentMethodTitle}>
        {getTranslatedText(staticText?.paymentMethod)}:
      </h2>
      {getPaymentMethodsLoading && <Loading color={theme.primary} />}
      {!getPaymentMethodsLoading && (
        <React.Fragment>
          {actualPaymentMethodsToShow.map((paymentMethod, i) => {
            if (!paymentMethod || (!isShowingOtherPaymentMethods && i > 0))
              return null;
            return (
              <div
                key={paymentMethod._id.toString()}
                className={
                  paymentMethod._id.toString() === props.selectedPaymentMethodId
                    ? styles.selectedPaymentMethodInfo
                    : styles.paymentMethodInfo
                }
              >
                <div className={styles.actionsContainer}>
                  {props.selectedPaymentMethodId !==
                    paymentMethod._id.toString() && (
                    <span
                      className={styles.actionButton}
                      onClick={handleSelectPaymentMethod(paymentMethod)}
                    >
                      {getTranslatedText(staticText?.select)}
                    </span>
                  )}
                </div>

                <div className={styles.horizontalDetails}>
                  <span className={styles.singleInfoValue}>
                    {getTranslatedText(paymentMethod.name)}
                  </span>
                </div>
              </div>
            );
          })}

          <div className={styles.checkoutActions}>
            {paymentMethods.length > 1 && (
              <Button
                onClick={() =>
                  setIsShowingOtherPaymentMethods(!isShowingOtherPaymentMethods)
                }
                theme={theme}
                style={{
                  background: "transparent",
                  color: theme.darkerPrimary,
                  fontSize: 15,
                  padding: 0,
                }}
              >
                {isShowingOtherPaymentMethods
                  ? getTranslatedText(staticText?.hideOtherPaymentMethods)
                  : getTranslatedText(staticText?.showOtherPaymentMethods)}
              </Button>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default CheckoutPaymentMethods;
