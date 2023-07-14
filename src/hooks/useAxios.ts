import axios from "axios";
import { toast } from "react-toastify";

import ErrorResponseDto from "../globalTypes/ErrorResponseDto";
import { useAppDispatch } from "../store/hooks";
import { userSlice } from "../store/slices/userSlice";

const useAxios = () => {
  const dispatch = useAppDispatch();

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: ErrorResponseDto) => {
      const message: string = error.response.data.error.message;
      console.log('huhu', error)

      // If unauthorized, then we logout the user
      if (message == "Unauthorized") {
        dispatch(userSlice.actions.logout());
        toast.error("Offline");
      } else {
        console.log('huhu')
        toast.error(message);
      }

      throw new Error(error.response.data.error.message);
    }
  );

  return instance;
};

export default useAxios;
