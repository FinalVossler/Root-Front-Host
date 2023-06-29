import React from "react";
import { TbDatabaseOff } from "react-icons/tb";
import { Theme } from "../../../../config/theme";

import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import { IEntity } from "../../../../store/slices/entitySlice";
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
  entity?: IEntityEditorFormForm;
  modelId?: string;
  modelField: IModelField;
  canEdit: boolean;
  entityFieldValue: IEntityFieldValueForm | undefined;
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
        (props.entity?.entityFieldValues.find(
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
                          value=""
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
