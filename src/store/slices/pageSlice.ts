import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPost } from "./postSlice";

export const PAGE_SLICE_NAME = "page";

export interface IPage {
  _id: string;
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
    updatePage: (state: IPageState, action: PayloadAction<IPage>) => {
      state.pages = state.pages.map((page) => {
        if (page._id === action.payload._id) {
          return action.payload;
        }
        return page;
      });
    },
  },
});

export default pageSlice.reducer;
