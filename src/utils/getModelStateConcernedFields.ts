import {
  IModelReadDto,
  IModelField,
  IModelStateReadDto,
} from "../store/slices/modelSlice";

// Get the fields that are necessary to meet the model state conditions
const getModelStateConcernedFields = ({
  model,
  modelState,
}: {
  model: IModelReadDto;
  modelState: IModelStateReadDto;
}): IModelField[] => {
  const stateConcernedFields: IModelField[] = [];
  model.modelFields.forEach((modelField) => {
    if (
      Boolean(
        modelField.states?.find(
          (el) => el._id.toString() === modelState._id.toString()
        )
      )
    ) {
      stateConcernedFields.push(modelField);
    }
  });

  return stateConcernedFields;
};

export default getModelStateConcernedFields;
