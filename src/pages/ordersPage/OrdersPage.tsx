import { ITheme, IUserReadDto } from "roottypes";

import { useAppSelector } from "../../store/hooks";
import useStyles from "./ordersPage.styes";
import React from "react";
import useGetUserOrders from "../../hooks/apiHooks/useGetUserOrders";
import { useParams } from "react-router-dom";
import OrderInfo from "../orderInfo/OrderInfo";
import Loading from "react-loading";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";

interface IOrdersPageProps {}

const OrdersPage: React.FunctionComponent<IOrdersPageProps> = (
  props: IOrdersPageProps
) => {
  const { userId } = useParams();

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.orders
  );
  const user: IUserReadDto = useAppSelector((state) => state.user.user);
  const userOrders = useAppSelector((state) => state.order.userOrders).find(
    (userOrder) => userOrder.userId.toString() === user._id.toString()
  );

  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const { getUserOrders, loading } = useGetUserOrders();
  const getTranslatedText = useGetTranslatedText();

  React.useEffect(() => {
    if (userId) getUserOrders({ limit: 99, page }, userId);
  }, []);

  return (
    <div className={styles.ordersPageContainer}>
      <h2 className={styles.ordersTitle}>
        {getTranslatedText(
          userId === user._id ? staticText?.myOrders : staticText?.orders
        )}
        :
      </h2>
      {loading && <Loading color={theme.primary} />}
      {userOrders &&
        !loading &&
        userOrders.orders.map((order) => {
          return <OrderInfo key={order._id.toString()} order={order} />;
        })}
    </div>
  );
};

export default OrdersPage;
