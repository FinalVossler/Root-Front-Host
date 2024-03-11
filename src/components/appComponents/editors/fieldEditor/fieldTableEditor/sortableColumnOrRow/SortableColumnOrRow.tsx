import { FormikProps } from "formik";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import useGetTranslatedText from "../../../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../../../store/hooks";
import Input from "../../../../../fundamentalComponents/inputs/input";
import { FieldTableElementForm, IFieldFormFormik } from "../../FieldEditor";
import { BsHandIndexFill } from "react-icons/bs";

import useStyles from "./sortableColumnOrRow.styles";
import { MdDelete } from "react-icons/md";

export enum ColumnOrRow {
  Column = "Column",
  Row = "Row",
}

interface ISortableColumnOrRowProps {
  formik: FormikProps<IFieldFormFormik>;
  columnOrRow: FieldTableElementForm;
  isColumnOrRow: ColumnOrRow;
  index: number;
}

const SortableColumnOrRow: React.FunctionComponent<
  ISortableColumnOrRowProps
> = (props: ISortableColumnOrRowProps) => {
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
    const newRows: FieldTableElementForm[] =
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
    const newRows: FieldTableElementForm[] =
      props.formik.values.tableOptions.rows.map((row, index) => {
        if (index === rowIndex) {
          const newRow = { ...row, name: e.target.value };
          return newRow;
        } else return row;
      }) || [];

    props.formik.setFieldValue("tableOptions", {
      ...props.formik.values.tableOptions,
      rows: newRows,
    });
  };

  const handleDeleteColumnOrRow = (columnOrRow: ColumnOrRow) => {
    const propName = columnOrRow === ColumnOrRow.Row ? "rows" : "columns";

    const newColumnsOrRows: FieldTableElementForm[] = [
      ...props.formik.values.tableOptions[propName],
    ];
    newColumnsOrRows.splice(props.index, 1);

    props.formik.setFieldValue("tableOptions", {
      ...props.formik.values.tableOptions,
      [propName]: newColumnsOrRows,
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
          theme={theme}
          onChange={(e) => {
            handleChangeColumnName(e, props.index);
          }}
          inputProps={{
            placeholder: getTranslatedText(staticText?.columnName),
          }}
          value={props.columnOrRow.name}
        />

        <MdDelete
          className={styles.deleteIcon}
          onClick={() => handleDeleteColumnOrRow(ColumnOrRow.Column)}
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
            theme={theme}
            onChange={(e) => {
              handleChangeRowName(e, props.index);
            }}
            inputProps={{
              placeholder: getTranslatedText(staticText?.rowName),
            }}
            value={props.columnOrRow.name}
          />

          <MdDelete
            className={styles.deleteIcon}
            onClick={() => handleDeleteColumnOrRow(ColumnOrRow.Row)}
          />

          <BsHandIndexFill
            className={styles.sortHandle}
            {...attributes}
            {...listeners}
          />
        </td>

        {props.formik.values.tableOptions.columns.map(
          (column: FieldTableElementForm, columnIndex: number) => {
            return (
              <td key={columnIndex}>
                <Input theme={theme} inputProps={{ disabled: true }} value="" />
              </td>
            );
          }
        )}
      </tr>
    );
  }
};

export default SortableColumnOrRow;
