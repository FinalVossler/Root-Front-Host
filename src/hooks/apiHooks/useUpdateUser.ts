import { AxiosResponse } from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { IUser, SuperRole, userSlice } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import useGetTranslatedText from "../useGetTranslatedText";

export type UserUpdateCommand = {
  _id: string;
  firstName: IUser["firstName"];
  lastName: IUser["lastName"];
  email: IUser["email"];
  roleId?: string;
  superRole?: SuperRole;
  hasMessagingEmailsActivated?: boolean;
};

const useUpdateUser = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.profile
  );
  const currentUser: IUser = useAppSelector((state) => state.user.user);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();

  const updateUser = (command: UserUpdateCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IUser>>({
          url: process.env.REACT_APP_BACKEND_URL + "/users",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          toast.success(getTranslatedText(staticText?.userInformationUpdated));
          if (currentUser._id === command._id) {
            dispatch(userSlice.actions.setUser(res.data.data));
          }
          dispatch(userSlice.actions.updateUser(res.data.data));
          resolve(null);
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((e) => reject(e));
    });

  return { updateUser, loading };
};

export default useUpdateUser;
