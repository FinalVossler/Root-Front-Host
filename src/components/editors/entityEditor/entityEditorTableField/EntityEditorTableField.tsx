import { FormikProps } from "formik";
import React from "react";

import { Theme } from "../../../../config/theme";
import {
  IEntityTableFieldCaseValueCommand,
  IEntityYearTableFieldRowValuesCommand,
} from "../../../../hooks/apiHooks/useCreateEntity";

import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import { IFieldTableElement } from "../../../../store/slices/fieldSlice";
import {
  IModel,
  IModelField,
  ModelFieldConditionTypeEnum,
} from "../../../../store/slices/modelSlice";
import Input from "../../../input";
import {
  IEntityEditorFormForm,
  IEntityFieldValueForm,
} from "../EntityEditorForm";

import useStyles from "./entityEditorTableField.styles";

interface IEntityEditorTableField {
  modelId?: string;
  modelField: IModelField;
  canEdit: boolean;
  entityFieldValue: IEntityFieldValueForm | undefined;
  formik: FormikProps<IEntityEditorFormForm>;
}
const EntityEditorTableField: React.FunctionComponent<IEntityEditorTableField> =
  (props: IEntityEditorTableField) => {
    const model: IModel | undefined = useAppSelector((state) =>
      state.model.models.find((m) => m._id === props.modelId)
    );
    const theme: Theme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );

    const getTranslatedText = useGetTranslatedText();
    const styles = useStyles({ theme });

    //#region event listeners
    const handleChangeTableCaseValue = ({
      columnId,
      rowId,
      value,
      year,
    }: {
      columnId?: string;
      rowId: string;
      value: string;
      year?: number;
    }) => {
      const newEntityFieldValues: IEntityFieldValueForm[] =
        props.formik.values.entityFieldValues.map((entityFieldValue) => {
          if (
            entityFieldValue.fieldId.toString() ===
            props.modelField.field._id.toString()
          ) {
            if (!props.modelField.field.tableOptions?.yearTable) {
              let newTableValues: IEntityTableFieldCaseValueCommand[] = [
                ...(entityFieldValue.tableValues || []),
              ];
              const foundTableValue:
                | IEntityTableFieldCaseValueCommand
                | undefined = entityFieldValue.tableValues.find(
                (caseValue) =>
                  caseValue.columnId === columnId && caseValue.rowId === rowId
              );
              if (!foundTableValue) {
                newTableValues.push({
                  columnId: columnId || "",
                  rowId,
                  value,
                });
              } else {
                newTableValues = newTableValues.map((tableValue) => {
                  if (
                    tableValue.columnId === columnId &&
                    tableValue.rowId === rowId
                  ) {
                    return {
                      ...tableValue,
                      value,
                    };
                  } else {
                    return tableValue;
                  }
                });
              }

              return {
                ...entityFieldValue,
                tableValues: newTableValues,
              };
            } else {
              // This is a year table
              let newYearTableValues: IEntityYearTableFieldRowValuesCommand[] =
                [...(entityFieldValue.yearTableValues || [])];
              const foundYearTableRowValues:
                | IEntityYearTableFieldRowValuesCommand
                | undefined = entityFieldValue.yearTableValues.find(
                (rowValues) => rowValues.rowId === rowId
              );
              if (!foundYearTableRowValues) {
                newYearTableValues.push({
                  rowId,
                  values: [
                    {
                      value,
                      year:
                        year || parseInt(new Date().getFullYear().toString()),
                    },
                  ],
                });
              } else {
                newYearTableValues = newYearTableValues.map(
                  (yearTableValue) => {
                    if (yearTableValue.rowId === rowId) {
                      const yearValue = yearTableValue.values.find(
                        (yearTableValue) => yearTableValue.year === year
                      );
                      if (yearValue) {
                        return {
                          ...yearTableValue,
                          values: yearTableValue.values.map((pot) => {
                            if (pot.year === year) {
                              return {
                                ...pot,
                                value,
                              };
                            } else {
                              return pot;
                            }
                          }),
                        };
                      } else {
                        return {
                          ...yearTableValue,
                          values: [
                            ...yearTableValue.values,
                            { value, year: year || new Date().getFullYear() },
                          ],
                        };
                      }
                    } else {
                      return yearTableValue;
                    }
                  }
                );
              }

              return {
                ...entityFieldValue,
                yearTableValues: newYearTableValues,
              };
            }
          } else {
            return entityFieldValue;
          }
        });
      props.formik.setFieldValue("entityFieldValues", newEntityFieldValues);
    };
    //#endregion event listeners

    //#region view
    let columns: IFieldTableElement[] = [];

    if (props.modelField.field.tableOptions?.yearTable) {
      const fieldContainingNumberOfYearsId: string | undefined =
        props.modelField?.conditions
          ?.find(
            (c) =>
              c.conditionType ===
              ModelFieldConditionTypeEnum.IfYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField
          )
          ?.field?._id.toString();

      const numberOfYearsInTheFuture: number | undefined = parseInt(
        (props.formik.values.entityFieldValues.find(
          (e) => e.fieldId.toString() === fieldContainingNumberOfYearsId
        )?.value || 0) + ""
      );

      if (numberOfYearsInTheFuture) {
        let i = 1;
        while (i <= numberOfYearsInTheFuture) {
          columns.push({
            _id: "",
            name: [{ text: new Date().getFullYear() + i + "", language: "en" }],
          });
          i++;
        }
      }
    } else {
      columns = props.modelField.field.tableOptions?.columns || [];
    }
    //#endregion view

    return (
      <table className={styles.entityEditorTableFieldContainer}>
        <thead>
          <tr>
            <th className={styles.tableTd}>
              {getTranslatedText(props.modelField.field.tableOptions?.name)}
            </th>
            {columns.map((column, columnIndex: number) => {
              return (
                <th className={styles.tableTd} key={columnIndex}>
                  {getTranslatedText(column.name)}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {props.modelField.field.tableOptions?.rows.map(
            (row, rowIndex: number) => {
              return (
                <tr key={rowIndex}>
                  <td className={styles.tableTd}>
                    {getTranslatedText(row.name)}
                  </td>
                  {columns.map((column, columnIndex: number) => {
                    return (
                      <td className={styles.inputTd} key={columnIndex}>
                        <Input
                          inputProps={{
                            disabled: !Boolean(props.canEdit),
                            style: {
                              marginBottom: 0,
                            },
                          }}
                          onChange={(e) =>
                            handleChangeTableCaseValue({
                              rowId: row._id,
                              value: e.target.value,
                              columnId: props.modelField.field.tableOptions
                                ?.yearTable
                                ? undefined
                                : column._id,
                              year: parseInt(
                                getTranslatedText(
                                  column.name,
                                  props.formik.values.language
                                )
                              ),
                            })
                          }
                          value={
                            props.modelField.field.tableOptions?.yearTable
                              ? props.entityFieldValue?.yearTableValues
                                  .find(
                                    (yearTableValue) =>
                                      yearTableValue.rowId.toString() ===
                                      row._id.toString()
                                  )
                                  ?.values.find(
                                    (rowColumnValue) =>
                                      rowColumnValue.year ===
                                      // the parsedInt column name is equal to the year
                                      parseInt(
                                        getTranslatedText(
                                          column.name,
                                          props.formik.values.language
                                        )
                                      )
                                  )?.value || ""
                              : props.entityFieldValue?.tableValues.find(
                                  (tableValue) =>
                                    tableValue.columnId ===
                                      column._id.toString() &&
                                    tableValue.rowId.toString() ===
                                      row._id.toString()
                                )?.value || ""
                          }
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    );
  };

export default EntityEditorTableField;
