import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { IFieldReadDto, IPaginationResponse } from "roottypes";

export interface IFieldState {
  fields: IFieldReadDto[];
  total: number;
  searchedFields: IPaginationResponse<IFieldReadDto>;
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
      action: PayloadAction<{ fields: IFieldReadDto[]; total: number }>
    ) => {
      const fields: IFieldReadDto[] = action.payload.fields;
      const total: number = action.payload.total;
      state.fields = fields;
      state.total = total;
    },
    addField: (state: IFieldState, action: PayloadAction<IFieldReadDto>) => {
      const field: IFieldReadDto = action.payload;
      state.fields.unshift(field);
    },
    updateField: (state: IFieldState, action: PayloadAction<IFieldReadDto>) => {
      const field: IFieldReadDto = action.payload;
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
      action: PayloadAction<IPaginationResponse<IFieldReadDto>>
    ) => {
      state.searchedFields = action.payload;
    },
  },
});

const fieldReducer = fieldSlice.reducer;

export default fieldReducer;
