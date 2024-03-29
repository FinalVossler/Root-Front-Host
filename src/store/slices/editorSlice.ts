import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import {
  IEntityReadDto,
  IFieldReadDto,
  IMicroFrontendReadDto,
  IModelReadDto,
  IPageReadDto,
  IPaymentMethodReadDto,
  IRoleReadDto,
  IShippingMethodReadDto,
  IUserReadDto,
} from "roottypes";

export enum EditorTypeEnum {
  Field = "Field",
  Model = "Model",
  Entity = "Entity",
  User = "User",
  Role = "Role",
  MicroFrontend = "MicroFrontend",
  Page = "Page",
  WebsiteConfiguration = "WebsiteConfiguration",
  PaymentMethod = "PaymentMethod",
  ShippingMethod = "ShippingMethod",
}

export type IElement =
  | IFieldReadDto
  | IModelReadDto
  | IEntityReadDto
  | IUserReadDto
  | IRoleReadDto
  | IMicroFrontendReadDto
  | IPageReadDto
  | IPaymentMethodReadDto
  | IShippingMethodReadDto;

interface IEditor {
  id: string;
  element?: IElement;
  modelId?: string;
  editorType: EditorTypeEnum;
}

export interface IEditorState {
  editors: IEditor[];
}

const initialState: IEditorState = {
  editors: [],
};

export const editorSlice = createSlice({
  initialState,
  name: "editor",
  reducers: {
    addEditor: (
      state: IEditorState,
      action: PayloadAction<{
        element?: IElement;
        modelId?: string;
        editorType: EditorTypeEnum;
      }>
    ) => {
      const editor: IEditor = {
        id: _.uniqueId(),
        element: action.payload.element,
        modelId: action.payload.modelId,
        editorType: action.payload.editorType,
      };
      state.editors.push(editor);
    },
    removeEditor: (state: IEditorState, action: PayloadAction<string>) => {
      state.editors = state.editors.filter((e) => e.id !== action.payload);
    },
  },
});

const editorReducer = editorSlice.reducer;

export default editorReducer;
