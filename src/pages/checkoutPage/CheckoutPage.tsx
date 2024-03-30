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
import getCartProductsTotal from "../../utils/getCartProductsTotal";
import formatCentsToDollars from "../../utils/formatCentsToDollars";
import getCartShippingMethodsTotal from "../../utils/getCartShippingMethodsTotal";

export interface IProductSelectedShippingMethod {
  productId: string;
  shippingMethodId: string;
}

interface ICheckoutPageForm {
  addressId: string | undefined;
  paymentMethodId: string | undefined;
  productSelectedShippingMethods: IProductSelectedShippingMethod[];
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
      paymentMethodId: "",
      productSelectedShippingMethods: [],
    },
    validationSchema: Yup.object().shape({
      addressId: Yup.string().required(
        getTranslatedText(staticText?.addressRequired)
      ),
      paymentMethodId: Yup.string().required(
        getTranslatedText(staticText?.paymentMethodRequired)
      ),
      productSelectedShippingMethods: Yup.array().length(
        cart?.products.length || 0,
        getTranslatedText(staticText?.shippingMethodsError)
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
        products:
          cart?.products.map((p) => ({
            price: getProductPrice({
              product: p.product as IEntityReadDto,
              models,
            }),
            productId: (p.product as IEntityReadDto)._id.toString(),
            quantity: p.quantity,
            shippingMethodId:
              values.productSelectedShippingMethods.find(
                (el) =>
                  el.productId === (p.product as IEntityReadDto)._id.toString()
              )?.shippingMethodId || "",
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

    if (formik.errors.productSelectedShippingMethods) {
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
          products={
            cart?.products.map(
              (productInfo) => productInfo.product as IEntityReadDto
            ) || []
          }
          productsSelectedShippingMethod={
            formik.values.productSelectedShippingMethods
          }
          setSelectedShippingMethodId={(shippingMethodId, productId) => {
            const foundShippingMethod = Boolean(
              formik.values.productSelectedShippingMethods.find(
                (p) => p.productId === productId
              )?.shippingMethodId
            );

            if (foundShippingMethod) {
              formik.setFieldValue(
                "productSelectedShippingMethods",
                formik.values.productSelectedShippingMethods.map((p) =>
                  p.productId === productId ? { ...p, shippingMethodId } : p
                )
              );
            } else {
              formik.setFieldValue("productSelectedShippingMethods", [
                ...formik.values.productSelectedShippingMethods,
                { productId, shippingMethodId },
              ]);
            }
          }}
        />
        {formik.errors.productSelectedShippingMethods && (
          <span className={styles.error}>
            {formik.errors.productSelectedShippingMethods}
          </span>
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
                {formatCentsToDollars(getCartProductsTotal(cart))}
                {getTranslatedText(staticText?.moneyUnit)}
              </span>
            </span>
            <div className={styles.shippingMethodPriceContainer}>
              <span>{getTranslatedText(staticText?.shipping)}: </span>
              <span>
                {formatCentsToDollars(
                  getCartShippingMethodsTotal({
                    productsInfo: cart.products.map((productInfo) => {
                      const selectedShippingMethodId =
                        formik.values.productSelectedShippingMethods.find(
                          (el) =>
                            el.productId ===
                            (productInfo.product as IEntityReadDto)._id
                        )?.shippingMethodId;
                      return {
                        product: productInfo.product as IEntityReadDto,
                        quantity: productInfo.quantity,
                        shippingMethod: shippingMethods.find(
                          (shippingMethod) =>
                            shippingMethod._id.toString() ===
                            selectedShippingMethodId
                        ),
                      };
                    }),
                  })
                )}
                {getTranslatedText(staticText?.moneyUnit)}
              </span>
            </div>
            <span className={styles.total}>
              <span>{getTranslatedText(staticText?.total)}: </span>
              <span>
                {formatCentsToDollars(
                  getCartTotal(
                    cart,
                    formik.values.productSelectedShippingMethods,
                    shippingMethods
                  )
                )}
                {getTranslatedText(staticText?.moneyUnit)}
              </span>
            </span>
          </React.Fragment>
        )}
        <Button
          onClick={handleSubmit}
          theme={theme}
          disabled={createOrderLoading || Object.keys(formik.errors).length > 0}
        >
          {getTranslatedText(staticText?.placeYourOrderAndPay)}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
