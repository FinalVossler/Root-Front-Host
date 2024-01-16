import { AxiosResponse } from "axios";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { IPageReadDto, pageSlice } from "../../store/slices/pageSlice";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { IPageUpdateCommand } from "roottypes";

const useUpdatePage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updatePage = (command: IPageUpdateCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IPageReadDto>>({
          url: "/pages",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const page: IPageReadDto = res.data.data;
          dispatch(pageSlice.actions.updatePage(page));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updatePage, loading };
};

export default useUpdatePage;
