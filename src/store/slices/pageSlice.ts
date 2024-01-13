import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ITranslatedText from "../../globalTypes/ITranslatedText";

import { IPost } from "./postSlice";

export const PAGE_SLICE_NAME = "page";

export interface IPage {
  _id: string;
  title: ITranslatedText[];
  slug: string;
  posts: IPost[];
  showInHeader?: boolean;
  showInSideMenu?: boolean;
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
    deletePages: (state: IPageState, action: PayloadAction<string[]>) => {
      state.pages = state.pages.filter(
        (page) =>
          !action.payload.find((pageId) => pageId === page._id.toString())
      );
    },
  },
});

export default pageSlice.reducer;
