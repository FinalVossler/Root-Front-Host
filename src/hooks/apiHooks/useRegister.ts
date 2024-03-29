import { AxiosResponse } from "axios";
import React from "react";
import { useAppDispatch } from "../../store/hooks";

import { userSlice } from "../../store/slices/userSlice";
import useAxios from "../useAxios";
import { useNavigate } from "react-router-dom";
import { IUserReadDto, IUserRegisterCommand } from "roottypes";

const useRegister = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAxios();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const register = (command: IUserRegisterCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<
          AxiosResponse<{
            token: string;
            expiresIn: string;
            user: IUserReadDto;
          }>
        >({
          url: process.env.REACT_APP_BACKEND_URL + "/users/register",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const { user, token, expiresIn } = res.data.data;
          dispatch(
            userSlice.actions.setUserAndTokenInformation({
              user,
              token,
              expiresIn,
            })
          );
          navigate("/profile");
          resolve(null);
        })
        .catch((e) => reject(e))
        .finally(() => setLoading(false));
    });

  return { register, loading };
};

export default useRegister;
