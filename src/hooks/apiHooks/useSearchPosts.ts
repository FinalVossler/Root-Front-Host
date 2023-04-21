import React from "react";
import { AxiosResponse } from "axios";
import uuid from "react-uuid";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { IPost, postSlice, PostVisibility } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IPage } from "../../store/slices/pageSlice";
import { useAppDispatch } from "../../store/hooks";

export type PostsSearchCommand = {
  title: string;
  visibilities: IPost["visibility"][];
  posterId: IPost["posterId"];
  paginationCommand: PaginationCommand;
};

const useSearchPosts = (
  user: IUser,
  page: IPage | undefined,
  parentPost: IPost | undefined
) => {
  const [selectedPosts, setSelectedPosts] = React.useState<IPost[]>([]);

  // The searched posts should be initialized to the pages' posts
  React.useEffect(() => {
    if (page) {
      const newSelectedPosts = [...page.posts];

      setSelectedPosts(
        newSelectedPosts.map((post) => ({ ...post, uuid: uuid() }))
      );
    }
    if (parentPost) {
      const newSelectedPosts = [...parentPost.children];

      setSelectedPosts(
        newSelectedPosts.map((post) => ({ ...post, uuid: uuid() }))
      );
    }
  }, [page]);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

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
          url: "/posts/search",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
          dispatch(postSlice.actions.setSearchedPosts(res.data.data));
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
