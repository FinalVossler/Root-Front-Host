import React from "react";
import { ITheme, PermissionEnum } from "roottypes";

import Elements from "../../components/appComponents/elements";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useHasPermission from "../../hooks/useHasPermission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import useStyles from "./shippingMethodsPage.styles";
import { LocalStorageConfNameEnum } from "../../utils/localStorage";
import { EditorTypeEnum, editorSlice } from "../../store/slices/editorSlice";
import useGetShippingMethods from "../../hooks/apiHooks/useGetShippingMethods";
import useDeleteShippingMethods from "../../hooks/apiHooks/useDeleteShippingMethods";

interface IShippingMethodsProps {}

const ShippingMethodsPage: React.FunctionComponent<IShippingMethodsProps> = (
  props: IShippingMethodsProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.shippingMethods
  );
  const { shippingMethods, total } = useAppSelector(
    (state) => state.shippingMethod
  );

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const { getShippingMethods, loading } = useGetShippingMethods();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteShippingMethods, loading: deleteLoading } =
    useDeleteShippingMethods();
  const { hasPermission } = useHasPermission();

  React.useEffect(() => {
    handleFetchElements();
  }, [page]);

  const handleFetchElements = () => {
    getShippingMethods();
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (!isLoggedIn) return null;

  if (!hasPermission(PermissionEnum.ReadShippingMethod)) return null;

  return (
    <div
      className={styles.shippingMethodsPageContainer}
      data-cy="shippingMethodsPage"
    >
      <Elements
        handleOpenEditor={(element) => {
          dispatch(
            editorSlice.actions.addEditor({
              element,
              editorType: EditorTypeEnum.ShippingMethod,
            })
          );
        }}
        columns={[
          {
            label: getTranslatedText(staticText?.namePlaceholder),
            name: "name",
          },
          {
            label: getTranslatedText(staticText?.pricePlaceholder),
            name: "price",
          },
        ]}
        elements={shippingMethods}
        total={total}
        limit={limit}
        page={page}
        loading={loading}
        deletePromise={deleteShippingMethods}
        deleteLoading={deleteLoading}
        getElementName={(shippingMethod: any) =>
          getTranslatedText(shippingMethod.name)
        }
        onPageChange={handlePageChange}
        canCreate={hasPermission(PermissionEnum.CreateShippingMethod)}
        canUpdate={hasPermission(PermissionEnum.UpdateShippingMethod)}
        canDelete={hasPermission(PermissionEnum.DeleteShippingMethod)}
        elementsLocalStorageConfName={LocalStorageConfNameEnum.PAYMENT_METHODS}
        tableDataCy="shippingMethodsTable"
      />
    </div>
  );
};

export default React.memo(ShippingMethodsPage);
