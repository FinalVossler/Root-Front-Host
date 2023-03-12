import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { IPage, pageSlice } from "../../store/slices/pageSlice";

import useAuthorizedAxios from "../useAuthorizedAxios";

export type PageCreateCommand = {
  title: string;
  posts: string[];
  language: string;
};

const useCreatePage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createPage = (command: PageCreateCommand) =>
    new Promise((resolve, reject) => {
      axios
        .request<AxiosResponse<IPage>>({
          url: "/pages",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const page: IPage = res.data.data;
          dispatch(pageSlice.actions.addPage(page));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createPage, loading };
};

export default useCreatePage;
