import React from "react";
import { createPortal } from "react-dom";
import { BiCopy } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../store/hooks";

import useStyles from "./elements.styles";
import ConfirmationModal from "../../fundamentalComponents/confirmationModal";
import Pagination from "../../fundamentalComponents/pagination";
import SearchInput from "../../fundamentalComponents/searchInput";
import ElementsBoard from "./elementsBoard";
import Button from "../../fundamentalComponents/button";
import { LocalStorageConfNameEnum } from "../../../utils/localStorage";
import ViewTabs from "./viewTabs";
import {
  IEntityReadDto,
  IPaginationCommand,
  IPaginationResponse,
  ITheme,
} from "roottypes";
import ElementsTable from "./elementsTable";
import { IElement } from "../../../store/slices/editorSlice";
import ElementsStatusTracking from "./elementsStatusTracking";
import { ViewTypeEnum } from "./viewTabs/ViewTabs";

export type Column = {
  label: string;
  name: string;
  render?: (param: any) => any;
  RenderComponent?: React.FunctionComponent<{ element: IElement }>;
  defaultHide?: boolean;
  stick?: boolean;
};

interface IElementsProps {
  handleOpenEditor: (element?: IElement) => void;
  columns: Column[];
  elements: IElement[];
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
  getElementName: (element: IElement) => string;
  onPageChange?: (page: number) => void;
  searchPromise?: (
    searchText: string,
    paginationCommand: IPaginationCommand
  ) => Promise<IPaginationResponse<any>>;
  canDelete: boolean;
  canUpdate: boolean;
  canCreate: boolean;
  searchResult?: IPaginationResponse<any>;
  setSearchResult?: (result: IPaginationResponse<any>) => void;
  isForEntities?: boolean;
  modelId?: string;
  elementsLocalStorageConfName: LocalStorageConfNameEnum | string;
  tableDataCy?: string;
}

const Elements: React.FunctionComponent<IElementsProps> = (
  props: IElementsProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.elements
  );

  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
  const [copyModalOpen, setCopyModalOpen] = React.useState<boolean>(false);
  const [selectedElementsIds, setSelectedElementsIds] = React.useState<
    string[]
  >([]);
  const [viewType, setViewType] = React.useState<ViewTypeEnum>(
    props.isForEntities ? ViewTypeEnum.StatusTracking : ViewTypeEnum.Table
  );
  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  React.useEffect(() => {
    setSelectedElementsIds([]);
  }, [props.elements]);

  //#region Event listeners
  const handleToggleElementSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    element: IElement
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
  const handleEdit = (element: IElement) => {
    props.handleOpenEditor(element);
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
      <div
        className={styles.elementsContainer}
        {...(props.isForEntities
          ? { ["data-cy"]: "elementsContainerForModel" + props.modelId }
          : {})}
      >
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
              onClick={() => props.handleOpenEditor()}
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
                {createPortal(
                  <ConfirmationModal
                    title={getTranslatedText(staticText?.copyTitle)}
                    description={
                      getTranslatedText(staticText?.copyDescription) +
                      " " +
                      selectedElementsIds
                        .map((selectedElementId) => {
                          const element: IElement | undefined = elements.find(
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
                  />,
                  document.body
                )}
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

              {createPortal(
                <ConfirmationModal
                  title={getTranslatedText(staticText?.deleteTitle)}
                  description={
                    getTranslatedText(staticText?.deleteDescription) +
                    ": " +
                    selectedElementsIds
                      .map((selectedElementId) => {
                        const element: IElement | undefined = elements.find(
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
                />,
                document.body
              )}
            </React.Fragment>
          )}
        </div>

        {viewType === ViewTypeEnum.Board && props.isForEntities && (
          <ElementsBoard
            modelId={props.modelId?.toString() || ""}
            entities={
              props.searchResult && props.searchResult.data.length > 0
                ? props.searchResult.data
                : (props.elements as IEntityReadDto[])
            }
            loading={props.loading}
          />
        )}

        {viewType === ViewTypeEnum.StatusTracking && props.isForEntities && (
          <ElementsStatusTracking
            modelId={props.modelId?.toString() || ""}
            entities={
              props.searchResult && props.searchResult.data.length > 0
                ? props.searchResult.data
                : (props.elements as IEntityReadDto[])
            }
            loading={props.loading}
          />
        )}

        {viewType === ViewTypeEnum.Table && (
          <ElementsTable
            handleEdit={handleEdit}
            canDelete={props.canDelete}
            canUpdate={props.canUpdate}
            columns={props.columns}
            elements={elements}
            elementsLocalStorageConfName={props.elementsLocalStorageConfName}
            handleToggleElementSelect={handleToggleElementSelect}
            loading={props.loading}
            selectedElementsIds={selectedElementsIds}
            setSelectedElementsIds={setSelectedElementsIds}
            tableDataCy={props.tableDataCy}
          />
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
