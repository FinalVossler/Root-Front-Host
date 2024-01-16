import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userSlice } from "../../store/slices/userSlice";
import useAxios from "../useAxios";
import { IUserReadDto } from "roottypes";

const useGetAndSetUser = () => {
  const token: string | undefined = useAppSelector(
    (state) => state.user.tokenInformation?.value
  );
  const dispatch = useAppDispatch();
  const axios = useAxios();

  React.useEffect(() => {
    if (!token || token === "") return;

    axios
      .request<AxiosResponse<IUserReadDto>>({
        url: "/users/me",
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch(userSlice.actions.setUser(res.data.data));
      });
  }, [token]);
};

export default useGetAndSetUser;
