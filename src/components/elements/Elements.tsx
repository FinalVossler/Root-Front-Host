import React from "react";
import { BiAddToQueue } from "react-icons/bi";
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

export type Column = {
  label: string;
  name: string;
  render?: (any) => any;
};

export type Element = IField | IModel | IEntity | IUser | IRole;

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
  getElementName: (element: Element) => string;
  onPageChange: (page: number) => void;
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
  const [selectedElements, setSelectedElements] = React.useState<string[]>([]);
  const [selectedElement, setSelectedElement] =
    React.useState<Element | null>(null);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  const handleOpenEditor = () => setEditorOpen(true);

  React.useEffect(() => {
    if (!editorOpen) {
      setSelectedElement(null);
    }
  }, [editorOpen]);

  React.useEffect(() => {
    setSelectedElements([]);
  }, [props.elements]);

  //#region Event listeners
  const handleToggleElementSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    element: Element
  ) => {
    const newSelectedElements: string[] = [...selectedElements];
    const exists = newSelectedElements.indexOf(element._id) !== -1;

    if (e.target.checked && !exists) {
      newSelectedElements.push(element._id);
    }
    if (!e.target.checked && exists) {
      newSelectedElements.splice(newSelectedElements.indexOf(element._id), 1);
    }

    setSelectedElements(newSelectedElements);
  };
  const handleEdit = (element: Element) => {
    setSelectedElement(element);
    setEditorOpen(true);
  };
  const handleDelete = async () => {
    await props.deletePromise(selectedElements);
    setDeleteModalOpen(false);
    setSelectedElements([]);
  };
  //#endregion Event listeners

  return (
    <div className={styles.elementsContainer}>
      <div className={styles.buttonsContainer}>
        <BiAddToQueue
          className={styles.addIcon}
          color={theme.primary}
          onClick={handleOpenEditor}
        />
        {selectedElements.length > 0 && (
          <React.Fragment>
            <AiFillDelete
              onClick={() => setDeleteModalOpen(true)}
              color={theme.primary}
              className={styles.deleteIcon}
            />
            <ConfirmationModal
              title={getTranslatedText(staticText?.deleteTitle)}
              description={
                getTranslatedText(staticText?.deleteDescription) +
                ": " +
                selectedElements
                  .map((selectedElementId) => {
                    const element: Element | undefined = props.elements.find(
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
            <th className={styles.tableColumn}>
              {getTranslatedText(staticText?.edit)}
            </th>
            <ColumnResizer className="columnResizer" minWidth={0} />
            <th className={styles.tableColumn}>
              <div className={styles.actions}>
                {getTranslatedText(staticText?.actions)}
                <input
                  className={styles.actionCheckbox}
                  type="checkbox"
                  checked={selectedElements.length === props.elements.length}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSelectedElements(
                      props.elements.length !== selectedElements.length
                        ? props.elements.map((el) => el._id)
                        : []
                    )
                  }
                />
              </div>
            </th>
            <ColumnResizer className="columnResizer" minWidth={0} />
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
            props.elements.map((element, index) => {
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
                        <ColumnResizer className="columnResizer" minWidth={0} />
                      </React.Fragment>
                    );
                  })}
                  <td className={styles.tableColumn}>
                    <AiFillEdit
                      onClick={() => handleEdit(element)}
                      className={styles.editIcon}
                    />
                  </td>
                  <ColumnResizer className="columnResizer" minWidth={0} />

                  <td className={styles.actionColumn}>
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      checked={selectedElements.indexOf(element._id) !== -1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleToggleElementSelect(e, element)
                      }
                    />
                  </td>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                </tr>
              );
            })}
        </tbody>
      </table>

      <Pagination
        total={props.total}
        limit={props.limit}
        page={props.page}
        onPageChange={props.onPageChange}
      />
    </div>
  );
};

export default Elements;
