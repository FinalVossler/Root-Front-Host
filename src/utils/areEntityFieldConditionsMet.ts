import { IEntityFieldValueForm } from "../components/editors/entityEditor/EntityEditorForm";
import { IEntity, IEntityFieldValue } from "../store/slices/entitySlice";
import { FieldType } from "../store/slices/fieldSlice";
import {
  IModel,
  IModelField,
  ModelFieldConditionTypeEnum,
} from "../store/slices/modelSlice";
import doesEntityMeetModelStateCondition from "./doesEntityMeetModelStateCondition";
import getModelStateConcernedFields from "./getModelStateConcernedFields";

const areEntityFieldConditionsMet = ({
  modelField,
  entityFieldValues,
  entityFieldValuesFromForm,
  getTranslatedText,
  model,
  entity,
}: {
  modelField: IModelField;
  entityFieldValues?: IEntityFieldValue[];
  entityFieldValuesFromForm?: IEntityFieldValueForm[];
  getTranslatedText: any;
  model: IModel;
  entity?: IEntity;
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
      if (!value && entityFieldValues) {
        value = entityFieldValues.find(
          (entityFieldValue) =>
            entityFieldValue.field._id === condition.field?._id
        )?.value;
        value = getTranslatedText(value);
      }

      if (
        !value &&
        condition.conditionType !==
          ModelFieldConditionTypeEnum.StateConditionsMet
      ) {
        conditionsMet = false;
      } else {
        let conditionValue = condition.value ?? "";
        let fieldValue = value;
        if (condition.field?.type === FieldType.Number) {
          try {
            conditionValue = parseInt(conditionValue + "");
            fieldValue = parseInt(fieldValue + "");
          } catch {}
        }

        switch (condition.conditionType) {
          case ModelFieldConditionTypeEnum.Equal:
            if (fieldValue !== conditionValue) {
              conditionsMet = false;
            }
            break;
          case ModelFieldConditionTypeEnum.InferiorTo: {
            if (fieldValue >= conditionValue) {
              conditionsMet = false;
            }
            break;
          }
          case ModelFieldConditionTypeEnum.SuperiorTo: {
            if (fieldValue <= conditionValue) {
              conditionsMet = false;
            }

            break;
          }
          case ModelFieldConditionTypeEnum.InferiorOrEqualTo: {
            if (fieldValue > conditionValue) {
              conditionsMet = false;
            }
            break;
          }
          case ModelFieldConditionTypeEnum.SuperiorOrEqualTo: {
            if (value < conditionValue) {
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
              (condition.value ?? "").toString() < currentYear.toString() ||
              currentYear + parseInt(value) <
                parseInt((condition.value ?? "").toString())
            ) {
              conditionsMet = false;
            }
            break;
          }
          case ModelFieldConditionTypeEnum.StateConditionsMet: {
            if (!condition.modelState) {
              conditionsMet = false;
            } else {
              const entityMeetsModelStateCondition: boolean =
                doesEntityMeetModelStateCondition({
                  entityFieldValues: entityFieldValues,
                  entityFieldValuesFromForm,
                  getTranslatedText,
                  stateConcernedFields: getModelStateConcernedFields({
                    model,
                    modelState: condition.modelState,
                  }),
                  model,
                  entity,
                });

              if (!entityMeetsModelStateCondition) {
                conditionsMet = false;
              }

              break;
            }
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
