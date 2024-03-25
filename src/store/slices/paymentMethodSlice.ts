import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { IPaymentMethodReadDto, IPaginationResponse } from "roottypes";

export interface IPaymentMethodState {
  paymentMethods: IPaymentMethodReadDto[];
  total: number;
  searchedPaymentMethods: IPaginationResponse<IPaymentMethodReadDto>;
}

const initialState: IPaymentMethodState = {
  paymentMethods: [],
  total: 0,
  searchedPaymentMethods: {
    data: [],
    total: 0,
  },
};

export const paymentMethodSlice = createSlice({
  initialState,
  name: "paymentMethod",
  reducers: {
    setPaymentMethods: (
      state: IPaymentMethodState,
      action: PayloadAction<{
        paymentMethods: IPaymentMethodReadDto[];
        total: number;
      }>
    ) => {
      const paymentMethods: IPaymentMethodReadDto[] =
        action.payload.paymentMethods;
      const total: number = action.payload.total;
      state.paymentMethods = paymentMethods;
      state.total = total;
    },
    addPaymentMethod: (
      state: IPaymentMethodState,
      action: PayloadAction<IPaymentMethodReadDto>
    ) => {
      const paymentMethod: IPaymentMethodReadDto = action.payload;
      state.paymentMethods.unshift(paymentMethod);
    },
    updatePaymentMethod: (
      state: IPaymentMethodState,
      action: PayloadAction<IPaymentMethodReadDto>
    ) => {
      const paymentMethod: IPaymentMethodReadDto = action.payload;
      state.paymentMethods = state.paymentMethods.map((f) =>
        f._id === paymentMethod._id ? paymentMethod : f
      );
      state.searchedPaymentMethods.data = state.searchedPaymentMethods.data.map(
        (f) => (f._id === paymentMethod._id ? paymentMethod : f)
      );
    },
    deletePaymentMethods: (
      state: IPaymentMethodState,
      action: PayloadAction<string[]>
    ) => {
      const paymentMethodsIds: string[] = action.payload;
      state.paymentMethods = state.paymentMethods.filter(
        (f) => paymentMethodsIds.indexOf(f._id) === -1
      );
      state.searchedPaymentMethods.data =
        state.searchedPaymentMethods.data.filter(
          (u) => paymentMethodsIds.indexOf(u._id) === -1
        );
    },
    setSearchedPaymentMethods: (
      state: IPaymentMethodState,
      action: PayloadAction<IPaginationResponse<IPaymentMethodReadDto>>
    ) => {
      state.searchedPaymentMethods = action.payload;
    },
  },
});

const paymentMethodReducer = paymentMethodSlice.reducer;

export default paymentMethodReducer;
