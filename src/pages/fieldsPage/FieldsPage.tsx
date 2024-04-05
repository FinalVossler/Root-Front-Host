import React from "react";

import Elements from "../../components/appComponents/elements";
import useCopyFields from "../../hooks/apiHooks/useCopyFields";
import useDeleteFields from "../../hooks/apiHooks/useDeleteFields";
import useGetFields from "../../hooks/apiHooks/useGetFields";
import useSearchFields from "../../hooks/apiHooks/useSearchFields";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useHasPermission from "../../hooks/useHasPermission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fieldSlice } from "../../store/slices/fieldSlice";

import useStyles from "./fieldsPage.styles";
import { LocalStorageConfNameEnum } from "../../utils/localStorage";
import {
  IFieldReadDto,
  IPaginationResponse,
  ITheme,
  IUserReadDto,
  PermissionEnum,
} from "roottypes";
import { EditorTypeEnum, editorSlice } from "../../store/slices/editorSlice";

interface IFieldsPageProps {}

const FieldsPage: React.FunctionComponent<IFieldsPageProps> = (
  props: IFieldsPageProps
) => {
  const theme: ITheme = useAppSelector(
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
    (res: IPaginationResponse<IFieldReadDto>) => {
      dispatch(fieldSlice.actions.setSearchedFields(res));
    },
    []
  );

  if (!isLoggedIn) return null;

  if (
    !hasPermission(PermissionEnum.ReadField) &&
    !hasPermission(PermissionEnum.ReadOwnField)
  )
    return null;

  return (
    <div className={styles.fieldsPageContainer} data-cy="fieldsPage">
      <Elements
        handleOpenEditor={(element) => {
          dispatch(
            editorSlice.actions.addEditor({
              element,
              editorType: EditorTypeEnum.Field,
            })
          );
        }}
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
            render: (field: IFieldReadDto) => {
              if (field.options) {
                return field.options
                  .map((option) => getTranslatedText(option.label))
                  .join(", ");
              } else return "";
            },
          },
          {
            label: getTranslatedText(staticText?.owner),
            name: "owner",
            render: (field: IFieldReadDto) => {
              return field.owner
                ? (field.owner as IUserReadDto).firstName +
                    " " +
                    (field.owner as IUserReadDto).lastName
                : "";
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
        canCreate={hasPermission(PermissionEnum.CreateField)}
        canUpdate={hasPermission(
          PermissionEnum.UpdateField,
          PermissionEnum.UpdateOwnField
        )}
        canUpdateElement={(field) =>
          hasPermission(
            PermissionEnum.UpdateField,
            PermissionEnum.UpdateOwnField,
            [(field as IFieldReadDto).owner]
          )
        }
        canDelete={hasPermission(
          PermissionEnum.DeleteField,
          PermissionEnum.DeleteOwnField
        )}
        canDeleteElements={(fields) =>
          hasPermission(
            PermissionEnum.DeleteField,
            PermissionEnum.DeleteOwnField,
            (fields as IFieldReadDto[]).map((f) => f.owner)
          )
        }
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
