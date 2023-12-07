import React from "react";

import FieldEditor from "../../components/editors/fieldEditor";
import Elements from "../../components/elements";
import { Theme } from "../../config/theme";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import useCopyFields from "../../hooks/apiHooks/useCopyFields";
import useDeleteFields from "../../hooks/apiHooks/useDeleteFields";
import useGetFields from "../../hooks/apiHooks/useGetFields";
import useSearchFields from "../../hooks/apiHooks/useSearchFields";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useHasPermission from "../../hooks/useHasPermission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fieldSlice, IField } from "../../store/slices/fieldSlice";
import { Permission } from "../../store/slices/roleSlice";

import useStyles from "./fieldsPage.styles";
import { LocalStorageConfNameEnum } from "../../utils/localStorage";

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
  const searchResult = useAppSelector((state) => state.field.searchedFields);

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const { getFields, loading } = useGetFields();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteFields, loading: deleteLoading } = useDeleteFields();
  const { copyFields, loading: copyLoading } = useCopyFields();
  const { hasPermission } = useHasPermission();
  const { handleSearchFieldsPromise } = useSearchFields(undefined);

  React.useEffect(() => {
    handleFetchElements();
  }, [page]);

  const handleFetchElements = () => {
    getFields({
      paginationCommand: {
        limit,
        page,
      },
    });
  };

  const handleCopyFinished = () => {
    if (page === 1) {
      handleFetchElements();
    } else {
      setPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSetSearchResult = React.useCallback(
    (res: PaginationResponse<IField>) => {
      dispatch(fieldSlice.actions.setSearchedFields(res));
    },
    []
  );

  if (!isLoggedIn) return null;

  if (!hasPermission(Permission.ReadField)) return null;

  return (
    <div className={styles.fieldsPageContainer} data-cy="fieldsPage">
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
        copyPromise={copyFields}
        copyLoading={copyLoading}
        onCopyFinished={handleCopyFinished}
        getElementName={(field: any) => getTranslatedText(field.name)}
        onPageChange={handlePageChange}
        canCreate={hasPermission(Permission.CreateField)}
        canUpdate={hasPermission(Permission.UpdateField)}
        canDelete={hasPermission(Permission.DeleteField)}
        searchPromise={handleSearchFieldsPromise}
        searchResult={searchResult}
        setSearchResult={handleSetSearchResult}
        elementsLocalStorageConfName={LocalStorageConfNameEnum.FIELDS}
        tableDataCy="fieldsTable"
      />
    </div>
  );
};

export default React.memo(FieldsPage);
