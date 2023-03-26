import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import ITranslatedText from "../../globalTypes/ITranslatedText";

export enum FieldType {
  Number = "Number",
  Text = "Text",
  Paragraph = "Paragraph",
  File = "File",
  Selector = "Selector",
}

export type FieldOption = {
  value: string;
  label: ITranslatedText[];
};

export interface IField {
  _id: string;
  name: ITranslatedText[];
  type: FieldType;
  options?: FieldOption[];

  createdAt: string;
  updatedAt: string;
}

export interface IFieldState {
  fields: IField[];
  total: number;
}

const initialState: IFieldState = {
  fields: [],
  total: 0,
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
    },
    deleteFields: (state: IFieldState, action: PayloadAction<string[]>) => {
      const fieldsIds: string[] = action.payload;
      state.fields = state.fields.filter(
        (f) => fieldsIds.indexOf(f._id) === -1
      );
    },
  },
});

export default fieldSlice.reducer;
