import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import ITranslatedText from "../../globalTypes/ITranslatedText";

export enum FieldType {
  Number = "Number",
  Text = "Text",
  Paragraph = "Paragraph",
}

export interface IField {
  _id: string;
  name: ITranslatedText;
  type: FieldType;
}

export interface IFieldState {
  fields: IField[];
}

const initialState: IFieldState = {
  fields: [],
};

export const fieldSlice = createSlice({
  initialState,
  name: "field",
  reducers: {
    addField: (state: IFieldState, action: PayloadAction<IField>) => {
      const field: IField = action.payload;
      state.fields.unshift(field);
    },
    updateField: (state: IFieldState, action: PayloadAction<IField>) => {
      const field: IField = action.payload;
      state.fields = state.fields.map((f) => (f._id === field._id ? field : f));
    },
  },
});

export default fieldSlice.reducer;
