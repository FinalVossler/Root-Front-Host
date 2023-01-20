import React from "react";
import SuccessResponseDto from "../globalTypes/SuccessResponseDto";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { IUser, userSlice } from "../store/slices/userSlice";
import useAxios from "./useAxios";

const useGetAndSetUser = () => {
  const token: string | undefined = useAppSelector(
    (state) => state.user.tokenInformation?.value
  );
  const dispatch = useAppDispatch();
  const axios = useAxios();

  React.useEffect(() => {
    if (!token || token === "") return;

    axios
      .request<SuccessResponseDto<IUser>>({
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
