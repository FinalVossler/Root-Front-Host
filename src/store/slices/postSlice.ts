import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IFile from "../../globalTypes/IFile";
import compareWithCreatedAt from "../../utils/compare";
import { IUser } from "./userSlice";

export interface IPost {
  title?: string;
  poster: string;
  content?: string;
  files: IFile[];

  createdAt: string;
  updatedAt: string;
}

type UserPosts = {
  user: IUser;
  posts: IPost[];
};
type PostInitialState = {
  userPosts: UserPosts[];
};

const initialState: PostInitialState = {
  userPosts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createNewUserPosts: (
      state: PostInitialState,
      action: PayloadAction<UserPosts>
    ) => {
      const newUserPost: UserPosts = action.payload;
      state.userPosts.filter((el) => el.user._id !== newUserPost.user._id);

      state.userPosts.push(newUserPost);
    },
    addUserPost: (
      state: PostInitialState,
      action: PayloadAction<{ post: IPost; user: IUser }>
    ) => {
      const { post, user } = action.payload;

      const userPost: UserPosts | undefined = state.userPosts.find(
        (el) => el.user._id === user._id
      );
      if (userPost) {
        userPost.posts.push(post);
        userPost.posts.sort(compareWithCreatedAt);
      } else {
        state.userPosts.push({
          user,
          posts: [post],
        });
      }
    },
  },
});

export default postSlice.reducer;
