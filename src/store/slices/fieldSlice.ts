import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { IEvent } from "../../globalTypes/IEvent";
import ITranslatedText from "../../globalTypes/ITranslatedText";
import PaginationResponse from "../../globalTypes/PaginationResponse";

export enum FieldType {
  Number = "Number",
  Text = "Text",
  Paragraph = "Paragraph",
  File = "File",
  Selector = "Selector",
  Button = "Button",
  Table = "Table",
  IFrame = "IFrame",
}

export type FieldOption = {
  value: string;
  label: ITranslatedText[];
};

export interface IFieldTableElement {
  _id: string;
  name: ITranslatedText[];
}

export interface IField {
  _id: string;
  name: ITranslatedText[];
  type: FieldType;
  canChooseFromExistingFiles?: boolean;
  options?: FieldOption[];
  fieldEvents: IEvent[];
  tableOptions?: {
    name: ITranslatedText[];
    columns: IFieldTableElement[];
    rows: IFieldTableElement[];
    yearTable: boolean;
  };

  createdAt: string;
  updatedAt: string;
}

export interface IFieldState {
  fields: IField[];
  total: number;
  searchedFields: PaginationResponse<IField>;
}

const initialState: IFieldState = {
  fields: [],
  total: 0,
  searchedFields: {
    data: [],
    total: 0,
  },
};

export const fieldSlice = createSlice({
  initialState,
  name: "field",
  reducers: {
    setFields: (
      state: IFieldState,
      action: PayloadAction<{ fields: IField[]; total: number }>
    ) => {
      const fields: IField[] = action.payload.fields;
      const total: number = action.payload.total;
      state.fields = fields;
      state.total = total;
    },
    addField: (state: IFieldState, action: PayloadAction<IField>) => {
      const field: IField = action.payload;
      state.fields.unshift(field);
    },
    updateField: (state: IFieldState, action: PayloadAction<IField>) => {
      const field: IField = action.payload;
      state.fields = state.fields.map((f) => (f._id === field._id ? field : f));
      state.searchedFields.data = state.searchedFields.data.map((f) =>
        f._id === field._id ? field : f
      );
    },
    deleteFields: (state: IFieldState, action: PayloadAction<string[]>) => {
      const fieldsIds: string[] = action.payload;
      state.fields = state.fields.filter(
        (f) => fieldsIds.indexOf(f._id) === -1
      );
      state.searchedFields.data = state.searchedFields.data.filter(
        (u) => fieldsIds.indexOf(u._id) === -1
      );
    },
    setSearchedFields: (
      state: IFieldState,
      action: PayloadAction<PaginationResponse<IField>>
    ) => {
      state.searchedFields = action.payload;
    },
  },
});

export default fieldSlice.reducer;
