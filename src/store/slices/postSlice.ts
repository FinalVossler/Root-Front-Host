import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IFile from "../../globalTypes/IFile";
import ITranslatedText from "../../globalTypes/ITranslatedText";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import compareWithCreatedAt from "../../utils/compareWithCreatedAt";
import { IUser } from "./userSlice";

export enum PostVisibility {
  Private = "Private",
  Public = "Public",
  Connections = "Connections",
}

export enum PostDesign {
  Default = "Default",
  Spacing = "Spacing",
  Card = "Card",
  TitleAndText = "TitleAndText",
  Banner = "Banner",
  TitleImageAndText = "TitleImageAndText",
  ChildrenContainer = "ChildrenContainer",
  RotatingCarzd = "RotatingCard",
  AnimatedTitle = "AnimatedTitle",
  UnderlinedTitle = "UnderinedTitle",
  Footer = "Footer",
  ContactForm = "ContactForm",
  Person = "Person",
  Card2 = "Card2",
  Video = "Video",
  ModelForm = "ModelForm",
  ModelList = "ModelList",
}

export interface IPost {
  _id: string;
  title?: ITranslatedText[];
  subTitle?: ITranslatedText[];
  posterId: string;
  content?: ITranslatedText[];
  files: IFile[];
  visibility: PostVisibility;
  design: PostDesign;
  children: IPost[];
  code?: string;

  // used for frontend sorting only
  uuid: string;

  createdAt: string;
  updatedAt: string;
}

type UserPosts = {
  user: IUser;
  posts: IPost[];
  total: number;
};

interface IPostState {
  userPosts: UserPosts[];
  searchedPosts: PaginationResponse<IPost>;
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
    updateUserPost: (
      state: IPostState,
      action: PayloadAction<{ post: IPost; user: IUser }>
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
      action: PayloadAction<{ post: IPost; user: IUser }>
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
    setSearchedPosts: (
      state: IPostState,
      action: PayloadAction<PaginationResponse<IPost>>
    ) => {
      state.searchedPosts = action.payload;
    },
  },
});

export default postSlice.reducer;
