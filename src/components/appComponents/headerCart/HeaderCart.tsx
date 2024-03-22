import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { ICartReadDto, ITheme } from "roottypes";

import { useAppSelector } from "../../../store/hooks";

import withNotifications from "../../../hoc/withNotifications";
import HeaderOptionNotificationSignal from "../headerOptionNotificationSignal";

import useStyles from "./headerCart.styles";
import { useNavigate } from "react-router-dom";

interface IHeaderCartProps {}

const HeaderCart: React.FunctionComponent<IHeaderCartProps> = (
  props: IHeaderCartProps
) => {
  //#region Store
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const cart: ICartReadDto | undefined = useAppSelector(
    (state) => state.cart.cart
  );

  //#endregion Store

  const styles = useStyles({ theme });
  const navigate = useNavigate();

  //#region Hooks
  //#endregion Hooks

  //#region Event listeners
  const handleNavigateToCartPage = () => {
    navigate("/cart");
  };
  //#endregion Event listeners

  const total: number = React.useMemo(
    () => cart?.products.reduce((acc, curr) => acc + curr.quantity, 0) || 0,
    [cart]
  );
  return (
    <div className={styles.headerCartContainer}>
      <FiShoppingCart
        className={styles.cartIcon}
        onClick={handleNavigateToCartPage}
      />

      <HeaderOptionNotificationSignal numberOfNotifications={total} />
    </div>
  );
};

export default withNotifications(React.memo(HeaderCart));
