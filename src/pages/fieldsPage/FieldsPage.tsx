import React from "react";

import FieldEditor from "../../components/editors/fieldEditor";
import Elements from "../../components/elements";
import { Theme } from "../../config/theme";
import withWrapper from "../../hoc/wrapper";
import useDeleteFields from "../../hooks/apiHooks/useDeleteFields";
import useGetFields from "../../hooks/apiHooks/useGetFields";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../store/hooks";
import { IField } from "../../store/slices/fieldSlice";

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

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getFields, loading } = useGetFields();
  const { deleteFields, loading: deleteLoading } = useDeleteFields();

  React.useEffect(() => {
    getFields({
      paginationCommand: {
        limit: 100,
        page: 1,
      },
    });
  }, []);

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
        ]}
        elements={fields}
        total={total}
        loading={loading}
        deletePromise={deleteFields}
        deleteLoading={deleteLoading}
        getElementName={(field: IField) => getTranslatedText(field.name)}
      />
    </div>
  );
};

export default withWrapper(FieldsPage, {
  withFooter: false,
  withSideMenu: true,
});