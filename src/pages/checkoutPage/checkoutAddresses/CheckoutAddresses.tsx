import React from "react";
import Loading from "react-loading";
import { IAddressReadDto, ITheme } from "roottypes";
import { BiPlus } from "react-icons/bi";

import { useAppSelector } from "../../../store/hooks";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import useGetUserAddresses from "../../../hooks/apiHooks/useGetUserAddresses";
import AddressInfo from "../addressInfo";
import AddressForm from "../addressForm/AddressForm";
import Button from "../../../components/fundamentalComponents/button";

import useStyles from "./checkoutAddresses.styles";

interface ICheckoutPageProps {
  selectedAddressId?: string;
  setSelectedAddressId: (selectedAddressId: string | undefined) => void;
}

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
      !props.selectedAddressId ||
      !currentUserAddresses.some(
        (a) => a._id.toString() === props.selectedAddressId
      )
    )
      props.setSelectedAddressId(defaultAddress?._id.toString());
  }, [currentUserAddresses]);
  //#endregion Effects

  const handleSelectAddress = (address: IAddressReadDto) => () => {
    props.setSelectedAddressId(address._id.toString());
    setIsShowingOtherAddresses(false);
  };

  if (!cart || !withEcommerce) return null;

  {
    /* I'm using this logic to always show the select address at the top */
  }
  let addressesToShow: (IAddressReadDto | undefined)[] = [
    ...currentUserAddresses,
  ];
  if (props.selectedAddressId) {
    addressesToShow = [
      currentUserAddresses.find((a) => a._id === props.selectedAddressId) as
        | IAddressReadDto
        | undefined,
      ...currentUserAddresses.filter(
        (a) => a._id.toString() !== props.selectedAddressId
      ),
    ];
  }
  return (
    <div className={styles.checkoutAddressesContainer}>
      {loading && <Loading color={theme.primary} />}
      {!loading && (
        <React.Fragment>
          {(isShowingOtherAddresses
            ? currentUserAddresses
            : addressesToShow
          ).map((address, i) => {
            if (!address || (!isShowingOtherAddresses && i > 0)) return null;
            return (
              <AddressInfo
                key={address._id}
                address={address}
                isSelected={address._id.toString() === props.selectedAddressId}
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

            {!isAddingAddress && currentUserAddresses.length > 0 && (
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
