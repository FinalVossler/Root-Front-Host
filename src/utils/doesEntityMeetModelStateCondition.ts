import { IEntityFieldValueForm } from "../components/editors/entityEditor/EntityEditorForm";
import { IEntityFieldValue } from "../store/slices/entitySlice";
import { FieldType } from "../store/slices/fieldSlice";
import { IModel, IModelField } from "../store/slices/modelSlice";
import areEntityFieldConditionsMet from "./areEntityFieldConditionsMet";

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

    const entityFieldValue: any = entityFieldValues
      ? entityFieldValues.find(
          (el) => el.field._id.toString() === modelField.field._id.toString()
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
          getTranslatedText(entityFieldValue) === undefined))
    ) {
      meetsModelStateCondition = false;
    }
  });

  return meetsModelStateCondition;
};

export default doesEntityMeetModelStateCondition;
