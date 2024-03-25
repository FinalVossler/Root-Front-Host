import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAddressReadDto } from "roottypes";

export interface IAddressState {
  currentUserAddresses: IAddressReadDto[];
}

const initialState: IAddressState = {
  currentUserAddresses: [],
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setCurrentUserAddresses: (
      state: IAddressState,
      action: PayloadAction<IAddressReadDto[]>
    ) => {
      state.currentUserAddresses = action.payload;
    },
    addAddress: (
      state: IAddressState,
      action: PayloadAction<IAddressReadDto>
    ) => {
      state.currentUserAddresses.push(action.payload);
    },
    updateAddress: (
      state: IAddressState,
      action: PayloadAction<IAddressReadDto>
    ) => {
      state.currentUserAddresses = state.currentUserAddresses.map((a) => ({
        ...(a._id.toString() === action.payload._id.toString()
          ? action.payload
          : a),
      }));
    },
    setDefaultAddress: (
      state: IAddressState,
      action: PayloadAction<{ defaultAddressId: string }>
    ) => {
      state.currentUserAddresses = state.currentUserAddresses.map((a) => ({
        ...a,
        isDefault: Boolean(
          a._id.toString() === action.payload.defaultAddressId
        ),
      }));
    },
    deleteAddresses: (
      state: IAddressState,
      action: PayloadAction<string[]>
    ) => {
      const addressesIds: string[] = action.payload;
      state.currentUserAddresses = state.currentUserAddresses.filter(
        (f) => addressesIds.indexOf(f._id) === -1
      );
    },
  },
});

const addressReducer = addressSlice.reducer;

export default addressReducer;
