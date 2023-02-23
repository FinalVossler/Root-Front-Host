import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import { IPost } from "./postSlice";

export const PAGE_SLICE_NAME = "page";

export interface IPage {
  title: string;
  slug: string;
  posts: IPost[];
}

interface IPageState {
  pages: IPage[];
}

const initialState: IPageState = {
  pages: [],
};

export const pageSlice = createSlice({
  name: PAGE_SLICE_NAME,
  initialState,
  reducers: {
    setPages: (state: IPageState, action: PayloadAction<IPage[]>) => {
      state.pages = action.payload;
    },
    addPage: (state: IPageState, action: PayloadAction<IPage>) => {
      state.pages.push(action.payload);
    },
  },
});

export default pageSlice.reducer;
