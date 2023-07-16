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
  states?: IModelState[];
  subStates?: IModelState[];

  createdAt: string;
  updatedAt: string;
}

//#endregion model fields
export interface IModelField {
  field: IField;
  required: boolean;
  conditions?: IModelFieldCondition[];
  states?: IModelState[];
  mainField?: boolean;

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
  StateConditionsMet = "StateConditionsMet",
  IfYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField = "IfYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField",
}

export interface IModelFieldCondition {
  field?: IField;
  conditionType: ModelFieldConditionTypeEnum;
  value?: number | string;
  modelState?: IModelState;
}
//#endregion model fields

//#region model states
export enum ModelStateType {
  ParentState = "ParentState",
  SubState = "SubState",
}

export interface IModelState {
  _id: string;
  name: ITranslatedText[];
  stateType: ModelStateType;
  // Means that it will block entities from showing in other states
  exlusive?: boolean;
}
//#endregion model states

export interface IModelStoreState {
  models: IModel[];
  total: number;
  searchedModels: PaginationResponse<IModel>;
}

const initialState: IModelStoreState = {
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
      state: IModelStoreState,
      action: PayloadAction<{ models: IModel[]; total: number }>
    ) => {
      const models: IModel[] = action.payload.models;
      const total: number = action.payload.total;
      state.models = models;
      state.total = total;
    },
    addModel: (state: IModelStoreState, action: PayloadAction<IModel>) => {
      const model: IModel = action.payload;
      state.models.unshift(model);
    },
    updateModel: (state: IModelStoreState, action: PayloadAction<IModel>) => {
      const model: IModel = action.payload;
      state.models = state.models.map((m) => (m._id === model._id ? model : m));
      state.searchedModels.data = state.searchedModels.data.map((m) =>
        m._id === model._id ? model : m
      );
    },
    deleteModels: (
      state: IModelStoreState,
      action: PayloadAction<string[]>
    ) => {
      const modelsIds: string[] = action.payload;
      state.models = state.models.filter(
        (f) => modelsIds.indexOf(f._id) === -1
      );

      state.searchedModels.data = state.searchedModels.data.filter(
        (u) => modelsIds.indexOf(u._id) === -1
      );
    },
    setSearchedModels: (
      state: IModelStoreState,
      action: PayloadAction<PaginationResponse<IModel>>
    ) => {
      state.searchedModels = action.payload;
    },
  },
});

export default modelSlice.reducer;
