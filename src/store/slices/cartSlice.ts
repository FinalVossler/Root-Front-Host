import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICartReadDto } from "roottypes";

interface ICartState {
  cart?: ICartReadDto;
}

const initialState: ICartState = {
  cart: undefined,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state: ICartState, action: PayloadAction<ICartReadDto>) => {
      state.cart = action.payload;
    },
  },
});

export default cartSlice.reducer;
