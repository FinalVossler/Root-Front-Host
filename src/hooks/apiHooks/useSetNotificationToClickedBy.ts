import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { notificationSlice } from "../../store/slices/notificationSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IUserReadDto } from "roottypes";

const useSetNotificationToClickedBy = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const setNotificationToClickedBy = ({
    notificationId,
    currentUser,
  }: {
    notificationId: string;
    currentUser: IUserReadDto;
  }) =>
    new Promise<AxiosResponse<void>>((resolve, reject) => {
      setLoading(true);

      axios
        .request({
          method: "POST",
          url: "/notifications/setNotificationToClickedBy",
          data: { notificationId },
        })
        .then((_) => {
          dispatch(
            notificationSlice.actions.setNotificationToClickedBy({
              notificationId,
              userId: currentUser._id,
            })
          );
        })
        .finally(() => {
          setLoading(false);
        });
    });

  return { setNotificationToClickedBy, loading };
};

export default useSetNotificationToClickedBy;
