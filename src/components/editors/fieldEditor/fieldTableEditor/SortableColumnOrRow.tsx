import { FormikProps } from "formik";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { FieldTableElementUpdateCommand } from "../../../../hooks/apiHooks/useUpdateField";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import Input from "../../../input";
import { FieldTableElementForm, IFieldForm } from "../FieldEditor";
import { BsHandIndexFill } from "react-icons/bs";

import useStyles from "./fieldTableEditor.styles";

export enum ColumnOrRow {
  Column = "Column",
  Row = "Row",
}

interface ISortableColumnOrRow {
  formik: FormikProps<IFieldForm>;
  columnOrRow: FieldTableElementForm;
  isColumnOrRow: ColumnOrRow;
  index: number;
}

const SortableColumnOrRow: React.FunctionComponent<ISortableColumnOrRow> = (
  props: ISortableColumnOrRow
) => {
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.fields
  );

  const styles = useStyles();
  const getTranslatedText = useGetTranslatedText();
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: props.columnOrRow.uuid,
  });

  //#region event listners
  const handleChangeColumnName = (
    e: React.ChangeEvent<HTMLInputElement>,
    columnOrRowIndex: number
  ) => {
    const newRows: FieldTableElementUpdateCommand[] =
      props.formik.values.tableOptions[
        props.isColumnOrRow === ColumnOrRow.Column ? "columns" : "rows"
      ].map((columnOrRow, index) => {
        if (index === columnOrRowIndex) {
          const newRow = { ...columnOrRow, name: e.target.value };
          return newRow;
        } else return columnOrRow;
      }) || [];

    props.formik.setFieldValue("tableOptions", {
      ...props.formik.values.tableOptions,
      columns: newRows,
    });
  };

  const handleChangeRowName = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const newRows: FieldTableElementUpdateCommand[] =
      props.formik.values.tableOptions.rows.map((rown, index) => {
        if (index === rowIndex) {
          const newRow = { ...rown, name: e.target.value };
          return newRow;
        } else return rown;
      }) || [];

    props.formik.setFieldValue("tableOptions", {
      ...props.formik.values.tableOptions,
      rows: newRows,
    });
  };
  //#endregion event listners

  const sorteStyles = {
    transform: CSS.Transform.toString(transform),
  };

  if (props.isColumnOrRow === ColumnOrRow.Column) {
    return (
      <th ref={setNodeRef} style={sorteStyles} className={styles.columnOrRow}>
        <Input
          onChange={(e) => {
            handleChangeColumnName(e, props.index);
          }}
          inputProps={{
            placeholder: getTranslatedText(staticText?.columnName),
          }}
          value={props.columnOrRow.name}
        />

        <BsHandIndexFill
          className={styles.sortHandle}
          {...attributes}
          {...listeners}
        />
      </th>
    );
  } else {
    return (
      <tr ref={setNodeRef} style={sorteStyles}>
        <td className={styles.columnOrRow}>
          <Input
            onChange={(e) => {
              handleChangeRowName(e, props.index);
            }}
            inputProps={{
              placeholder: getTranslatedText(staticText?.rowName),
            }}
            value={props.columnOrRow.name}
          />

          <BsHandIndexFill
            className={styles.sortHandle}
            {...attributes}
            {...listeners}
          />
        </td>

        {props.formik.values.tableOptions.columns.map(
          (column: FieldTableElementUpdateCommand, columnIndex: number) => {
            return <td key={columnIndex}></td>;
          }
        )}
      </tr>
    );
  }
};

export default SortableColumnOrRow;
