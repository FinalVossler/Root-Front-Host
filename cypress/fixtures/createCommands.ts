import { FieldCreateCommand } from "../../src/hooks/apiHooks/useCreateField";
import { ModelCreateCommand } from "../../src/hooks/apiHooks/useCreateModel";
import { FieldType } from "../../src/store/slices/fieldSlice";

export const createCreateFieldCommand = (
  fieldName: string
): FieldCreateCommand => ({
  fieldEvents: [],
  name: fieldName,
  language: "en",
  canChooseFromExistingFiles: false,
  tableOptions: {
    columns: [],
    name: "",
    rows: [],
    yearTable: false,
  },
  type: FieldType.Text,
  options: [],
});

export const createCreateModelCommand = (
  modelName: string,
  fieldsIds: string[],
  requiredFieldsIds?: string[]
): ModelCreateCommand => ({
  language: "en",
  modelEvents: [],
  modelFields: fieldsIds.map((fieldId) => ({
    fieldId,
    mainField: true,
    modelStatesIds: [],
    required: Boolean(requiredFieldsIds?.some((el) => el === fieldId)),
    conditions: [],
  })),
  name: modelName,
  states: [],
  subStates: [],
});
