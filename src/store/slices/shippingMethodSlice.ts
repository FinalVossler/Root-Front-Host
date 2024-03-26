import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { IShippingMethodReadDto, IPaginationResponse } from "roottypes";

export interface IShippingMethodState {
  shippingMethods: IShippingMethodReadDto[];
  total: number;
  searchedShippingMethods: IPaginationResponse<IShippingMethodReadDto>;
}

const initialState: IShippingMethodState = {
  shippingMethods: [],
  total: 0,
  searchedShippingMethods: {
    data: [],
    total: 0,
  },
};

export const shippingMethodSlice = createSlice({
  initialState,
  name: "shippingMethod",
  reducers: {
    setShippingMethods: (
      state: IShippingMethodState,
      action: PayloadAction<{
        shippingMethods: IShippingMethodReadDto[];
        total: number;
      }>
    ) => {
      const shippingMethods: IShippingMethodReadDto[] =
        action.payload.shippingMethods;
      const total: number = action.payload.total;
      state.shippingMethods = shippingMethods;
      state.total = total;
    },
    addShippingMethod: (
      state: IShippingMethodState,
      action: PayloadAction<IShippingMethodReadDto>
    ) => {
      const shippingMethod: IShippingMethodReadDto = action.payload;
      state.shippingMethods.unshift(shippingMethod);
    },
    updateShippingMethod: (
      state: IShippingMethodState,
      action: PayloadAction<IShippingMethodReadDto>
    ) => {
      const shippingMethod: IShippingMethodReadDto = action.payload;
      state.shippingMethods = state.shippingMethods.map((f) =>
        f._id === shippingMethod._id ? shippingMethod : f
      );
      state.searchedShippingMethods.data =
        state.searchedShippingMethods.data.map((f) =>
          f._id === shippingMethod._id ? shippingMethod : f
        );
    },
    deleteShippingMethods: (
      state: IShippingMethodState,
      action: PayloadAction<string[]>
    ) => {
      const shippingMethodsIds: string[] = action.payload;
      state.shippingMethods = state.shippingMethods.filter(
        (f) => shippingMethodsIds.indexOf(f._id) === -1
      );
      state.searchedShippingMethods.data =
        state.searchedShippingMethods.data.filter(
          (u) => shippingMethodsIds.indexOf(u._id) === -1
        );
    },
    setSearchedShippingMethods: (
      state: IShippingMethodState,
      action: PayloadAction<IPaginationResponse<IShippingMethodReadDto>>
    ) => {
      state.searchedShippingMethods = action.payload;
    },
  },
});

const shippingMethodReducer = shippingMethodSlice.reducer;

export default shippingMethodReducer;
