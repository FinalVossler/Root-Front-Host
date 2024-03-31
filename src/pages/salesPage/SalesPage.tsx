import { ITheme, IUserReadDto } from "roottypes";
import Loading from "react-loading";
import React from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import Pagination from "../../components/fundamentalComponents/pagination";
import useGetUserSales from "../../hooks/apiHooks/useGetUserSales";

import useStyles from "./salesPage.styles";
import OrderInfo from "../ordersPage/orderInfo/OrderInfo";

interface ISalesPageProps {}

const SalesPage: React.FunctionComponent<ISalesPageProps> = (
  props: ISalesPageProps
) => {
  const { userId } = useParams();

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.orders
  );
  const user: IUserReadDto = useAppSelector((state) => state.user.user);
  const userSales = useAppSelector((state) => state.order.userSales).find(
    (userOrder) => userOrder.userId.toString() === user._id.toString()
  );

  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(99);

  const styles = useStyles({ theme });
  const { getUserSales, loading } = useGetUserSales();
  const getTranslatedText = useGetTranslatedText();

  React.useEffect(() => {
    if (userId) getUserSales({ limit, page }, userId);
  }, [page, userId, limit]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className={styles.salesPageContainer}>
      <h2 className={styles.salesTitle}>
        {getTranslatedText(
          userId === user._id ? staticText?.mySales : staticText?.sales
        )}
      </h2>
      {loading && <Loading color={theme.primary} />}
      {userSales &&
        !loading &&
        userSales.orders.map((order) => {
          return <OrderInfo key={order._id.toString()} order={order} />;
        })}

      <Pagination
        page={page}
        total={userSales?.total || 0}
        limit={limit}
        onPageChange={handlePageChange}
        theme={theme}
      />
    </div>
  );
};

export default SalesPage;
