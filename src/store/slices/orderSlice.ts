import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { IEntityReadDto, IOrderReadDto } from "roottypes";

interface IUserOrderState {
  orders: IOrderReadDto[];
  total: number;
  userId: string;
}

interface IOrderState {
  userOrders: IUserOrderState[];
  userSales: IUserOrderState[];
  orderAssociatedEntities: { [orderId: string]: IEntityReadDto[] };
}

const initialState: IOrderState = {
  userOrders: [],
  userSales: [],
  orderAssociatedEntities: {},
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
    setUserSales: (
      state: IOrderState,
      action: PayloadAction<{
        orders: IOrderReadDto[];
        userId: string;
        total: number;
      }>
    ) => {
      if (
        state.userSales.some(
          (userOrder) => userOrder.userId === action.payload.userId
        )
      ) {
        const userSale = state.userSales.find(
          (userOrder) => userOrder.userId === action.payload.userId
        ) as IUserOrderState;
        userSale.orders = action.payload.orders;
        userSale.total = action.payload.total;
      } else {
        state.userSales.push({
          orders: action.payload.orders,
          total: action.payload.total,
          userId: action.payload.userId,
        });
      }
    },
    setOrderAssociatedEntities: (
      state: IOrderState,
      action: PayloadAction<{
        orderId: string;
        associatedEntities: IEntityReadDto[];
      }>
    ) => {
      state.orderAssociatedEntities[action.payload.orderId] =
        action.payload.associatedEntities;
    },
    addOrderAssociatedEntity: (
      state: IOrderState,
      action: PayloadAction<{ associatedEntity: IEntityReadDto }>
    ) => {
      const orderId =
        action.payload.associatedEntity.orderAssociationConfig?.orderId;
      if (!orderId) {
        return;
      }

      state.orderAssociatedEntities[orderId] = [
        ...(state.orderAssociatedEntities[orderId] || []),
        action.payload.associatedEntity,
      ];
    },
  },
});

const orderReducer = orderSlice.reducer;

export default orderReducer;
