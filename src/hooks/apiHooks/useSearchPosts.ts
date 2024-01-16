import React from "react";
import { AxiosResponse } from "axios";
import uuid from "react-uuid";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import { IPost, postSlice } from "../../store/slices/postSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { useAppDispatch } from "../../store/hooks";
import {
  IPageReadDto,
  IPaginationCommand,
  IPostsSearchCommand,
  IUserReadDto,
  PostVisibilityEnum,
} from "roottypes";

const useSearchPosts = (
  user: IUserReadDto,
  page: IPageReadDto | undefined,
  parentPost: IPost | undefined
) => {
  const [selectedPosts, setSelectedPosts] = React.useState<IPost[]>([]);

  // The searched posts should be initialized to the pages' posts
  React.useEffect(() => {
    if (page) {
      const newSelectedPosts = [...page.posts] as IPost[];

      setSelectedPosts(
        newSelectedPosts.map((post) => ({ ...post, uuid: uuid() }))
      );
    }
    if (parentPost) {
      const newSelectedPosts = [...parentPost.children] as IPost[];

      setSelectedPosts(
        newSelectedPosts.map((post) => ({ ...post, uuid: uuid() }))
      );
    }
  }, [page]);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const handleSearchPostsPromise = (
    title: string,
    paginationCommand: IPaginationCommand
  ) =>
    new Promise<PaginationResponse<IPost>>((resolve, _) => {
      const command: IPostsSearchCommand = {
        paginationCommand: paginationCommand,
        posterId: user._id,
        title,
        visibilities: Object.values(PostVisibilityEnum),
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
