import { AxiosResponse } from "axios";
import React from "react";
import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch } from "../../store/hooks";
import { IPost, postSlice, PostVisibility } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type PostsGetCommand = {
  userId: string;
  visibilities: PostVisibility[];
  paginationCommand: PaginationCommand;
};

const useGetPosts = () => {
  const [loading, setLoading] = React.useState<boolean>();

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getPosts = (command: PostsGetCommand, user: IUser) =>
    new Promise((resolve, reject) => {
      axios
        .request<AxiosResponse<PaginationResponse<IPost>>>({
          method: "POST",
          url: "/posts/getUserPosts",
          data: command,
        })
        .then((res) => {
          dispatch(
            postSlice.actions.refreshUserPosts({
              posts: res.data.data.data,
              user: user,
              total: res.data.data.total,
            })
          );

          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getPosts, loading };
};

export default useGetPosts;
