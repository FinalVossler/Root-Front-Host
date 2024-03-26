import React from "react";
import Loading from "react-loading";
import { IShippingMethodReadDto, ITheme } from "roottypes";

import { useAppSelector } from "../../../store/hooks";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import Button from "../../../components/fundamentalComponents/button";

import useStyles from "./checkoutShippingMethods.styles";
import useGetShippingMethods from "../../../hooks/apiHooks/useGetShippingMethods";

interface ICheckoutShippingMethodsProps {
  selectedShippingMethodId?: string;
  setSelectedShippingMethodId: (
    selectedShippingMethodId: string | undefined
  ) => void;
}

const CheckoutShippingMethods: React.FunctionComponent<
  ICheckoutShippingMethodsProps
> = (props: ICheckoutShippingMethodsProps) => {
  //#region Store
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const withEcommerce = useAppSelector(
    (state) => state.websiteConfiguration.withEcommerce
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );
  const shippingMethods = useAppSelector(
    (state) => state.shippingMethod.shippingMethods
  );
  //#endregion Store

  //#region State
  const [isShowingOtherShippingMethods, setIsShowingOtherShippingMethods] =
    React.useState<boolean>(false);
  //#endregion State

  //#region Hooks
  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getShippingMethods, loading: getShippingMethodsLoading } =
    useGetShippingMethods();

  //#endregion Hooks

  //#region Effects
  React.useEffect(() => {
    getShippingMethods();
  }, []);
  //#endregion Effects

  const handleSelectShippingMethod =
    (shippingMethod: IShippingMethodReadDto) => () => {
      props.setSelectedShippingMethodId(shippingMethod._id.toString());
      setIsShowingOtherShippingMethods(false);
    };

  {
    /* I'm using this logic to always show the selected shipping method at the top */
  }
  let shippingMethodsToShow: (IShippingMethodReadDto | undefined)[] = [
    ...shippingMethods,
  ];
  if (props.selectedShippingMethodId) {
    shippingMethodsToShow = [
      shippingMethodsToShow.find(
        (shippingMethod) =>
          shippingMethod?._id === props.selectedShippingMethodId
      ) as IShippingMethodReadDto | undefined,
      ...shippingMethodsToShow.filter(
        (shippingMethod) =>
          shippingMethod?._id.toString() !== props.selectedShippingMethodId
      ),
    ];
  }
  const actualShippingMethodsToShow = isShowingOtherShippingMethods
    ? shippingMethods
    : shippingMethodsToShow;
  return (
    <div className={styles.checkoutShippingMethodsContainer}>
      <h2 className={styles.shippingMethodTitle}>
        {getTranslatedText(staticText?.shippingMethod)}:
      </h2>
      {getShippingMethodsLoading && <Loading color={theme.primary} />}
      {!getShippingMethodsLoading && (
        <React.Fragment>
          {actualShippingMethodsToShow.map((shippingMethod, i) => {
            if (!shippingMethod || (!isShowingOtherShippingMethods && i > 0))
              return null;
            return (
              <div
                key={shippingMethod._id.toString()}
                className={
                  shippingMethod._id.toString() ===
                  props.selectedShippingMethodId
                    ? styles.selectedShippingMethodInfo
                    : styles.shippingMethodInfo
                }
              >
                <div className={styles.actionsContainer}>
                  {props.selectedShippingMethodId !==
                    shippingMethod._id.toString() && (
                    <span
                      className={styles.actionButton}
                      onClick={handleSelectShippingMethod(shippingMethod)}
                    >
                      {getTranslatedText(staticText?.select)}
                    </span>
                  )}
                </div>

                <div className={styles.horizontalDetails}>
                  <span className={styles.singleInfoTitle}>
                    {getTranslatedText(staticText?.shippingMethod)}:
                  </span>
                  <span className={styles.singleInfoValue}>
                    {getTranslatedText(shippingMethod.name)}
                  </span>
                </div>
                <div className={styles.horizontalDetails}>
                  <span className={styles.singleInfoTitle}>
                    {getTranslatedText(staticText?.price)}:{" "}
                  </span>
                  <span className={styles.singleInfoValue}>
                    {getTranslatedText(shippingMethod.price + "")}$
                  </span>
                </div>
              </div>
            );
          })}

          <div className={styles.checkoutActions}>
            {shippingMethods.length > 1 && (
              <Button
                onClick={() =>
                  setIsShowingOtherShippingMethods(
                    !isShowingOtherShippingMethods
                  )
                }
                theme={theme}
                style={{
                  background: "transparent",
                  color: theme.darkerPrimary,
                  fontSize: 15,
                  padding: 0,
                }}
              >
                {isShowingOtherShippingMethods
                  ? getTranslatedText(staticText?.hideOtherShippingMethods)
                  : getTranslatedText(staticText?.showOtherShippingMethods)}
              </Button>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default CheckoutShippingMethods;
