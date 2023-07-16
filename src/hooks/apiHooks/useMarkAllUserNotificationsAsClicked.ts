import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { notificationSlice } from "../../store/slices/notificationSlice";
import { IUser } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useMarkAllUserNotificationsAsClicked = () => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const markAllUserNotificationAsClicked = () =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<void>>({
          url: "/notifications/markAlluserNotificationsAsClicked",
          method: "POST",
        })
        .then((res) => {
          dispatch(
            notificationSlice.actions.markAllUserNotificationAsClicked(user._id)
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { markAllUserNotificationAsClicked, loading };
};

export default useMarkAllUserNotificationsAsClicked;
