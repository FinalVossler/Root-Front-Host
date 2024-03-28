import React from "react";
import {
  IAddressReadDto,
  IEntityReadDto,
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
import Loading from "react-loading";
import CheckoutPaymentMethods from "./checkoutPaymentMethods";
import getCartTotal from "../../utils/getCartTotal";
import getCartSubTotal from "../../utils/getCartSubTotal";
import formatCentsToDollars from "../../utils/formatCentsToDollars";

interface ICheckoutPageForm {
  addressId: string | undefined;
  shippingMethodId: string | undefined;
  paymentMethodId: string | undefined;
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
  const shippingMethods = useAppSelector(
    (state) => state.shippingMethod.shippingMethods
  );
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
      paymentMethodId: "",
    },
    validationSchema: Yup.object().shape({
      addressId: Yup.string().required(
        getTranslatedText(staticText?.addressRequired)
      ),
      shippingMethodId: Yup.string().required(
        getTranslatedText(staticText?.shippingMethodRequired)
      ),
      paymentMethodId: Yup.string().required(
        getTranslatedText(staticText?.paymentMethodRequired)
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
        paymentMethodId: values.paymentMethodId as string,
        shippingMethodId: values.shippingMethodId as string,
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
        status: OrderStatusEnum.Pending,
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
      <div className={styles.left}>
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

        <CheckoutPaymentMethods
          selectedPaymentMethodId={formik.values.paymentMethodId}
          setSelectedPaymentMethodId={(paymentMethodId) =>
            formik.setFieldValue("paymentMethodId", paymentMethodId)
          }
        />
        {formik.errors.paymentMethodId && (
          <span className={styles.error}>{formik.errors.paymentMethodId}</span>
        )}
      </div>

      <div className={styles.right}>
        {createOrderLoading && <Loading color={theme.primary} />}

        {cart && (
          <React.Fragment>
            <span className={styles.productsTotalContainer}>
              <span>{getTranslatedText(staticText?.productsTotal)}: </span>
              <span>
                {formatCentsToDollars(getCartSubTotal(cart))}
                {getTranslatedText(staticText?.moneyUnit)}
              </span>
            </span>
            {formik.values.shippingMethodId &&
              shippingMethods.find(
                (s) =>
                  s._id.toString() ===
                  formik.values.shippingMethodId?.toString()
              ) && (
                <div className={styles.shippingMethodPriceContainer}>
                  <span>{getTranslatedText(staticText?.shipping)}: </span>
                  <span>
                    {formatCentsToDollars(
                      shippingMethods.find(
                        (s) =>
                          s._id.toString() ===
                          formik.values.shippingMethodId?.toString()
                      )?.price || 0
                    )}
                    {getTranslatedText(staticText?.moneyUnit)}
                  </span>
                </div>
              )}
            <span className={styles.total}>
              <span>{getTranslatedText(staticText?.total)}: </span>
              <span>
                {formatCentsToDollars(
                  getCartTotal(
                    cart,
                    shippingMethods.find(
                      (s) =>
                        s._id.toString() ===
                        formik.values.shippingMethodId?.toString()
                    )
                  )
                )}
                {getTranslatedText(staticText?.moneyUnit)}
              </span>
            </span>
          </React.Fragment>
        )}

        {!createOrderLoading && (
          <Button
            onClick={handleSubmit}
            theme={theme}
            disabled={
              createOrderLoading || Object.keys(formik.errors).length > 0
            }
          >
            {getTranslatedText(staticText?.placeYourOrderAndPay)}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
