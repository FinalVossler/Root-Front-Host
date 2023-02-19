import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IFile from "../../globalTypes/IFile";
import compareWithCreatedAt from "../../utils/compareWithCreatedAt";
import { IUser } from "./userSlice";

export enum PostVisibility {
  Private = "Private",
  Public = "Public",
  Connections = "Connections",
}

export enum PostDesign {
  Default = "Default",
  Card = "Card",
  TitleAndText = "TitleAndText",
  Banner = "Banner",
}

export interface IPost {
  _id: string;
  title?: string;
  posterId: string;
  content?: string;
  files: IFile[];
  visibility: PostVisibility;
  design: PostDesign;

  createdAt: string;
  updatedAt: string;
}

type UserPosts = {
  user: IUser;
  posts: IPost[];
  total: number;
};

interface IPostInitialState {
  userPosts: UserPosts[];
}

const initialState: IPostInitialState = {
  userPosts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createNewUserPosts: (
      state: IPostInitialState,
      action: PayloadAction<UserPosts>
    ) => {
      const newUserPost: UserPosts = action.payload;
      state.userPosts.filter((el) => el.user._id !== newUserPost.user._id);

      state.userPosts.push(newUserPost);
    },
    addUserPost: (
      state: IPostInitialState,
      action: PayloadAction<{ post: IPost; user: IUser }>
    ) => {
      const { post, user } = action.payload;

      const userPosts: UserPosts | undefined = state.userPosts.find(
        (el) => el.user._id === user._id
      );
      if (userPosts) {
        userPosts.posts.push(post);
        userPosts.total += 1;
        userPosts.posts.sort(compareWithCreatedAt(true));
      } else {
        state.userPosts.push({
          user,
          posts: [post],
          total: 1,
        });
      }
    },
    refreshUserPosts: (
      state: IPostInitialState,
      action: PayloadAction<{ posts: IPost[]; user: IUser; total: number }>
    ) => {
      const { posts, user, total } = action.payload;

      const userPosts: UserPosts | undefined = state.userPosts.find(
        (el) => el.user._id === user._id
      );

      if (userPosts) {
        userPosts.posts = posts;
        userPosts.posts.sort(compareWithCreatedAt(true));
      } else {
        state.userPosts.push({
          user,
          posts: posts,
          total,
        });
      }
    },
  },
});

export default postSlice.reducer;
