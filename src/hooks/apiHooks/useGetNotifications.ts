import { AxiosResponse } from "axios";
import React from "react";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  notificationSlice,
  INotification,
} from "../../store/slices/notificationSlice";
import { IUser } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type NotificationsGetCommand = {
  userId: string;
  paginationCommand: PaginationCommand;
};

const useGetNotifications = () => {
  const [loading, setLoading] = React.useState<boolean>();

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getNotifications = (command: NotificationsGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<
          AxiosResponse<{
            paginationResponse: PaginationResponse<INotification>;
            totalUnclicked;
          }>
        >({
          method: "POST",
          url: "/notifications/getUserNotifications",
          data: command,
        })
        .then((res) => {
          dispatch(
            notificationSlice.actions.setNotifications({
              notifications: res.data.data.paginationResponse.data,
              total: res.data.data.paginationResponse.total,
              totalUnclicked: res.data.data.totalUnclicked,
            })
          );

          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getNotifications, loading };
};

export default useGetNotifications;
