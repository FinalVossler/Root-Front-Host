import { useAppSelector } from "../store/hooks";
import useAxios from "./useAxios";

const useAuthorizedAxios = () => {
  const token: string = useAppSelector(
    (state) => state.user.tokenInformation.value
  );

  const axios = useAxios();

  axios.defaults.headers["Authorization"] = "Bearer " + token;

  return axios;
};

export default useAuthorizedAxios;
