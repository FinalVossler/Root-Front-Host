import { AxiosResponse } from "axios";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { IPage, pageSlice } from "../../store/slices/pageSlice";

import useAuthorizedAxios from "../useAuthorizedAxios";

export type PageUpdateCommand = {
  _id: string;
  title: string;
  posts: string[];
  showInHeader: boolean;
  showInSideMenu: boolean;
  language: string;
};

const useUpdatePage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updatePage = (command: PageUpdateCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IPage>>({
          url: "/pages",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const page: IPage = res.data.data;
          dispatch(pageSlice.actions.updatePage(page));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(expect));
    });

  return { updatePage, loading };
};

export default useUpdatePage;
