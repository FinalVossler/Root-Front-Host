import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { userSlice } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IUserCreateCommand, IUserReadDto } from "roottypes";

const useCreateUser = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createUser = (command: IUserCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IUserReadDto>>({
          url: "/users",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const user: IUserReadDto = res.data.data;
          dispatch(userSlice.actions.addUser(user));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createUser, loading };
};

export default useCreateUser;
