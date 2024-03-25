import React from "react";
import { ITheme, PermissionEnum } from "roottypes";

import Elements from "../../components/appComponents/elements";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useHasPermission from "../../hooks/useHasPermission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import useStyles from "./paymentMethodsPage.styles";
import { LocalStorageConfNameEnum } from "../../utils/localStorage";
import { EditorTypeEnum, editorSlice } from "../../store/slices/editorSlice";
import useGetPaymentMethods from "../../hooks/apiHooks/useGetPaymentMethods";
import useDeletePaymentMethods from "../../hooks/apiHooks/useDeletePaymentMethods";

interface IPaymentMethodsProps {}

const PaymentMethodsPage: React.FunctionComponent<IPaymentMethodsProps> = (
  props: IPaymentMethodsProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.paymentMethods
  );
  const { paymentMethods, total } = useAppSelector(
    (state) => state.paymentMethod
  );
  const searchResult = useAppSelector(
    (state) => state.paymentMethod.searchedPaymentMethods
  );

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const { getPaymentMethods, loading } = useGetPaymentMethods();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deletePaymentMethods, loading: deleteLoading } =
    useDeletePaymentMethods();
  const { hasPermission } = useHasPermission();

  React.useEffect(() => {
    handleFetchElements();
  }, [page]);

  const handleFetchElements = () => {
    getPaymentMethods();
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (!isLoggedIn) return null;

  if (!hasPermission(PermissionEnum.ReadPaymentMethod)) return null;

  return (
    <div
      className={styles.paymentMethodsPageContainer}
      data-cy="paymentMethodsPage"
    >
      <Elements
        handleOpenEditor={(element) => {
          dispatch(
            editorSlice.actions.addEditor({
              element,
              editorType: EditorTypeEnum.PaymentMethod,
            })
          );
        }}
        columns={[
          {
            label: getTranslatedText(staticText?.namePlaceholder),
            name: "name",
          },
          {
            label: getTranslatedText(staticText?.slugPlaceholder),
            name: "slug",
          },
        ]}
        elements={paymentMethods}
        total={total}
        limit={limit}
        page={page}
        loading={loading}
        deletePromise={deletePaymentMethods}
        deleteLoading={deleteLoading}
        getElementName={(paymentMethod: any) =>
          getTranslatedText(paymentMethod.name)
        }
        onPageChange={handlePageChange}
        canCreate={hasPermission(PermissionEnum.CreatePaymentMethod)}
        canUpdate={hasPermission(PermissionEnum.UpdatePaymentMethod)}
        canDelete={hasPermission(PermissionEnum.DeletePaymentMethod)}
        elementsLocalStorageConfName={LocalStorageConfNameEnum.PAYMENT_METHODS}
        tableDataCy="paymentMethodsTable"
      />
    </div>
  );
};

export default React.memo(PaymentMethodsPage);
