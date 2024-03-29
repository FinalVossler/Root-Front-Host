import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { IOrderReadDto } from "roottypes";

interface IUserOrderState {
  orders: IOrderReadDto[];
  total: number;
  userId: string;
}

interface IOrderState {
  userOrders: IUserOrderState[];
}

const initialState: IOrderState = {
  userOrders: [],
};

export const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    setUserOrders: (
      state: IOrderState,
      action: PayloadAction<{
        orders: IOrderReadDto[];
        userId: string;
        total: number;
      }>
    ) => {
      if (
        state.userOrders.some(
          (userOrder) => userOrder.userId === action.payload.userId
        )
      ) {
        const userOrder = state.userOrders.find(
          (userOrder) => userOrder.userId === action.payload.userId
        ) as IUserOrderState;
        userOrder.orders = action.payload.orders;
        userOrder.total = action.payload.total;
      } else {
        state.userOrders.push({
          orders: action.payload.orders,
          total: action.payload.total,
          userId: action.payload.userId,
        });
      }
    },
  },
});

const orderReducer = orderSlice.reducer;

export default orderReducer;
