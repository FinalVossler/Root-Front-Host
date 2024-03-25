import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import compareWithCreatedAt from "../../utils/compareWithCreatedAt";
import { IPaginationResponse, IPostReadDto, IUserReadDto } from "roottypes";

export interface IPost extends IPostReadDto {
  // used for frontend sorting only
  uuid: string;
}

type UserPosts = {
  user: IUserReadDto;
  posts: IPost[];
  total: number;
};

interface IPostState {
  userPosts: UserPosts[];
  searchedPosts: IPaginationResponse<IPost>;
}

const initialState: IPostState = {
  userPosts: [],
  searchedPosts: {
    data: [],
    total: 0,
  },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createNewUserPosts: (
      state: IPostState,
      action: PayloadAction<UserPosts>
    ) => {
      const newUserPost: UserPosts = action.payload;
      state.userPosts.filter((el) => el.user._id !== newUserPost.user._id);

      state.userPosts.push(newUserPost);
    },
    addUserPost: (
      state: IPostState,
      action: PayloadAction<{ post: IPost; user: IUserReadDto }>
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
    updateUserPost: (
      state: IPostState,
      action: PayloadAction<{ post: IPost; user: IUserReadDto }>
    ) => {
      const { post, user } = action.payload;

      const userPosts: UserPosts | undefined = state.userPosts.find(
        (el) => el.user._id === user._id
      );

      state.searchedPosts.data = state.searchedPosts.data.map((p) =>
        p._id === action.payload.post._id ? action.payload.post : p
      );

      if (userPosts) {
        userPosts.posts = userPosts.posts.map((el) => {
          if (el._id !== post._id) return el;
          else return post;
        });
      } else {
        state.userPosts.push({
          user,
          posts: [post],
          total: 1,
        });
      }
    },
    removeUserPost: (
      state: IPostState,
      action: PayloadAction<{ post: IPost; user: IUserReadDto }>
    ) => {
      const { post, user } = action.payload;

      const userPosts: UserPosts | undefined = state.userPosts.find(
        (el) => el.user._id === user._id
      );
      if (userPosts) {
        userPosts.posts = userPosts.posts.filter((el) => el._id !== post._id);
        userPosts.total -= 1;
        userPosts.posts.sort(compareWithCreatedAt(true));
      } else {
        state.userPosts.push({
          user,
          posts: [],
          total: 0,
        });
      }
    },
    refreshUserPosts: (
      state: IPostState,
      action: PayloadAction<{
        posts: IPost[];
        user: IUserReadDto;
        total: number;
      }>
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
    setSearchedPosts: (
      state: IPostState,
      action: PayloadAction<IPaginationResponse<IPost>>
    ) => {
      state.searchedPosts = action.payload;
    },
  },
});

const postReducer = postSlice.reducer;

export default postReducer;
