import { ITheme, IUserReadDto } from "roottypes";

import { useAppSelector } from "../../store/hooks";
import useStyles from "./ordersPage.styes";
import React from "react";
import useGetUserOrders from "../../hooks/apiHooks/useGetUserOrders";
import { useParams } from "react-router-dom";

interface IOrdersPageProps {}

const OrdersPage: React.FunctionComponent<IOrdersPageProps> = (
  props: IOrdersPageProps
) => {
  const { userId } = useParams();

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const { getUserOrders } = useGetUserOrders();

  React.useEffect(() => {
    if (userId) getUserOrders({ limit: 99, page }, userId);
  }, []);

  return <div className={styles.ordersPageContainer}></div>;
};

export default OrdersPage;
