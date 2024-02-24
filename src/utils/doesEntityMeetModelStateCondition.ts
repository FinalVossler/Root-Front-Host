import {
  FieldTypeEnum,
  IEntityFieldValueReadDto,
  IEntityReadDto,
  IEntityTableFieldCaseValueCommand,
  IEntityTableFieldCaseValueReadDto,
  IEntityYearTableFieldRowValuesCommand,
  IEntityYearTableFieldRowValuesReadDto,
  IFieldReadDto,
  IFileReadDto,
  IModelReadDto,
  ITranslatedText,
  ModelFieldConditionTypeEnum,
} from "roottypes";
import { IEntityFieldValueForm } from "../components/appComponents/editors/entityEditor/EntityEditorForm";
import { IModelField } from "../store/slices/modelSlice";
import areEntityFieldConditionsMet from "./areEntityFieldConditionsMet";
import isValidUrl from "./isValidUrl";

const doesEntityMeetModelStateCondition = ({
  stateConcernedFields,
  entityFieldValues,
  entityFieldValuesFromForm,
  getTranslatedText,
  model,
  entity,
}: {
  stateConcernedFields: IModelField[];
  entityFieldValues?: IEntityFieldValueReadDto[];
  entityFieldValuesFromForm?: IEntityFieldValueForm[];
  getTranslatedText: any;
  model: IModelReadDto;
  entity?: IEntityReadDto;
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
      entity,
    });

    // If the field can't be shown because its visibility conditions aren't met, then let alone its state conditions.
    // If doesn't show, then it's impossible for it to be filled. Then the meet states condition should be set to false
    if (!entityFieldConditionsMet) {
      meetsModelStateCondition = false;
      return;
    }

    if (
      (modelField.field as IFieldReadDto).type === FieldTypeEnum.Table &&
      (modelField.field as IFieldReadDto).tableOptions?.yearTable
    ) {
      if (entityFieldValues) {
        const tableValues: IEntityYearTableFieldRowValuesReadDto[] | undefined =
          entityFieldValues.find(
            (el) =>
              (el.field as IFieldReadDto)._id.toString() ===
              (modelField.field as IFieldReadDto)._id.toString()
          )?.yearTableValues;

        if (!tableValues) {
          meetsModelStateCondition = false;
        } else {
          const fieldIdContainingCondition: string | undefined = (
            modelField.conditions?.find(
              (condition) =>
                condition.conditionType ===
                ModelFieldConditionTypeEnum.IfYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField
            )?.field as IFieldReadDto | undefined
          )?._id.toString();
          const years = parseInt(
            getTranslatedText(
              entityFieldValues.find(
                (entityFieldValue) =>
                  (entityFieldValue.field as IFieldReadDto)._id.toString() ===
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
            (el) =>
              el.fieldId.toString() ===
              (modelField.field as IFieldReadDto)._id.toString()
          )?.yearTableValues;

        if (!tableValues) {
          meetsModelStateCondition = false;
        } else {
          const fieldIdContainingCondition: string | undefined = (
            modelField.conditions?.find(
              (condition) =>
                condition.conditionType ===
                ModelFieldConditionTypeEnum.IfYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField
            )?.field as IFieldReadDto | undefined
          )?._id.toString();
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
      (modelField.field as IFieldReadDto).type === FieldTypeEnum.Table &&
      !(modelField.field as IFieldReadDto).tableOptions?.yearTable
    ) {
      if (entityFieldValues) {
        const tableValues: IEntityTableFieldCaseValueReadDto[] | undefined =
          entityFieldValues.find(
            (el) =>
              (el.field as IFieldReadDto)._id.toString() ===
              (modelField.field as IFieldReadDto)._id.toString()
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
            (el) =>
              el.fieldId.toString() ===
              (modelField.field as IFieldReadDto)._id.toString()
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
      if ((modelField.field as IFieldReadDto).type === FieldTypeEnum.File) {
        if (entityFieldValues) {
          const files: (string | IFileReadDto)[] | undefined =
            entityFieldValues.find(
              (el) =>
                (el.field as IFieldReadDto)._id.toString() ===
                (modelField.field as IFieldReadDto)._id.toString()
            )?.files;

          if (!files || files?.length === 0) {
            meetsModelStateCondition = false;
            return;
          }
        } else if (entityFieldValuesFromForm) {
          const files: IFileReadDto[] | undefined =
            entityFieldValuesFromForm?.find(
              (el) =>
                el.fieldId ===
                (modelField.field as IFieldReadDto)._id.toString()
            )?.selectedExistingFiles;
          if (!files || files?.length === 0) {
            meetsModelStateCondition = false;
            return;
          }
        } else {
          meetsModelStateCondition = false;
          return;
        }
      } else if (
        (modelField.field as IFieldReadDto).type === FieldTypeEnum.Button
      ) {
        // If the field is of type button, then the value is probably set by a microFrontend, and is then residing
        // in the entity's custom data stringified object.

        if (
          (modelField.field as IFieldReadDto).type === FieldTypeEnum.Button &&
          entity
        ) {
          let entityFieldValue: any = null;

          try {
            entityFieldValue = JSON.parse(
              entity?.customData?.toString() || "{}"
            )[(modelField.field as IFieldReadDto)._id.toString()];
            if (!entityFieldValue) {
              meetsModelStateCondition = false;
            }
          } catch {
            meetsModelStateCondition = false;
          }
        }
      } else {
        const entityFieldValue: any = entityFieldValues
          ? entityFieldValues.find(
              (el) =>
                (el.field as IFieldReadDto)._id.toString() ===
                (modelField.field as IFieldReadDto)._id.toString()
            )?.value
          : entityFieldValuesFromForm?.find(
              (el) =>
                el.fieldId ===
                (modelField.field as IFieldReadDto)._id.toString()
            )?.value;

        if (
          entityFieldValue === undefined ||
          entityFieldValue === null ||
          (((modelField.field as IFieldReadDto).type ===
            FieldTypeEnum.Paragraph ||
            (modelField.field as IFieldReadDto).type === FieldTypeEnum.Text ||
            (modelField.field as IFieldReadDto).type ===
              FieldTypeEnum.Number) &&
            (getTranslatedText(entityFieldValue) === "" ||
              getTranslatedText(entityFieldValue) === null ||
              getTranslatedText(entityFieldValue) === undefined)) ||
          ((modelField.field as IFieldReadDto).type === FieldTypeEnum.IFrame &&
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
