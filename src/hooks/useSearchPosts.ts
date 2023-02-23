import React from "react";
import { AxiosResponse } from "axios";

import PostsSearchCommand from "../globalTypes/commands/PostsSearchCommand";
import PaginationCommand from "../globalTypes/PaginationCommand";
import PaginationResponse from "../globalTypes/PaginationResponse";
import { IPost, PostVisibility } from "../store/slices/postSlice";
import { IUser } from "../store/slices/userSlice";
import useAuthorizedAxios from "./useAuthorizedAxios";

const useSearchPosts = (user: IUser) => {
  const [selectedPosts, setSelectedPosts] = React.useState<IPost[]>([]);

  const axios = useAuthorizedAxios();

  const handleSearchPostsPromise = (
    title: string,
    paginationCommand: PaginationCommand
  ) =>
    new Promise<PaginationResponse<IPost>>((resolve, reject) => {
      const command: PostsSearchCommand = {
        paginationCommand: paginationCommand,
        posterId: user._id,
        title,
        visibilities: Object.values(PostVisibility),
      };

      axios
        .request<AxiosResponse<PaginationResponse<IPost>>>({
          url: "/posts/searchPosts",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
        });
    });

  const handleSelectPost = (post: IPost) => {
    setSelectedPosts([...selectedPosts, post]);
  };

  const handleDeletePost = (index: number) => {
    let newSelectedPosts = [...selectedPosts];
    newSelectedPosts.splice(index, 1);
    setSelectedPosts(newSelectedPosts);
  };

  return {
    handleSelectPost,
    handleDeletePost,
    selectedPosts,
    handleSearchPostsPromise,
  };
};

export default useSearchPosts;
