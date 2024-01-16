import { AxiosResponse } from "axios";
import React from "react";
import IFile from "../../globalTypes/IFile";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IPost, postSlice } from "../../store/slices/postSlice";
import uploadFiles from "../../utils/uploadFiles";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IPostUpdateCommand, IUserReadDto } from "roottypes";

const useUpdatePost = () => {
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updatePost = (
    command: IPostUpdateCommand,
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
