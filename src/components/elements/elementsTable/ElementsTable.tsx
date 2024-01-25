import React from "react";
import { AiFillEdit } from "react-icons/ai";
import ColumnResizer from "react-table-column-resizer";
import Loading from "react-loading";
import { BiShow } from "react-icons/bi";
import { ITheme } from "roottypes";

import {
  IElementsConf,
  LocalStorageConfNameEnum,
  getLocalStorageElementsConf,
  updateLocalStorageElementsConf,
} from "../../../utils/localStorage";
import { useAppSelector } from "../../../store/hooks";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import ColumnOptions from "../columnOptions";
import { Column as IColumn, Element as IElement } from "../Elements";

import useStyles from "./elementsTable.styles";
import useColumnStyle from "./useColumnStyles";

interface IElementsTableProps {
  columns: IColumn[];
  elements: IElement[];
  loading: boolean;
  canDelete: boolean;
  canUpdate: boolean;
  elementsLocalStorageConfName: LocalStorageConfNameEnum | string;
  tableDataCy?: string;
  selectedElementsIds: string[];
  setSelectedElementsIds: (elementsIds: string[]) => void;
  handleToggleElementSelect: (
    e: React.ChangeEvent<HTMLInputElement>,
    element: IElement
  ) => void;
  handleEdit: (element: IElement) => void;
}

const ElementsTable: React.FunctionComponent<IElementsTableProps> = (
  props: IElementsTableProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.elements
  );

  const [hiddenColumns, setHiddenColumns] = React.useState<IColumn[]>([]);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

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
  const handleShowColumn = (column: IColumn) => {
    const newHiddenColumns = hiddenColumns.filter(
      (el) => el.name !== column.name
    );
    setHiddenColumns(newHiddenColumns);
    updateLocalStorageConf({ hiddenColumns: newHiddenColumns });
  };

  const handleHideColumn = (column: IColumn) => {
    if (!hiddenColumns.some((el) => el.name === column.name)) {
      const newHiddenColumns = [...hiddenColumns, column];
      setHiddenColumns(newHiddenColumns);
      updateLocalStorageConf({ hiddenColumns: newHiddenColumns });
    }
  };
  const updateLocalStorageConf = ({
    hiddenColumns,
  }: {
    hiddenColumns: IColumn[];
  }) => {
    updateLocalStorageElementsConf({
      confName: props.elementsLocalStorageConfName,
      value: {
        hiddenColumnNames: hiddenColumns.map((el) => el.name),
      },
    });
  };
  //#endregion Event listeners

  return (
    <React.Fragment>
      {hiddenColumns.length > 0 && (
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
      <table
        className={styles.elementsTable}
        {...(props.tableDataCy ? { ["data-cy"]: props.tableDataCy } : {})}
        cellPadding={0}
        cellSpacing={0}
      >
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            {props.columns.map((column, columnIndex) => {
              if (hiddenColumns.some((el) => el.name === column.name)) {
                return null;
              }
              return (
                <HeaderColumn
                  elementIndex={columnIndex}
                  column={column}
                  handleHideColumn={handleHideColumn}
                />
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
                className={styles.columnResizer}
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
                    checked={
                      props.selectedElementsIds.length ===
                        props.elements.length &&
                      props.selectedElementsIds.length > 0
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      props.setSelectedElementsIds(
                        props.elements.length !==
                          props.selectedElementsIds.length
                          ? props.elements.map((el) => el._id)
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
            props.elements.map((element, elementIndex) => {
              return (
                <tr className={styles.tableRow} key={elementIndex}>
                  {props.columns.map((column, columnIndex) => {
                    if (hiddenColumns.some((el) => el.name === column.name)) {
                      return null;
                    }
                    return (
                      <Column
                        element={element}
                        column={column}
                        elementIndex={elementIndex}
                      />
                    );
                  })}
                  {props.canUpdate && (
                    <td
                      className={styles.tableColumn}
                      // This data-cy is used for when we don't know the id of the element, but we know the index (for example, using first() in cypress)
                      data-cy="elementEdit"
                    >
                      <AiFillEdit
                        onClick={() => props.handleEdit(element)}
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
                      className={styles.columnResizer}
                      minWidth={0}
                    />
                  )}

                  {props.canDelete && (
                    <td className={styles.actionColumn}>
                      <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={
                          props.selectedElementsIds.indexOf(element._id) !== -1
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          props.handleToggleElementSelect(e, element)
                        }
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
                      className={styles.columnResizer}
                      minWidth={0}
                    />
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

interface IColumnHeadProps {
  column: IColumn;
  elementIndex: number;
  handleHideColumn: (column: IColumn) => void;
}

const HeaderColumn: React.FunctionComponent<IColumnHeadProps> = (
  props: IColumnHeadProps
) => {
  const { styles, stickLeft, columnRef } = useColumnStyle();

  return (
    <React.Fragment>
      <th
        className={
          styles.tableHeaderColumn +
          (props.column.stick ? " " + styles.stickHeaderColumn : "")
        }
        style={{
          left: props.column.stick ? stickLeft : "initial",
        }}
        ref={columnRef}
      >
        {props.column.label}
        {props.handleHideColumn && !props.column.stick && (
          <ColumnOptions
            handleHideColumn={() => props.handleHideColumn(props.column)}
          />
        )}
      </th>
      <ColumnResizer
        disabled={Boolean(props.column.stick)}
        maxWidth={null}
        id={props.elementIndex}
        resizeStart={() => {}}
        resizeEnd={() => {}}
        className={
          "columnResizer" +
          (props.column.stick ? " " + styles.stickHeaderColumn : "")
        }
        minWidth={0}
      />
    </React.Fragment>
  );
};

interface IColumnProps {
  column: IColumn;
  element: IElement;
  elementIndex: number;
}

const Column: React.FunctionComponent<IColumnProps> = (props: IColumnProps) => {
  const getTranslatedText = useGetTranslatedText();
  const { styles, stickLeft, columnRef } = useColumnStyle();

  return (
    <React.Fragment>
      <td
        ref={columnRef}
        className={
          styles.tableColumn +
          (props.column.stick ? " " + styles.stickColumn : "")
        }
        style={{
          left: props.column.stick ? stickLeft : "initial",
        }}
      >
        {props.column.render ? (
          props.column.render(props.element)
        ) : props.column.RenderComponent ? (
          <props.column.RenderComponent element={props.element as IElement} />
        ) : (
          getTranslatedText((props.element as IElement)[props.column.name])
        )}
      </td>
      <ColumnResizer
        disabled={Boolean(props.column.stick)}
        maxWidth={null}
        id={props.elementIndex + 10000}
        resizeStart={() => {}}
        resizeEnd={() => {}}
        className={
          "columnResizer" + (props.column.stick ? " " + styles.stickColumn : "")
        }
        minWidth={0}
      />
    </React.Fragment>
  );
};

export default ElementsTable;
