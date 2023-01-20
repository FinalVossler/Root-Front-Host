import { useAppSelector } from "../store/hooks";
import useAxios from "./useAxios";

const useAuthorizedAxios = () => {
  const token: string | undefined = useAppSelector(
    (state) => state.user.tokenInformation?.value
  );

  const axios = useAxios();

  if (!token) return null;

  axios.defaults.headers["Authorization"] = "Bearer " + token;

  return axios;
};

export default useAuthorizedAxios;
