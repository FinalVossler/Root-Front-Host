import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

import ErrorResponseDto from "../globalTypes/ErrorResponseDto";
import { useAppDispatch } from "../store/hooks";
import { userSlice } from "../store/slices/userSlice";

const useAxios = () => {
  const dispatch = useAppDispatch();

  const instance = React.useMemo(() => {
    const result = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
    });

    result.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: ErrorResponseDto) => {
        const message: string = error.response.data.error.message;

        // If unauthorized, then we logout the user
        if (message == "Unauthorized") {
          dispatch(userSlice.actions.logout());
          toast.error("Offline");
        } else {
          toast.error(message);
        }

        throw new Error(error.response.data.error.message);
      }
    );

    return result;
  }, []);

  return instance;
};

export default useAxios;
