import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ICartReadDto,
  ICartUpdateCommand,
  IEntityReadDto,
  IUserReadDto,
} from "roottypes";

import { RootState } from "../store";

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
  extraReducers: (builder) => {
    builder.addCase(
      updateCartThunk.fulfilled,
      (state: ICartState, action: PayloadAction<ICartReadDto | undefined>) => {
        state.cart = action.payload;
      }
    );
  },
});

export const updateCartThunk = createAsyncThunk<
  ICartState["cart"],
  {
    entity: IEntityReadDto;
    quantity: number;
    sided: boolean;
    updateApiCart: (command: ICartUpdateCommand) => Promise<void>;
  }
>("cart/updateCart", (params, thunkApi) => {
  const state: RootState = thunkApi.getState() as RootState;

  const newStateCart: typeof state.cart.cart = {
    _id: state.cart.cart?._id || "",
    products:
      state.cart.cart?.products.map((p) => ({
        product: { ...(p.product as IEntityReadDto) },
        quantity: p.quantity,
        sided: p.sided,
      })) || [],
    user: {
      ...((state.cart.cart?.user as IUserReadDto | undefined) ||
        state.user.user),
    },
  };

  const stateProductInfo = newStateCart.products.find(
    (productInfo) =>
      (productInfo.product as IEntityReadDto)._id.toString() ===
      params.entity._id.toString()
  );

  // If the cart already contains the product:
  if (stateProductInfo) {
    // If the new quantity is 0, then remove the product from the cart
    if (params.quantity === 0) {
      (newStateCart as ICartReadDto).products = newStateCart.products.filter(
        (productInfo) =>
          (productInfo.product as IEntityReadDto)._id.toString() !==
          params.entity._id.toString()
      );
      return;
    }
    stateProductInfo.quantity = params.quantity;
  } else {
    // Add the product to the cart
    newStateCart.products.push({
      product: params.entity,
      quantity: params.quantity,
      sided: params.sided,
    });
  }

  // Now update the cart in the backend
  const command: ICartUpdateCommand = {
    products: newStateCart.products.map((p) => ({
      productId: (p.product as IEntityReadDto)._id.toString(),
      quantity: p.quantity,
      sided: p.sided,
    })),
    userId: state.user.user._id.toString(),
  };
  params.updateApiCart(command);

  return newStateCart;
});

const cartReducer = cartSlice.reducer;

export default cartReducer;
