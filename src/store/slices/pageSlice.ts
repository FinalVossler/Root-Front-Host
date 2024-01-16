import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPageReadDto } from "roottypes";

export const PAGE_SLICE_NAME = "page";

interface IPageState {
  pages: IPageReadDto[];
}

const initialState: IPageState = {
  pages: [],
};

export const pageSlice = createSlice({
  name: PAGE_SLICE_NAME,
  initialState,
  reducers: {
    setPages: (state: IPageState, action: PayloadAction<IPageReadDto[]>) => {
      state.pages = action.payload;
    },
    addPage: (state: IPageState, action: PayloadAction<IPageReadDto>) => {
      state.pages.push(action.payload);
    },
    updatePage: (state: IPageState, action: PayloadAction<IPageReadDto>) => {
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
