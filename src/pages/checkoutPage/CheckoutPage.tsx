import React from "react";
import {
  IAddressReadDto,
  IEntityReadDto,
  IModelReadDto,
  IOrderCreateCommand,
  ITheme,
  OrderStatusEnum,
} from "roottypes";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAppSelector } from "../../store/hooks";

import useStyles from "./checkoutPage.styles";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import CheckoutAddresses from "./checkoutAddresses";
import CheckoutShippingMethods from "./checkoutShippingMethods";
import useCreateOrder from "../../hooks/apiHooks/useCreateOrder";
import Button from "../../components/fundamentalComponents/button";
import getProductPrice from "../../utils/getProductPrice";
import { toast } from "react-toastify";
import getCartTotal from "../../utils/getCartTotal";
import Loading from "react-loading";

interface ICheckoutPageForm {
  addressId: string | undefined;
  shippingMethodId: string | undefined;
}

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
  const cart = useAppSelector((state) => state.cart.cart);
  const currentUserAddresses = useAppSelector(
    (state) => state.address.currentUserAddresses
  );
  const currentUser = useAppSelector((state) => state.user.user);
  const models = useAppSelector((state) => state.model.models);
  //#endregion Store

  //#region State
  //#endregion State

  //#region Hooks
  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createOrder, loading: createOrderLoading } = useCreateOrder();
  const formik = useFormik<ICheckoutPageForm>({
    initialValues: {
      addressId: "",
      shippingMethodId: "",
    },
    validationSchema: Yup.object().shape({
      addressId: Yup.string().required(
        getTranslatedText(staticText?.addressRequired)
      ),
      shippingMethodId: Yup.string().required(
        getTranslatedText(staticText?.shippingMethodRequired)
      ),
    }),
    onSubmit: async (values) => {
      const address: IAddressReadDto | undefined = currentUserAddresses.find(
        (a) => a._id.toString() === values.addressId
      );

      if (!address) return toast.error("Problem with address");
      if (!cart) return toast.error("Cart not found");

      const orderCreateCommand: IOrderCreateCommand = {
        date: new Date().toString(),
        paymentMethodId: "",
        products:
          cart?.products.map((p) => ({
            price: getProductPrice({
              product: p.product as IEntityReadDto,
              models,
            }),
            productId: (p.product as IEntityReadDto)._id.toString(),
            quantity: p.quantity,
          })) || [],
        shippingAddress: {
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          country: address.country,
          postalCode: address.postalCode,
          region: address.region,
        },
        shippingMethodId: values.shippingMethodId as string,
        status: OrderStatusEnum.Pending,
        total: getCartTotal(cart),
        userId: currentUser._id.toString(),
      };
      createOrder(orderCreateCommand);
    },
  });
  //#endregion Hooks

  //#region Effects
  //#endregion Effects

  //#region Event listeners
  const handleSubmit = () => {
    let error: boolean = false;
    if (formik.errors.addressId) {
      error = true;
      toast.error(getTranslatedText(staticText?.addressRequired));
    }

    if (formik.errors.shippingMethodId) {
      error = true;
      toast.error(getTranslatedText(staticText?.shippingMethodRequired));
    }

    if (error) return;

    formik.handleSubmit();
  };
  //#endregion Event listeners

  return (
    <div className={styles.checkoutPageContainer}>
      <CheckoutAddresses
        selectedAddressId={formik.values.addressId}
        setSelectedAddressId={(addressId) =>
          formik.setFieldValue("addressId", addressId)
        }
      />
      {formik.errors.addressId && (
        <span className={styles.error}>{formik.errors.addressId}</span>
      )}
      <CheckoutShippingMethods
        selectedShippingMethodId={formik.values.shippingMethodId}
        setSelectedShippingMethodId={(shippingMethodId) =>
          formik.setFieldValue("shippingMethodId", shippingMethodId)
        }
      />
      {formik.errors.shippingMethodId && (
        <span className={styles.error}>{formik.errors.shippingMethodId}</span>
      )}

      {createOrderLoading && <Loading color={theme.primary} />}

      {!createOrderLoading && (
        <Button
          onClick={handleSubmit}
          theme={theme}
          disabled={createOrderLoading}
          style={{ marginTop: 20 }}
        >
          {getTranslatedText(staticText?.placeYourOrderAndPay)}
        </Button>
      )}
    </div>
  );
};

export default CheckoutPage;
