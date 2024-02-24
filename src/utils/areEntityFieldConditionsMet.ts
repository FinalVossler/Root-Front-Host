import {
  FieldTypeEnum,
  IEntityFieldValueReadDto,
  IEntityReadDto,
  IFieldReadDto,
  IModelReadDto,
  IModelStateReadDto,
  ModelFieldConditionTypeEnum,
} from "roottypes";
import { IEntityFieldValueForm } from "../components/appComponents/editors/entityEditor/EntityEditorForm";
import { IModelField } from "../store/slices/modelSlice";
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
  entityFieldValues?: IEntityFieldValueReadDto[];
  entityFieldValuesFromForm?: IEntityFieldValueForm[];
  getTranslatedText: any;
  model: IModelReadDto;
  entity?: IEntityReadDto;
}): boolean => {
  if (modelField.conditions && modelField.conditions?.length > 0) {
    let conditionsMet: boolean = true;

    modelField.conditions.forEach((condition) => {
      let value: any = null;

      if (entityFieldValuesFromForm) {
        value = entityFieldValuesFromForm.find(
          (entityFieldValue) =>
            entityFieldValue.fieldId === (condition.field as IFieldReadDto)?._id
        )?.value;
      }
      if (!value && entityFieldValues) {
        value = entityFieldValues.find(
          (entityFieldValue) =>
            (entityFieldValue.field as IFieldReadDto)._id ===
            (condition.field as IFieldReadDto)?._id
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
        if ((condition.field as IFieldReadDto)?.type === FieldTypeEnum.Number) {
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
            if (
              (condition.field as IFieldReadDto)?.type !== FieldTypeEnum.Number
            ) {
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
                    modelState: condition.modelState as IModelStateReadDto,
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
