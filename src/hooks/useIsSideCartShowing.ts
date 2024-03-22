import React from "react";

import { useAppSelector } from "../store/hooks";

const useIsSideCartShowing = (): boolean => {
  const cart = useAppSelector((state) => state.cart.cart);

  const isSideCartShowing = React.useMemo(
    () => Boolean(cart?.products && cart?.products.length > 0),
    [cart]
  );

  return isSideCartShowing;
};

export default useIsSideCartShowing;
