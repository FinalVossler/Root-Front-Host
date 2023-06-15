import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IEvent } from "../../globalTypes/IEvent";
import ITranslatedText from "../../globalTypes/ITranslatedText";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { IField } from "./fieldSlice";

export interface IModel {
  _id: string;
  name: ITranslatedText[];
  modelFields: IModelField[];
  modelEvents?: IEvent[];
  states?: ITranslatedText[][];
  subStates?: ITranslatedText[][];

  createdAt: string;
  updatedAt: string;
}

//#endregion model fields
export interface IModelField {
  field: IField;
  required: boolean;
  conditions?: IModelFieldCondition[];

  // used for frontend sorting only
  uuid: string;
}

export enum ModelFieldConditionTypeEnum {
  SuperiorTo = "SuperiorTo",
  SuperiorOrEqualTo = "SuperiorOrEqualTo",
  InferiorTo = "InferiorTo",
  InferiorOrEqualTo = "InferiorOrEqualTo",
  Equal = "Equal",
  ValueInferiorOrEqualToCurrentYearPlusValueOfFieldAndSuperiorOrEqualToCurrentYear = "ValueInferiorOrEqualToCurrentYearPlusValueOfFieldAndSuperiorOrEqualToCurrentYear",
}

export interface IModelFieldCondition {
  field?: IField;
  conditionType: ModelFieldConditionTypeEnum;
  value: number | string;
}

//#endregion model fields

export interface IModelState {
  models: IModel[];
  total: number;
  searchedModels: PaginationResponse<IModel>;
}

const initialState: IModelState = {
  models: [],
  total: 0,
  searchedModels: {
    data: [],
    total: 0,
  },
};

export const modelSlice = createSlice({
  initialState,
  name: "model",
  reducers: {
    setModels: (
      state: IModelState,
      action: PayloadAction<{ models: IModel[]; total: number }>
    ) => {
      const models: IModel[] = action.payload.models;
      const total: number = action.payload.total;
      state.models = models;
      state.total = total;
    },
    addModel: (state: IModelState, action: PayloadAction<IModel>) => {
      const model: IModel = action.payload;
      state.models.unshift(model);
    },
    updateModel: (state: IModelState, action: PayloadAction<IModel>) => {
      const model: IModel = action.payload;
      state.models = state.models.map((m) => (m._id === model._id ? model : m));
      state.searchedModels.data = state.searchedModels.data.map((m) =>
        m._id === model._id ? model : m
      );
    },
    deleteModels: (state: IModelState, action: PayloadAction<string[]>) => {
      const modelsIds: string[] = action.payload;
      state.models = state.models.filter(
        (f) => modelsIds.indexOf(f._id) === -1
      );

      state.searchedModels.data = state.searchedModels.data.filter(
        (u) => modelsIds.indexOf(u._id) === -1
      );
    },
    setSearchedModels: (
      state: IModelState,
      action: PayloadAction<PaginationResponse<IModel>>
    ) => {
      state.searchedModels = action.payload;
    },
  },
});

export default modelSlice.reducer;
