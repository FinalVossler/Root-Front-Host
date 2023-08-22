import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { IUser, SuperRole, userSlice } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type UserCreateCommand = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId?: string;
  superRole: SuperRole;
};

const useCreateUser = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createUser = (command: UserCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IUser>>({
          url: "/users",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const user: IUser = res.data.data;
          dispatch(userSlice.actions.addUser(user));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createUser, loading };
};

export default useCreateUser;
