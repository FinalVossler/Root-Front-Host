import { AxiosResponse } from "axios";
import React from "react";

import IFile from "../../globalTypes/IFile";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IPost, postSlice } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";
import uploadFiles from "../../utils/uploadFiles";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type PostCreateCommand = {
  title?: string;
  subTitle?: string;
  posterId: IPost["posterId"];
  content?: string;
  files: IPost["files"];
  visibility: IPost["visibility"];
  design: IPost["design"];
  children: string[];
  language: string;
};

const useCreatePost = () => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createPost = (
    command: PostCreateCommand,
    newFiles: File[],
    existingFiles: IFile[]
  ) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      let filesToSend: IFile[] = await uploadFiles(newFiles);
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
