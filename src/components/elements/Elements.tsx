import React from "react";
import { BiAddToQueue, BiCopy } from "react-icons/bi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import ColumnResizer from "react-table-column-resizer";
import Loading from "react-loading";

import { Theme } from "../../config/theme";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../store/hooks";
import { IField } from "../../store/slices/fieldSlice";

import useStyles from "./elements.styles";
import ConfirmationModal from "../confirmationModal";
import { IModel } from "../../store/slices/modelSlice";
import { IEntity } from "../../store/slices/entitySlice";
import Pagination from "../pagination";
import { IUser } from "../../store/slices/userSlice";
import { IRole } from "../../store/slices/roleSlice";
import SearchInput from "../searchInput";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import PaginationCommand from "../../globalTypes/PaginationCommand";
import InputSelect from "../inputSelect";
import { Option } from "../inputSelect/InputSelect";

export type Column = {
  label: string;
  name: string;
  render?: (any) => any;
};

export type Element = IField | IModel | IEntity | IUser | IRole;

enum ViewType {
  Table = "Table",
  Board = "Board",
}

interface IElements {
  Editor: React.FunctionComponent<{
    open: boolean;
    setOpen: (open: boolean) => void;
    element?: Element | null;
  }>;
  columns: Column[];
  elements: Element[];
  total: number;
  limit: number;
  page: number;
  loading: boolean;
  deletePromise: (ids: string[]) => Promise<unknown>;
  deleteLoading: boolean;
  copyPromise?: (ids: string[]) => Promise<unknown>;
  copyLoading?: boolean;
  onCopyFinished?: () => void;
  getElementName: (element: Element) => string;
  onPageChange: (page: number) => void;
  searchPromise?: (
    searchText: string,
    paginationCommand: PaginationCommand
  ) => Promise<PaginationResponse<any>>;
  canDelete: boolean;
  canUpdate: boolean;
  canCreate: boolean;
  searchResult: PaginationResponse<any>;
  setSearchResult: (result: PaginationResponse<any>) => void;
  isForEntities?: boolean;
}

