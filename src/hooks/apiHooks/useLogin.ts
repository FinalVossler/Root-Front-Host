import React from "react";
import { AxiosResponse } from "axios";

import { IUser, userSlice } from "../../store/slices/userSlice";
import useAxios from "../useAxios";
import { useAppDispatch } from "../../store/hooks";
import { toast } from "react-toastify";

export type UserLoginCommand = {
  email: IUser["email"];
  password: string;
};

const useLogin = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAxios();
  const dispatch = useAppDispatch();

  const login = (command: UserLoginCommand) =>
    new Promise((resolve, reject) => {
      axios
        .request<
          AxiosResponse<{ expiresIn: string; token: string; user: IUser }>
        >({
          url: process.env.REACT_APP_BACKEND_URL + "/users/login",
          method: "POST",
          data: command,
        })
        .then((res) => {
          dispatch(userSlice.actions.setUserAndTokenInformation(res.data.data));
          toast.success("Welcome back :)");
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { login, loading };
};

export default useLogin;
