import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import { IMicroFrontendReadDto } from "roottypes";

export interface IMicroFrontendState {
  microFrontends: IMicroFrontendReadDto[];
  total: number;
  searchedMicroFrontends: PaginationResponse<IMicroFrontendReadDto>;
}

const initialState: IMicroFrontendState = {
  microFrontends: [],
  total: 0,
  searchedMicroFrontends: {
    data: [],
    total: 0,
  },
};

export const microFrontendSlice = createSlice({
  initialState,
  name: "microFrontend",
  reducers: {
    setMicroFrontends: (
      state: IMicroFrontendState,
      action: PayloadAction<{
        microFrontends: IMicroFrontendReadDto[];
        total: number;
      }>
    ) => {
      const microFrontends: IMicroFrontendReadDto[] =
        action.payload.microFrontends;
      const total: number = action.payload.total;
      state.microFrontends = microFrontends;
      state.total = total;
    },
    addMicroFrontend: (
      state: IMicroFrontendState,
      action: PayloadAction<IMicroFrontendReadDto>
    ) => {
      const microFrontend: IMicroFrontendReadDto = action.payload;
      state.microFrontends.unshift(microFrontend);
    },
    updateMicroFrontend: (
      state: IMicroFrontendState,
      action: PayloadAction<IMicroFrontendReadDto>
    ) => {
      const microFrontend: IMicroFrontendReadDto = action.payload;
      state.microFrontends = state.microFrontends.map((f) =>
        f._id === microFrontend._id ? microFrontend : f
      );
      state.searchedMicroFrontends.data = state.searchedMicroFrontends.data.map(
        (f) => (f._id === microFrontend._id ? microFrontend : f)
      );
    },
    deleteMicroFrontends: (
      state: IMicroFrontendState,
      action: PayloadAction<string[]>
    ) => {
      const microFrontendsIds: string[] = action.payload;
      state.microFrontends = state.microFrontends.filter(
        (f) => microFrontendsIds.indexOf(f._id) === -1
      );
      state.searchedMicroFrontends.data =
        state.searchedMicroFrontends.data.filter(
          (u) => microFrontendsIds.indexOf(u._id) === -1
        );
    },
    setSearchedMicroFrontends: (
      state: IMicroFrontendState,
      action: PayloadAction<PaginationResponse<IMicroFrontendReadDto>>
    ) => {
      state.searchedMicroFrontends = action.payload;
    },
  },
});

export default microFrontendSlice.reducer;
