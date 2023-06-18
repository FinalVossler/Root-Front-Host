import { IEntityFieldValueForm } from "../components/editors/entityEditor/EntityEditorForm";
import { IEntityFieldValue } from "../store/slices/entitySlice";
import { FieldType } from "../store/slices/fieldSlice";
import {
  IModelField,
  ModelFieldConditionTypeEnum,
} from "../store/slices/modelSlice";

const areEntityFieldConditionsMet = ({
  modelField,
  entityFieldValues,
  entityFieldValuesFromForm,
  getTranslatedText,
}: {
  modelField: IModelField;
  entityFieldValues?: IEntityFieldValue[];
  entityFieldValuesFromForm?: IEntityFieldValueForm[];
  getTranslatedText?: any;
}): boolean => {
  if (modelField.conditions && modelField.conditions?.length > 0) {
    let conditionsMet: boolean = true;

    modelField.conditions.forEach((condition) => {
      let value: any = null;

      if (entityFieldValuesFromForm) {
        value = entityFieldValuesFromForm.find(
          (entityFieldValue) =>
            entityFieldValue.fieldId === condition.field?._id
        )?.value;
      }
      if (entityFieldValues) {
        value = entityFieldValues.find(
          (entityFieldValue) =>
            entityFieldValue.field._id === condition.field?._id
        )?.value;
        value = getTranslatedText(value);
      }

      if (!value) {
        conditionsMet = false;
      } else {
        switch (condition.conditionType) {
          case ModelFieldConditionTypeEnum.Equal:
            if (value !== condition.value) {
              conditionsMet = false;
            }
            break;
          case ModelFieldConditionTypeEnum.InferiorTo: {
            if (value >= condition.value) {
              conditionsMet = false;
            }
            break;
          }
          case ModelFieldConditionTypeEnum.SuperiorTo: {
            if (value <= condition.value) {
              conditionsMet = false;
            }
            break;
          }
          case ModelFieldConditionTypeEnum.InferiorOrEqualTo: {
            if (value > condition.value) {
              conditionsMet = false;
            }
            break;
          }
          case ModelFieldConditionTypeEnum.SuperiorOrEqualTo: {
            if (value < condition.value) {
              conditionsMet = false;
            }
            break;
          }
          case ModelFieldConditionTypeEnum.ValueInferiorOrEqualToCurrentYearPlusValueOfFieldAndSuperiorOrEqualToCurrentYear: {
            if (condition.field?.type !== FieldType.Number) {
              conditionsMet = false;
            }
            const currentYear: number = new Date().getFullYear();

            if (
              condition.value < currentYear ||
              currentYear + parseInt(value) <
                parseInt(condition.value.toString())
            ) {
              conditionsMet = false;
            }
            break;
          }
        }
      }
    });

    return conditionsMet;
  }

  // If no conditions exist, then we always show the field
  return true;
};

export default areEntityFieldConditionsMet;
