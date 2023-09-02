import { IEntityFieldValueForm } from "../components/editors/entityEditor/EntityEditorForm";
import IFile from "../globalTypes/IFile";
import ITranslatedText from "../globalTypes/ITranslatedText";
import {
  IEntityTableFieldCaseValueCommand,
  IEntityYearTableFieldRowValuesCommand,
} from "../hooks/apiHooks/useCreateEntity";
import {
  IEntityFieldValue,
  IEntityTableFieldCaseValue,
  IEntityYearTableFieldRowValues,
} from "../store/slices/entitySlice";
import { FieldType } from "../store/slices/fieldSlice";
import {
  IModel,
  IModelField,
  ModelFieldConditionTypeEnum,
} from "../store/slices/modelSlice";
import areEntityFieldConditionsMet from "./areEntityFieldConditionsMet";
import isValidUrl from "./isValidUrl";

const doesEntityMeetModelStateCondition = ({
  stateConcernedFields,
  entityFieldValues,
  entityFieldValuesFromForm,
  getTranslatedText,
  model,
}: {
  stateConcernedFields: IModelField[];
  entityFieldValues?: IEntityFieldValue[];
  entityFieldValuesFromForm?: IEntityFieldValueForm[];
  getTranslatedText: any;
  model: IModel;
}): boolean => {
  let meetsModelStateCondition: boolean = true;

  // if (stateConcernedFields.length === 0) return false;

  stateConcernedFields.forEach((modelField: IModelField) => {
    // Only consider this field if it's supposed to be shown by field conditions
    const entityFieldConditionsMet: boolean = areEntityFieldConditionsMet({
      modelField,
      entityFieldValues,
      entityFieldValuesFromForm,
      getTranslatedText,
      model,
    });

    if (!entityFieldConditionsMet) return;

    if (
      modelField.field.type === FieldType.Table &&
      modelField.field.tableOptions?.yearTable
    ) {
      if (entityFieldValues) {
        const tableValues: IEntityYearTableFieldRowValues[] | undefined =
          entityFieldValues.find(
            (el) => el.field._id.toString() === modelField.field._id.toString()
          )?.yearTableValues;

        if (!tableValues) {
          meetsModelStateCondition = false;
        } else {
          const fieldIdContainingCondition: string | undefined =
            modelField.conditions
              ?.find(
                (condition) =>
                  condition.conditionType ===
                  ModelFieldConditionTypeEnum.IfYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField
              )
              ?.field?._id.toString();
          const years = parseInt(
            getTranslatedText(
              entityFieldValues.find(
                (entityFieldValue) =>
                  entityFieldValue.field._id.toString() ===
                  fieldIdContainingCondition
              )?.value
            )
          );

          if (isNaN(years) || tableValues.length === 0) {
            meetsModelStateCondition = false;
          } else {
            tableValues.forEach((tableValue) => {
              if (tableValue.values.length < years) {
                meetsModelStateCondition = false;
                return;
              }
              let yearToTest = new Date().getFullYear() + 1;
              while (yearToTest <= new Date().getFullYear() + years) {
                const value = tableValue.values.find(
                  (val) => val.year === yearToTest
                )?.value;
                if (!value || !checkValueFilled(value, getTranslatedText)) {
                  meetsModelStateCondition = false;
                  return;
                }
                yearToTest++;
              }
            });
          }
        }
      } else if (entityFieldValuesFromForm) {
        const tableValues: IEntityYearTableFieldRowValuesCommand[] | undefined =
          entityFieldValuesFromForm.find(
            (el) => el.fieldId.toString() === modelField.field._id.toString()
          )?.yearTableValues;

        if (!tableValues) {
          meetsModelStateCondition = false;
        } else {
          const fieldIdContainingCondition: string | undefined =
            modelField.conditions
              ?.find(
                (condition) =>
                  condition.conditionType ===
                  ModelFieldConditionTypeEnum.IfYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField
              )
              ?.field?._id.toString();
          const years = parseInt(
            getTranslatedText(
              entityFieldValuesFromForm.find(
                (entityFieldValue) =>
                  entityFieldValue.fieldId.toString() ===
                  fieldIdContainingCondition
              )?.value
            )
          );

          if (isNaN(years) || tableValues.length === 0) {
            meetsModelStateCondition = false;
          } else {
            tableValues.forEach((tableValue) => {
              if (tableValue.values.length < years) {
                meetsModelStateCondition = false;
                return;
              }
              let yearToTest = new Date().getFullYear() + 1;
              while (yearToTest <= new Date().getFullYear() + years) {
                const value = tableValue.values.find(
                  (val) => val.year === yearToTest
                )?.value;
                if (!value || !checkValueFilled(value, getTranslatedText)) {
                  meetsModelStateCondition = false;
                  return;
                }
                yearToTest++;
              }
            });
          }
        }
      }
    } else if (
      modelField.field.type === FieldType.Table &&
      !modelField.field.tableOptions?.yearTable
    ) {
      if (entityFieldValues) {
        const tableValues: IEntityTableFieldCaseValue[] | undefined =
          entityFieldValues.find(
            (el) => el.field._id.toString() === modelField.field._id.toString()
          )?.tableValues;
        if (!tableValues) {
          meetsModelStateCondition = false;
        } else {
          tableValues.forEach((tableValue) => {
            if (!checkValueFilled(tableValue.value, getTranslatedText)) {
              meetsModelStateCondition = false;
              return;
            }
          });
        }
      } else if (entityFieldValuesFromForm) {
        const tableValues: IEntityTableFieldCaseValueCommand[] | undefined =
          entityFieldValuesFromForm.find(
            (el) => el.fieldId.toString() === modelField.field._id.toString()
          )?.tableValues;
        if (!tableValues) {
          meetsModelStateCondition = false;
        } else {
          tableValues.forEach((tableValue) => {
            if (!checkValueFilled(tableValue.value, getTranslatedText)) {
              meetsModelStateCondition = false;
              return;
            }
          });
        }
      }
    } else {
      if (modelField.field.type === FieldType.File) {
        if (entityFieldValues) {
          const files: IFile[] | undefined = entityFieldValues.find(
            (el) => el.field._id.toString() === modelField.field._id.toString()
          )?.files;

          if (!files || files?.length === 0) {
            meetsModelStateCondition = false;
            return;
          }
        } else if (entityFieldValuesFromForm) {
          const files: IFile[] | undefined = entityFieldValuesFromForm?.find(
            (el) => el.fieldId === modelField.field._id.toString()
          )?.selectedExistingFiles;
          if (!files || files?.length === 0) {
            meetsModelStateCondition = false;
            return;
          }
        } else {
          meetsModelStateCondition = false;
          return;
        }
      } else {
        const entityFieldValue: any = entityFieldValues
          ? entityFieldValues.find(
              (el) =>
                el.field._id.toString() === modelField.field._id.toString()
            )?.value
          : entityFieldValuesFromForm?.find(
              (el) => el.fieldId === modelField.field._id.toString()
            )?.value;

        if (
          entityFieldValue === undefined ||
          entityFieldValue === null ||
          ((modelField.field.type === FieldType.Paragraph ||
            modelField.field.type === FieldType.Text ||
            modelField.field.type === FieldType.Number) &&
            (getTranslatedText(entityFieldValue) === "" ||
              getTranslatedText(entityFieldValue) === null ||
              getTranslatedText(entityFieldValue) === undefined)) ||
          (modelField.field.type === FieldType.IFrame &&
            !isValidUrl(entityFieldValue))
        ) {
          meetsModelStateCondition = false;
        }
      }
    }
  });

  return meetsModelStateCondition;
};

const checkValueFilled = (
  value: ITranslatedText[] | string,
  getTranslatedText: any
): boolean => {
  if (
    value === undefined ||
    value === null ||
    getTranslatedText(value) === undefined ||
    getTranslatedText(value) === null ||
    getTranslatedText(value).trim() === ""
  ) {
    return false;
  } else {
    return true;
  }
};

export default doesEntityMeetModelStateCondition;
