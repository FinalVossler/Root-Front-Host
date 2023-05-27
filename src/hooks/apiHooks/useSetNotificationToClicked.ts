import { AxiosResponse } from "axios";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { notificationSlice } from "../../store/slices/notificationSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useSetNotificationToClicked = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const setNotificationToClicked = ({
    notificationId,
  }: {
    notificationId: string;
  }) =>
    new Promise<AxiosResponse<void>>((resolve, reject) => {
      setLoading(true);

      axios
        .request({
          method: "POST",
          url: "/notifications/setNotificationToClicked",
          data: {
            notificationId,
          },
        })
        .then((_) => {
          dispatch(
            notificationSlice.actions.setNotificationToClicked({
              notificationId,
            })
          );
        })
        .finally(() => {
          setLoading(false);
        });
    });

  return { setNotificationToClicked, loading };
};

export default useSetNotificationToClicked;
