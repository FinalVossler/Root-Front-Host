import { AxiosResponse } from "axios";
import React from "react";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch } from "../../store/hooks";
import { userSlice } from "../../store/slices/userSlice";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { IUserReadDto, IUsersGetCommand } from "roottypes";

const useGetUsers = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getUsers = (command: IUsersGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<PaginationResponse<IUserReadDto>>>({
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
