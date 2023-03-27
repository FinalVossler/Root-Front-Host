import { AxiosResponse } from "axios";
import React from "react";
import IFile from "../../globalTypes/IFile";
import { useAppDispatch } from "../../store/hooks";
import { IUser, userSlice } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useUpdateProfilePicture = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateProfilePicture = (newProfilePicture: IFile | undefined) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IUser>>({
          method: "PUT",
          url: "/users/updateProfilePicture",
          data: newProfilePicture,
        })
        .then((res) => {
          const newUser: IUser = res.data.data;
          dispatch(userSlice.actions.setUser(newUser));
          resolve(null);
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((e) => reject(e));
    });

  return { updateProfilePicture, loading };
};

export default useUpdateProfilePicture;
