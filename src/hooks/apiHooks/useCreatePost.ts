import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IPost, postSlice } from "../../store/slices/postSlice";
import uploadFiles from "../../utils/uploadFiles";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IFileReadDto, IPostCreateCommand, IUserReadDto } from "roottypes";

const useCreatePost = () => {
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createPost = (
    command: IPostCreateCommand,
    newFiles: File[],
    existingFiles: IFileReadDto[]
  ) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      let filesToSend: IFileReadDto[] = await uploadFiles(newFiles);
      filesToSend = filesToSend.concat(existingFiles);

      command.files = filesToSend;

      axios
        .request<AxiosResponse<IPost>>({
          url: "/posts",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const post: IPost = res.data.data;
          dispatch(postSlice.actions.addUserPost({ post, user }));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createPost, loading };
};

export default useCreatePost;
