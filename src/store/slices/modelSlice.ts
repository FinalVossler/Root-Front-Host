import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import { IModelFieldReadDto, IModelReadDto } from "roottypes";

export interface IModelField extends IModelFieldReadDto {
  // used for frontend sorting only
  uuid?: string;
}

//#endregion model fields

export interface IModelStoreState {
  models: IModelReadDto[];
  total: number;
  searchedModels: PaginationResponse<IModelReadDto>;
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
      action: PayloadAction<{ models: IModelReadDto[]; total: number }>
    ) => {
      const models: IModelReadDto[] = action.payload.models;
      const total: number = action.payload.total;
      state.models = models;
      state.total = total;
    },
    addModel: (
      state: IModelStoreState,
      action: PayloadAction<IModelReadDto>
    ) => {
      const model: IModelReadDto = action.payload;
      state.models.unshift(model);
    },
    updateModel: (
      state: IModelStoreState,
      action: PayloadAction<IModelReadDto>
    ) => {
      const model: IModelReadDto = action.payload;
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
      action: PayloadAction<PaginationResponse<IModelReadDto>>
    ) => {
      state.searchedModels = action.payload;
    },
  },
});

export default modelSlice.reducer;
