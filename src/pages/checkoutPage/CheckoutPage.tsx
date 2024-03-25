import React from "react";
import Loading from "react-loading";
import { IAddressReadDto, ITheme } from "roottypes";

import AddressForm from "./addressForm/AddressForm";
import { useAppSelector } from "../../store/hooks";
import AddressInfo from "./addressInfo";
import useGetUserAddresses from "../../hooks/apiHooks/useGetUserAddresses";

import useStyles from "./checkoutPage.styles";
import Button from "../../components/fundamentalComponents/button";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { BiPlus } from "react-icons/bi";

interface ICheckoutPageProps {}

const CheckoutPage: React.FunctionComponent<ICheckoutPageProps> = (
  props: ICheckoutPageProps
) => {
  //#region Store
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const cart = useAppSelector((state) => state.cart.cart);
  const currentUserAddresses = useAppSelector(
    (state) => state.address.currentUserAddresses
  );
  const currentUser = useAppSelector((state) => state.user.user);
  const withEcommerce = useAppSelector(
    (state) => state.websiteConfiguration.withEcommerce
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );
  //#endregion Store

  //#region State
  const [selectedAddressId, setSelectedAddressId] = React.useState<
    string | undefined
  >();

  const [isAddingAddress, setIsAddingAddress] = React.useState<boolean>(false);
  const [isShowingOtherAddresses, setIsShowingOtherAddresses] =
    React.useState<boolean>(false);
  //#endregion State

  //#region Hooks
  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getUserAddresses, loading } = useGetUserAddresses();
  //#endregion Hooks

  //#region Effects
  React.useEffect(() => {
    getUserAddresses(currentUser._id.toString());
  }, []);
  React.useEffect(() => {
    const defaultAddress =
      currentUserAddresses.length > 0
        ? currentUserAddresses.find((address) => Boolean(address.isDefault)) ||
          currentUserAddresses[0]
        : undefined;
    if (
      !selectedAddressId ||
      !currentUserAddresses.some((a) => a._id.toString() === selectedAddressId)
    )
      setSelectedAddressId(defaultAddress?._id.toString());
  }, [currentUserAddresses]);
  //#endregion Effects

  const handleSelectAddress = (address: IAddressReadDto) => () => {
    setSelectedAddressId(address._id.toString());
    setIsShowingOtherAddresses(false);
  };

  if (!cart || !withEcommerce) return null;

  {
    /* I'm using this logic to always show the select address at the top */
  }
  let addressesToShow = [...currentUserAddresses];
  if (selectedAddressId) {
    addressesToShow = [
      currentUserAddresses.find(
        (a) => a._id === selectedAddressId
      ) as IAddressReadDto,
      ...currentUserAddresses.filter(
        (a) => a._id.toString() !== selectedAddressId
      ),
    ];
  }
  return (
    <div className={styles.checkoutPageContainer}>
      {loading && <Loading color={theme.primary} />}
      {!loading && (
        <React.Fragment>
          {(isShowingOtherAddresses
            ? currentUserAddresses
            : addressesToShow
          ).map((address, i) => {
            if (!isShowingOtherAddresses && i > 0) return null;
            return (
              <AddressInfo
                key={address._id}
                address={address}
                isSelected={address._id.toString() === selectedAddressId}
                onSelect={handleSelectAddress(address)}
              />
            );
          })}

          {(currentUserAddresses.length === 0 || isAddingAddress) && (
            <AddressForm
              onSubmit={() => setIsAddingAddress(false)}
              onCancelClick={() => setIsAddingAddress(false)}
            />
          )}

          <div className={styles.checkoutActions}>
            {currentUserAddresses.length > 1 && (
              <Button
                onClick={() =>
                  setIsShowingOtherAddresses(!isShowingOtherAddresses)
                }
                theme={theme}
              >
                {isShowingOtherAddresses
                  ? getTranslatedText(staticText?.hideOtherAddresses)
                  : getTranslatedText(staticText?.showOtherAddresses)}
              </Button>
            )}

            {!isAddingAddress && (
              <Button
                onClick={() => setIsAddingAddress(!isAddingAddress)}
                theme={theme}
              >
                {getTranslatedText(staticText?.addAddress)}{" "}
                <BiPlus style={{ marginLeft: 10 }} />
              </Button>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default CheckoutPage;
