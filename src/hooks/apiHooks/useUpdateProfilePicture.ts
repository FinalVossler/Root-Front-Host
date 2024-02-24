import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { userSlice } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IFileReadDto, IUserReadDto } from "roottypes";

const useUpdateProfilePicture = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateProfilePicture = (newProfilePicture: IFileReadDto | undefined) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IUserReadDto>>({
          method: "PUT",
          url: "/users/updateProfilePicture",
          data: newProfilePicture,
        })
        .then((res) => {
          const newUser: IUserReadDto = res.data.data;
          dispatch(userSlice.actions.setUser(newUser));
          resolve(null);
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((e) => reject(e));
    });

  return { updateProfilePicture, loading };
};

export default useUpdateProfilePicture;
