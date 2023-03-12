import { AxiosResponse } from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";

import { IUser, userSlice } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type UserUpdateCommand = {
  _id: string;
  firstName: IUser["firstName"];
  lastName: IUser["lastName"];
};

const useUpdateUser = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateUser = (command: UserUpdateCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IUser>>({
          url: process.env.REACT_APP_BACKEND_URL + "/users",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          toast.success("Profile information updated");
          dispatch(userSlice.actions.setUser(res.data.data));
          resolve(null);
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((e) => reject(e));
    });

  return { updateUser, loading };
};

export default useUpdateUser;
