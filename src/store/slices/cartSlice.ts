import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICartReadDto, IEntityReadDto } from "roottypes";

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
    setCartProductQuantity: (
      state: ICartState,
      action: PayloadAction<{ entity: IEntityReadDto; quantity: number }>
    ) => {
      if (!state.cart) {
        return;
      }

      const stateProductInfo = state.cart?.products.find(
        (productInfo) =>
          (productInfo.product as IEntityReadDto)._id.toString() ===
          action.payload.entity._id.toString()
      );

      // If the cart already contains the product:
      if (stateProductInfo) {
        // If the new quantity is 0, then remove the product from the cart
        if (action.payload.quantity === 0) {
          (state.cart as ICartReadDto).products = state.cart?.products.filter(
            (productInfo) =>
              (productInfo.product as IEntityReadDto)._id.toString() !==
              action.payload.entity._id.toString()
          );
          return;
        }
        stateProductInfo.quantity = action.payload.quantity;
      } else {
        // Add the product to the cart
        state.cart?.products.push({
          product: action.payload.entity,
          quantity: action.payload.quantity,
        });
      }
    },
  },
});

export default cartSlice.reducer;
