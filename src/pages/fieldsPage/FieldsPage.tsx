import React from "react";

import FieldEditor from "../../components/editors/fieldEditor";
import Elements from "../../components/elements";
import { Theme } from "../../config/theme";
import withChat from "../../hoc/withChat";
import withWrapper from "../../hoc/wrapper";
import useDeleteFields from "../../hooks/apiHooks/useDeleteFields";
import useGetFields from "../../hooks/apiHooks/useGetFields";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useHasPermission from "../../hooks/useHasPermission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";
import { IField } from "../../store/slices/fieldSlice";
import { Permission } from "../../store/slices/roleSlice";

import useStyles from "./fieldsPage.styles";

interface IFieldsPage {}

const FieldsPage: React.FunctionComponent<IFieldsPage> = (
  props: IFieldsPage
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.fields
  );
  const { fields, total } = useAppSelector((state) => state.field);

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getFields, loading } = useGetFields();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteFields, loading: deleteLoading } = useDeleteFields();
  const { hasPermission } = useHasPermission();

  React.useEffect(() => {
    getFields({
      paginationCommand: {
        limit,
        page,
      },
    });
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (!isLoggedIn) return null;

  if (!hasPermission(Permission.ReadField)) return null;

  return (
    <div className={styles.fieldsPageContainer}>
      <Elements
        Editor={({ element, ...props }) => (
          <FieldEditor {...props} field={element as IField} />
        )}
        columns={[
          {
            label: getTranslatedText(staticText?.namePlaceholder),
            name: "name",
          },
          {
            label: getTranslatedText(staticText?.typePlaceholder),
            name: "type",
          },
          {
            label: getTranslatedText(staticText?.options),
            name: "options",
            render: (field: IField) => {
              if (field.options) {
                return field.options
                  .map((option) => getTranslatedText(option.label))
                  .join(", ");
              } else return "";
            },
          },
        ]}
        elements={fields}
        total={total}
        limit={limit}
        page={page}
        loading={loading}
        deletePromise={deleteFields}
        deleteLoading={deleteLoading}
        getElementName={(field: any) => getTranslatedText(field.name)}
        onPageChange={handlePageChange}
        canCreate={hasPermission(Permission.CreateField)}
        canUpdate={hasPermission(Permission.UpdateField)}
        canDelete={hasPermission(Permission.DeleteField)}
      />
    </div>
  );
};

export default withWrapper(withChat(React.memo(FieldsPage)), {
  withFooter: false,
  withSideMenu: true,
});
