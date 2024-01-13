import React from "react";
import { BiCopy, BiShow } from "react-icons/bi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import ColumnResizer from "react-table-column-resizer";
import Loading from "react-loading";

import { ITheme } from "../../config/theme";
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
import ElementsBoard from "./elementsBoard";
import Button from "../button";
import {
  LocalStorageConfNameEnum,
  IElementsConf,
  getLocalStorageElementsConf,
  updateLocalStorageElementsConf,
} from "../../utils/localStorage";
import { IMicroFrontend } from "../../store/slices/microFrontendSlice";
import ColumnOptions from "./columnOptions/ColumnOptions";
import ViewTabs from "./viewTabs";
import { IPage } from "../../store/slices/pageSlice";

export type Column = {
  label: string;
  name: string;
  render?: (param: any) => any;
  RenderComponent?: React.FunctionComponent<{ element: Element }>;
  defaultHide?: boolean;
};

export type Element =
  | IField
  | IModel
  | IEntity
  | IUser
  | IRole
  | IMicroFrontend
  | IPage;

export enum ViewTypeEnum {
  Table = "Table",
  Board = "Board",
  BoardForStatusTracking = "BoardForStatusTracking",
}

interface IElements {
  Editor: React.FunctionComponent<{
    open: boolean;
    setOpen: (open: boolean) => void;
    element?: Element | null;
  }>;
  columns: Column[];
  elements: Element[];
  withPagination?: boolean;
  total?: number;
  limit?: number;
  page?: number;
  loading: boolean;
  deletePromise: (ids: string[]) => Promise<unknown>;
  deleteLoading: boolean;
  copyPromise?: (ids: string[]) => Promise<unknown>;
  copyLoading?: boolean;
  onCopyFinished?: () => void;
  getElementName: (element: Element) => string;
  onPageChange?: (page: number) => void;
  searchPromise?: (
    searchText: string,
    paginationCommand: PaginationCommand
  ) => Promise<PaginationResponse<any>>;
  canDelete: boolean;
  canUpdate: boolean;
  canCreate: boolean;
  searchResult?: PaginationResponse<any>;
  setSearchResult?: (result: PaginationResponse<any>) => void;
  isForEntities?: boolean;
  modelId?: string;
  elementsLocalStorageConfName: LocalStorageConfNameEnum | string;
  tableDataCy?: string;
}

