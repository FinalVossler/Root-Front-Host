import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { IPageReadDto, pageSlice } from "../../store/slices/pageSlice";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { IPageCreateCommand } from "roottypes";

const useCreatePage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createPage = (command: IPageCreateCommand) =>
    new Promise((resolve, reject) => {
      axios
        .request<AxiosResponse<IPageReadDto>>({
          url: "/pages",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const page: IPageReadDto = res.data.data;
          dispatch(pageSlice.actions.addPage(page));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createPage, loading };
};

export default useCreatePage;
