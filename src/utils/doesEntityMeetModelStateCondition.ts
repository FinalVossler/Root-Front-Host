import { IEntity } from "../store/slices/entitySlice";
import { FieldType } from "../store/slices/fieldSlice";
import { IModelField } from "../store/slices/modelSlice";
import areEntityFieldConditionsMet from "./areEntityFieldConditionsMet";

const doesEntityMeetModelStateCondition = ({
  stateConcernedFields,
  entity,
  getTranslatedText,
}: {
  stateConcernedFields: IModelField[];
  entity: IEntity;
  getTranslatedText: any;
}): boolean => {
  let meetsModelStateCondition: boolean = true;

  stateConcernedFields.forEach((modelField: IModelField) => {
    // Only consider this field if it's supposed to be shown by field conditions
    const entityFieldConditionsMet: boolean = areEntityFieldConditionsMet({
      modelField,
      entityFieldValues: entity.entityFieldValues,
      getTranslatedText,
    });

    if (!entityFieldConditionsMet) return;

    const entityFieldValue: any = entity.entityFieldValues.find(
      (el) => el.field._id.toString() === modelField.field._id.toString()
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