const Elements: React.FunctionComponent<IElements> = (props: IElements) => {
  const theme: ITheme = useAppSelector(
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
  const [selectedElement, setSelectedElement] = React.useState<Element | null>(
    null
  );
  const [viewType, setViewType] = React.useState<ViewTypeEnum>(
    props.isForEntities
      ? ViewTypeEnum.BoardForStatusTracking
      : ViewTypeEnum.Table
  );
  const [hiddenColumns, setHiddenColumns] = React.useState<Column[]>([]);

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

  // Load hidden columns from local storage. If not found, then we set the default hide
  React.useEffect(() => {
    const conf: IElementsConf | null = getLocalStorageElementsConf(
      props.elementsLocalStorageConfName
    );
    if (conf) {
      setHiddenColumns(
        props.columns.filter(
          (el) => conf.hiddenColumnNames.indexOf(el.name) !== -1
        )
      );
    } else {
      setHiddenColumns(props.columns.filter((el) => el.defaultHide));
    }
  }, [props.columns]);

  //#region Event listeners
  const handleOpenEditor = () => setEditorOpen(true);
  const handleHideColumn = (column: Column) => {
    if (!hiddenColumns.some((el) => el.name === column.name)) {
      const newHiddenColumns = [...hiddenColumns, column];
      setHiddenColumns(newHiddenColumns);
      updateLocalStorageConf({ hiddenColumns: newHiddenColumns });
    }
  };
  const handleShowColumn = (column: Column) => {
    const newHiddenColumns = hiddenColumns.filter(
      (el) => el.name !== column.name
    );
    setHiddenColumns(newHiddenColumns);
    updateLocalStorageConf({ hiddenColumns: newHiddenColumns });
  };
  const updateLocalStorageConf = ({
    hiddenColumns,
  }: {
    hiddenColumns: Column[];
  }) => {
    updateLocalStorageElementsConf({
      confName: props.elementsLocalStorageConfName,
      value: {
        hiddenColumnNames: hiddenColumns.map((el) => el.name),
      },
    });
  };
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
    if (props.onPageChange) {
      props.onPageChange(1);
    }
  };
  const handleViewTypeChange = (viewType: ViewTypeEnum) => {
    setViewType(viewType);
  };
  //#endregion Event listeners

  // The elements to show are either the search result or the elements passed as props
  const elements =
    props.searchResult && props.searchResult?.data.length > 0
      ? props.searchResult.data
      : props.elements;

  return (
    <React.Fragment>
      {props.isForEntities && (
        <ViewTabs viewType={viewType} onViewTabChange={handleViewTypeChange} />
      )}
      <div className={styles.elementsContainer}>
        <div
          className={styles.buttonsContainer}
          style={{ marginTop: props.isForEntities ? 0 : 90 }}
        >
          {props.searchPromise && props.setSearchResult && (
            <SearchInput
              getElementTitle={props.getElementName}
              searchPromise={props.searchPromise}
              setSearchResult={props.setSearchResult}
              showSearchResult={false}
              inputProps={{
                placeholder: getTranslatedText(staticText?.search),
                style: {
                  marginRight: 10,
                  position: "relative",
                  top: 8,
                  height: 42,
                },
              }}
              inputDataCy="elementsSearchInput"
            />
          )}

          {props.canCreate && !props.loading && (
            <Button
              onClick={handleOpenEditor}
              style={{ paddingLeft: 40, paddingRight: 40, marginLeft: 10 }}
              buttonDataCy="addElementButton"
            >
              {getTranslatedText(staticText?.add)}
            </Button>
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
                  id="deleteButton"
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

        {(viewType === ViewTypeEnum.Board ||
          viewType === ViewTypeEnum.BoardForStatusTracking) &&
          props.isForEntities && (
            <ElementsBoard
              modelId={props.modelId?.toString() || ""}
              entities={
                props.searchResult && props.searchResult.data.length > 0
                  ? props.searchResult.data
                  : (props.elements as IEntity[])
              }
              forStatusTracking={
                viewType === ViewTypeEnum.BoardForStatusTracking
              }
              Editor={(subProps) => <props.Editor {...subProps} />}
              loading={props.loading}
            />
          )}

        {viewType === ViewTypeEnum.Table && hiddenColumns.length > 0 && (
          <div className={styles.hiddenColumns}>
            {hiddenColumns.map((col, i) => {
              return (
                <div
                  className={styles.hiddenColumn}
                  onClick={() => handleShowColumn(col)}
                  key={i}
                >
                  {getTranslatedText(col.label)}
                  <BiShow className={styles.showIcon} />
                </div>
              );
            })}
          </div>
        )}

        {viewType === ViewTypeEnum.Table && (
          <table
            className={styles.elementsTable}
            {...(props.tableDataCy ? { ["data-cy"]: props.tableDataCy } : {})}
          >
            <thead className={styles.tableHeader}>
              <tr className={styles.tableRow}>
                {props.columns.map((column, columnIndex) => {
                  if (hiddenColumns.some((el) => el.name === column.name)) {
                    return null;
                  }
                  return (
                    <React.Fragment key={columnIndex}>
                      <th
                        className={styles.tableHeaderColumn}
                        key={columnIndex}
                      >
                        {column.label}
                        <ColumnOptions
                          handleHideColumn={() => handleHideColumn(column)}
                        />
                      </th>
                      <ColumnResizer
                        disabled={false}
                        maxWidth={null}
                        id={columnIndex}
                        resizeStart={() => {}}
                        resizeEnd={() => {}}
                        className="columnResizer"
                        minWidth={0}
                      />
                    </React.Fragment>
                  );
                })}
                {props.canUpdate && (
                  <th className={styles.tableHeaderColumn}>
                    {getTranslatedText(staticText?.edit)}
                  </th>
                )}
                {props.canUpdate && (
                  <ColumnResizer
                    disabled={false}
                    maxWidth={null}
                    id={999}
                    resizeStart={() => {}}
                    resizeEnd={() => {}}
                    className="columnResizer"
                    minWidth={0}
                  />
                )}
                {props.canDelete && (
                  <th className={styles.tableHeaderColumn}>
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
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {props.loading && (
                <tr>
                  <td>
                    <Loading color={theme.primary} />
                  </td>
                </tr>
              )}

              {!props.loading &&
                elements.map((element, elementIndex) => {
                  return (
                    <tr className={styles.tableRow} key={elementIndex}>
                      {props.columns.map((column, columnIndex) => {
                        if (
                          hiddenColumns.some((el) => el.name === column.name)
                        ) {
                          return null;
                        }
                        return (
                          <React.Fragment key={columnIndex}>
                            <td
                              className={styles.tableColumn}
                              key={columnIndex}
                            >
                              {column.render ? (
                                column.render(element)
                              ) : column.RenderComponent ? (
                                <column.RenderComponent element={element} />
                              ) : (
                                getTranslatedText(element[column.name])
                              )}
                            </td>
                            <ColumnResizer
                              disabled={false}
                              maxWidth={null}
                              id={elementIndex + 10000}
                              resizeStart={() => {}}
                              resizeEnd={() => {}}
                              className="columnResizer"
                              minWidth={0}
                            />
                          </React.Fragment>
                        );
                      })}
                      {props.canUpdate && (
                        <td
                          className={styles.tableColumn}
                          // This data-cy is used for when we don't know the id of the element, but we know the index (for example, using first() in cypress)
                          data-cy="elementEdit"
                        >
                          <AiFillEdit
                            onClick={() => handleEdit(element)}
                            className={styles.editIcon}
                            // This data is for when we know the id of the element
                            id={"editButtonFor" + element["_id"].toString()}
                          />
                        </td>
                      )}

                      {props.canUpdate && (
                        <ColumnResizer
                          disabled={false}
                          maxWidth={null}
                          id={elementIndex + 10001}
                          resizeStart={() => {}}
                          resizeEnd={() => {}}
                          className="columnResizer"
                          minWidth={0}
                        />
                      )}

                      {props.canDelete && (
                        <td className={styles.actionColumn}>
                          <input
                            className={styles.checkbox}
                            type="checkbox"
                            checked={
                              selectedElementsIds.indexOf(element._id) !== -1
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleToggleElementSelect(e, element)}
                            data-cy={
                              "tableCheckButtonFor" + element["_id"].toString()
                            }
                          />
                        </td>
                      )}
                      {props.canDelete && (
                        <ColumnResizer
                          disabled={false}
                          maxWidth={null}
                          id={elementIndex + 10002}
                          resizeStart={() => {}}
                          resizeEnd={() => {}}
                          className="columnResizer"
                          minWidth={0}
                        />
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}

        {props.withPagination !== false && (
          <Pagination
            total={
              props.searchResult && props.searchResult.data.length > 0
                ? props.searchResult.total
                : props.total || 0
            }
            limit={props.limit || 999}
            page={props.page || 1}
            onPageChange={props.onPageChange ? props.onPageChange : () => {}}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Elements;
