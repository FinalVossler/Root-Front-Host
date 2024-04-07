import {
  FieldTypeEnum,
  IFieldCreateCommand,
  IModelCreateCommand,
  ModelViewTypeEnum,
} from "roottypes";

export const createCreateFieldCommand = (
  fieldName: string
): IFieldCreateCommand => ({
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
  type: FieldTypeEnum.Text,
  options: [],
});

export const createCreateModelCommand = (
  modelName: string,
  fieldsIds: string[],
  requiredFieldsIds?: string[]
): IModelCreateCommand => ({
  language: "en",
  modelEvents: [],
  modelFields: fieldsIds.map((fieldId) => ({
    isVariation: false,
    stickInTable: false,
    fieldId,
    mainField: true,
    modelStatesIds: [],
    required: Boolean(requiredFieldsIds?.some((el) => el === fieldId)),
    conditions: [],
  })),
  name: modelName,
  states: [],
  subStates: [],
  isForOrders: false,
  isForSale: false,
  sections: [],
  viewType: ModelViewTypeEnum.LinearView,
  showInSideMenu: true,
});
