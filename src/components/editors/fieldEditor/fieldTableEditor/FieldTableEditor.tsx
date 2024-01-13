import { FormikProps } from "formik";
import React from "react";
import { MdAdd } from "react-icons/md";
import uuid from "react-uuid";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { ITheme } from "../../../../config/theme";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import { FieldType } from "../../../../store/slices/fieldSlice";
import Button from "../../../button";
import Checkbox from "../../../checkbox";
import { FieldTableElementForm, IFieldForm } from "../FieldEditor";

import useStyles from "./fieldTableEditor.styles";
import SortableColumnOrRow, {
  ColumnOrRow,
} from "./sortableColumnOrRow/SortableColumnOrRow";
import Input from "../../../input";

interface IFieldTableEditor {
  formik: FormikProps<IFieldForm>;
}

const FieldTableEditor: React.FunctionComponent<IFieldTableEditor> = (
  props: IFieldTableEditor
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.fields
  );

  const styles = useStyles();
  const getTranslatedText = useGetTranslatedText();

  //#region event listeners
  const handleAddColumn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newColumn: FieldTableElementForm = {
      language: props.formik.values.language,
      name: "",
      uuid: uuid(),
    };
    props.formik.setFieldValue("tableOptions", {
      ...props.formik.values.tableOptions,
      columns: [...props.formik.values.tableOptions.columns, newColumn],
    });
  };
  const handleAddRow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const newRow: FieldTableElementForm = {
      language: props.formik.values.language,
      name: "",
      uuid: uuid(),
    };
    props.formik.setFieldValue("tableOptions", {
      ...props.formik.values.tableOptions,
      rows: [...props.formik.values.tableOptions.rows, newRow],
    });
  };

  const handleYearTableChange = (checked: boolean) => {
    props.formik.setFieldValue("tableOptions", {
      ...props.formik.values.tableOptions,
      yearTable: checked,
    });
  };
  const handleDragEnd = (columnOrRow: ColumnOrRow) => (event: DragEndEvent) => {
    const propName = columnOrRow === ColumnOrRow.Row ? "rows" : "columns";

    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = props.formik.values.tableOptions[propName]
        .map((column) => column.uuid)
        .indexOf(active.id as string);
      const newIndex = props.formik.values.tableOptions[propName]
        .map((column) => column.uuid)
        .indexOf(over.id as string);

      const newColumnsOrRows = arrayMove(
        props.formik.values.tableOptions[propName],
        oldIndex,
        newIndex
      );

      props.formik.setFieldValue("tableOptions", {
        ...props.formik.values.tableOptions,
        [propName]: newColumnsOrRows,
      });
    }
  };
  const handleTableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.formik.setFieldValue("tableOptions", {
      ...props.formik.values.tableOptions,
      name: e.target.value,
    });
  };
  //#region event listeners

  if (props.formik.values.type !== FieldType.Table) {
    return null;
  }

  return (
    <div className={styles.fieldTableEditorContainer}>
      <Checkbox
        label={getTranslatedText(staticText?.yearTable)}
        checked={props.formik.values.tableOptions.yearTable}
        onChange={handleYearTableChange}
      />
      {!props.formik.values.tableOptions?.yearTable && (
        <Button onClick={handleAddColumn}>
          {getTranslatedText(staticText?.addColumn)} <MdAdd />
        </Button>
      )}
      <br />
      <Button onClick={handleAddRow}>
        {getTranslatedText(staticText?.addRow)}
        <MdAdd />
      </Button>
      <table className={styles.fieldTableEditorTable}>
        <thead>
          <tr>
            <th>
              <Input
                onChange={handleTableNameChange}
                inputProps={{
                  placeholder: getTranslatedText(staticText?.tableName),
                }}
                value={props.formik.values.tableOptions.name}
              />
            </th>
            <DndContext onDragEnd={handleDragEnd(ColumnOrRow.Column)}>
              <SortableContext
                items={props.formik.values.tableOptions.columns.map(
                  (column) => column.uuid
                )}
              >
                {props.formik.values.tableOptions.columns.map(
                  (column: FieldTableElementForm, columnIndex: number) => {
                    return (
                      <SortableColumnOrRow
                        key={columnIndex}
                        columnOrRow={column}
                        isColumnOrRow={ColumnOrRow.Column}
                        index={columnIndex}
                        formik={props.formik}
                      />
                    );
                  }
                )}
              </SortableContext>
            </DndContext>
          </tr>
        </thead>
        <tbody>
          <DndContext onDragEnd={handleDragEnd(ColumnOrRow.Row)}>
            <SortableContext
              items={props.formik.values.tableOptions.rows.map(
                (column) => column.uuid
              )}
            >
              {props.formik.values.tableOptions.rows.map(
                (row: FieldTableElementForm, rowIndex: number) => {
                  return (
                    <SortableColumnOrRow
                      key={rowIndex}
                      columnOrRow={row}
                      isColumnOrRow={ColumnOrRow.Row}
                      index={rowIndex}
                      formik={props.formik}
                    />
                  );
                }
              )}
            </SortableContext>
          </DndContext>
        </tbody>
      </table>
    </div>
  );
};

export default FieldTableEditor;
