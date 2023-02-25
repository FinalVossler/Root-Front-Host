import React from "react";
import { AxiosResponse } from "axios";

import PostsSearchCommand from "../globalTypes/commands/PostsSearchCommand";
import PaginationCommand from "../globalTypes/PaginationCommand";
import PaginationResponse from "../globalTypes/PaginationResponse";
import { IPost, PostVisibility } from "../store/slices/postSlice";
import { IUser } from "../store/slices/userSlice";
import useAuthorizedAxios from "./useAuthorizedAxios";
import { IPage } from "../store/slices/pageSlice";
import uuid from "react-uuid";

const useSearchPosts = (user: IUser, page: IPage | undefined) => {
  const [selectedPosts, setSelectedPosts] = React.useState<IPost[]>([]);

  // The searched posts should be initialized to the pages' posts
  React.useEffect(() => {
    if (page) {
      const newSelectedPosts = [...page.posts];

      setSelectedPosts(
        newSelectedPosts.map((post) => ({ ...post, uuid: uuid() }))
      );
    }
  }, [page]);

  const axios = useAuthorizedAxios();

  const handleSearchPostsPromise = (
    title: string,
    paginationCommand: PaginationCommand
  ) =>
    new Promise<PaginationResponse<IPost>>((resolve, _) => {
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
    setSelectedPosts([{ ...post, uuid: uuid() }, ...selectedPosts]);
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
    setSelectedPosts,
    handleSearchPostsPromise,
  };
};

export default useSearchPosts;
