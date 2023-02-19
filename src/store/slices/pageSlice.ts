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
  orderedPosts: string;
}

interface IPageState {
  pages: IPage[];
}

const initialState: IPageState = {
  pages: [],
};

const pageSlice = createSlice<IPageState, SliceCaseReducers<IPageState>>({
  name: PAGE_SLICE_NAME,
  initialState,
  reducers: {
    setPages: (state: IPageState, action: PayloadAction<IPage[]>) => {
      state.pages = action.payload;
    },
  },
});

export default pageSlice.reducer;