const Elements: React.FunctionComponent<IElements> = (props: IElements) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.elements
  );

  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
  const [copyModalOpen, setCopyModalOpen] = React.useState<boolean>(false);
  const [selectedElementsIds, setSelectedElementsIds] = React.useState<
    string[]
  >([]);
  const [selectedElement, setSelectedElement] =
    React.useState<Element | null>(null);
  const [viewType, setViewType] = React.useState<ViewType>(ViewType.Table);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  React.useEffect(() => {
    if (!editorOpen) {
      setSelectedElement(null);
    }
  }, [editorOpen]);

  React.useEffect(() => {
    setSelectedElementsIds([]);
  }, [props.elements]);

  //#region Event listeners
  const handleOpenEditor = () => setEditorOpen(true);
  const handleToggleElementSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    element: Element
  ) => {
    const newSelectedElements: string[] = [...selectedElementsIds];
    const exists = newSelectedElements.indexOf(element._id) !== -1;

    if (e.target.checked && !exists) {
      newSelectedElements.push(element._id);
    }
    if (!e.target.checked && exists) {
      newSelectedElements.splice(newSelectedElements.indexOf(element._id), 1);
    }

    setSelectedElementsIds(newSelectedElements);
  };
  const handleEdit = (element: Element) => {
    setSelectedElement(element);
    setEditorOpen(true);
  };
  const handleDelete = async () => {
    if (!props.canDelete) return;

    await props.deletePromise(selectedElementsIds);
    setDeleteModalOpen(false);
    setSelectedElementsIds([]);
  };
  const handleCopy = async () => {
    if (!props.copyPromise) return;

    await props.copyPromise(selectedElementsIds);
    // The on copy finished is used to redirect to the first page to have the newly copied elements in front of us
    if (props.onCopyFinished) {
      props.onCopyFinished();
    }
    setCopyModalOpen(false);
    setSelectedElementsIds([]);
    props.onPageChange(1);
  };
  const handleViewTypeChange = (option: Option) => {
    setViewType(
      ViewType.Table.toString() === option.value
        ? ViewType.Table
        : ViewType.Board
    );
  };
  //#endregion Event listeners

  // The elements to show are either the search result or the elements passed as props
  const elements =
    props.searchResult.data.length > 0
      ? props.searchResult.data
      : props.elements;

  const viewTypeOptions: Option[] = [
    {
      label: getTranslatedText(staticText?.table),
      value: ViewType.Table,
    },
    {
      label: getTranslatedText(staticText?.board),
      value: ViewType.Board,
    },
  ];
  return (
    <div className={styles.elementsContainer}>
      <div className={styles.buttonsContainer}>
        {props.canCreate && !props.loading && (
          <BiAddToQueue
            className={styles.addIcon}
            color={theme.primary}
            onClick={handleOpenEditor}
          />
        )}

        {props.copyPromise &&
          props.canCreate &&
          selectedElementsIds.length > 0 && (
            <React.Fragment>
              <BiCopy
                className={styles.copyIcon}
                onClick={() => setCopyModalOpen(true)}
              />
              <ConfirmationModal
                title={getTranslatedText(staticText?.copyTitle)}
                description={
                  getTranslatedText(staticText?.copyDescription) +
                  " " +
                  selectedElementsIds
                    .map((selectedElementId) => {
                      const element: Element | undefined = elements.find(
                        (el) => el._id === selectedElementId
                      );
                      return element ? props.getElementName(element) : "";
                    })
                    .join(", ")
                }
                loading={props.copyLoading || false}
                modalOpen={copyModalOpen}
                onConfirm={handleCopy}
                setModalOpen={setCopyModalOpen}
              />
            </React.Fragment>
          )}

        {selectedElementsIds.length > 0 && (
          <React.Fragment>
            {props.canDelete && (
              <AiFillDelete
                onClick={() => setDeleteModalOpen(true)}
                color={theme.primary}
                className={styles.deleteIcon}
              />
            )}

            <ConfirmationModal
              title={getTranslatedText(staticText?.deleteTitle)}
              description={
                getTranslatedText(staticText?.deleteDescription) +
                ": " +
                selectedElementsIds
                  .map((selectedElementId) => {
                    const element: Element | undefined = elements.find(
                      (el) => el._id === selectedElementId
                    );
                    return element ? props.getElementName(element) : "";
                  })
                  .join(", ")
              }
              loading={props.deleteLoading}
              modalOpen={deleteModalOpen}
              onConfirm={handleDelete}
              setModalOpen={setDeleteModalOpen}
            />
          </React.Fragment>
        )}

        <props.Editor
          open={editorOpen}
          setOpen={setEditorOpen}
          element={selectedElement}
        />
      </div>

      {props.searchPromise && (
        <SearchInput
          getElementTitle={props.getElementName}
          searchPromise={props.searchPromise}
          setSearchResult={props.setSearchResult}
          showSearchResult={false}
          inputProps={{
            placeholder: getTranslatedText(staticText?.search),
          }}
        />
      )}

      {props.isForEntities && (
        <InputSelect
          options={viewTypeOptions}
          label={getTranslatedText(staticText?.view)}
          onChange={handleViewTypeChange}
          value={viewTypeOptions.find((el) => el.value === viewType.toString())}
        />
      )}

      {viewType === ViewType.Table && (
        <table className={styles.elementsTable}>
          <thead className={styles.tableHeader}>
            <tr className={styles.tableRow}>
              {props.columns.map((column, index) => {
                return (
                  <React.Fragment key={index}>
                    <th className={styles.tableColumn} key={index}>
                      {column.label}
                    </th>
                    <ColumnResizer className="columnResizer" minWidth={0} />
                  </React.Fragment>
                );
              })}
              {props.canUpdate && (
                <th className={styles.tableColumn}>
                  {getTranslatedText(staticText?.edit)}
                </th>
              )}
              {props.canUpdate && (
                <ColumnResizer className="columnResizer" minWidth={0} />
              )}
              {props.canDelete && (
                <th className={styles.tableColumn}>
                  <div className={styles.actions}>
                    {getTranslatedText(staticText?.actions)}
                    <input
                      className={styles.actionCheckbox}
                      type="checkbox"
                      checked={selectedElementsIds.length === elements.length}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSelectedElementsIds(
                          elements.length !== selectedElementsIds.length
                            ? elements.map((el) => el._id)
                            : []
                        )
                      }
                    />
                  </div>
                </th>
              )}
              {props.canDelete && (
                <ColumnResizer className="columnResizer" minWidth={0} />
              )}
            </tr>
          </thead>

          <tbody>
            {props.loading && (
              <tr>
                <td>
                  <Loading />
                </td>
              </tr>
            )}

            {!props.loading &&
              elements.map((element, index) => {
                return (
                  <tr className={styles.tableRow} key={index}>
                    {props.columns.map((column, columnIndex) => {
                      return (
                        <React.Fragment key={columnIndex}>
                          <td className={styles.tableColumn} key={columnIndex}>
                            {column.render
                              ? column.render(element)
                              : getTranslatedText(element[column.name])}
                          </td>
                          <ColumnResizer
                            className="columnResizer"
                            minWidth={0}
                          />
                        </React.Fragment>
                      );
                    })}
                    {props.canUpdate && (
                      <td className={styles.tableColumn}>
                        <AiFillEdit
                          onClick={() => handleEdit(element)}
                          className={styles.editIcon}
                        />
                      </td>
                    )}

                    {props.canUpdate && (
                      <ColumnResizer className="columnResizer" minWidth={0} />
                    )}

                    {props.canDelete && (
                      <td className={styles.actionColumn}>
                        <input
                          className={styles.checkbox}
                          type="checkbox"
                          checked={
                            selectedElementsIds.indexOf(element._id) !== -1
                          }
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleToggleElementSelect(e, element)
                          }
                        />
                      </td>
                    )}
                    {props.canDelete && (
                      <ColumnResizer className="columnResizer" minWidth={0} />
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}

      <Pagination
        total={
          props.searchResult.data.length > 0
            ? props.searchResult.total
            : props.total
        }
        limit={props.limit}
        page={props.page}
        onPageChange={props.onPageChange}
      />
    </div>
  );
};

export default Elements;
