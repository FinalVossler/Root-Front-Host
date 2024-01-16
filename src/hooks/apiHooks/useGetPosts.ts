import { AxiosResponse } from "axios";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { IPost, postSlice } from "../../store/slices/postSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IPaginationResponse, IPostsGetCommand, IUserReadDto } from "roottypes";

const useGetPosts = () => {
  const [loading, setLoading] = React.useState<boolean>();

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getPosts = (command: IPostsGetCommand, user: IUserReadDto) =>
    new Promise((resolve, reject) => {
      axios
        .request<AxiosResponse<IPaginationResponse<IPost>>>({
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
