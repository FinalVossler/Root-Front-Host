import { AxiosResponse } from "axios";
import React from "react";
import IFile from "../../globalTypes/IFile";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IPost, postSlice } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";
import uploadFiles from "../../utils/uploadFiles";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type PostUpdateCommand = {
  _id: string;
  title?: string;
  subTitle?: string;
  content?: string;
  files: IPost["files"];
  visibility: IPost["visibility"];
  design: IPost["design"];
  children: string[];
  language: string;
  code?: string;
};

const useUpdatePost = () => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updatePost = (
    command: PostUpdateCommand,
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
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const post: IPost = res.data.data;
          dispatch(postSlice.actions.updateUserPost({ post, user }));

          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updatePost, loading };
};

export default useUpdatePost;
