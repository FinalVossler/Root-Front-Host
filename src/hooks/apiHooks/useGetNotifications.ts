import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { notificationSlice } from "../../store/slices/notificationSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import {
  INotificationReadDto,
  INotificationsGetCommand,
  IPaginationResponse,
} from "roottypes";

const useGetNotifications = () => {
  const [loading, setLoading] = React.useState<boolean>();

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getNotifications = (command: INotificationsGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<
          AxiosResponse<{
            paginationResponse: IPaginationResponse<INotificationReadDto>;
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
