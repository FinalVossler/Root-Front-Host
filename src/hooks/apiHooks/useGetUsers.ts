import { AxiosResponse } from "axios";
import React from "react";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch } from "../../store/hooks";
import PaginationCommand from "../../globalTypes/PaginationCommand";
import { IUser, userSlice } from "../../store/slices/userSlice";

import useAuthorizedAxios from "../useAuthorizedAxios";

export type UsersGetCommand = {
  paginationCommand: PaginationCommand;
  roleId?: string;
};

const useGetUsers = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getUsers = (command: UsersGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<PaginationResponse<IUser>>>({
          method: "POST",
          url: "/users/getUsers",
          data: command,
        })
        .then((res) => {
          dispatch(
            userSlice.actions.setUsers({
              users: res.data.data.data,
              total: res.data.data.total,
            })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getUsers: getUsers, loading };
};

export default useGetUsers;
