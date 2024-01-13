import { AxiosResponse } from "axios";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { pageSlice } from "../../store/slices/pageSlice";

const useDeletePages = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const deletePages = (pagesIds: string[]) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<void>>({
          method: "DELETE",
          url: "/pages",
          data: pagesIds,
        })
        .then((res) => {
          dispatch(pageSlice.actions.deletePages(pagesIds));
          resolve(res);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { deletePages, loading };
};

export default useDeletePages;
