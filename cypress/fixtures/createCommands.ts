import { FieldCreateCommand } from "../../src/hooks/apiHooks/useCreateField";
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
