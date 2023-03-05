import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IFile from "../../globalTypes/IFile";
import ITranslatedText from "../../globalTypes/ITranslatedText";
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
    updateUserPost: (
      state: IPostInitialState,
      action: PayloadAction<{ post: IPost; user: IUser }>
    ) => {
      const { post, user } = action.payload;

      const userPosts: UserPosts | undefined = state.userPosts.find(
        (el) => el.user._id === user._id
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
      state: IPostInitialState,
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
