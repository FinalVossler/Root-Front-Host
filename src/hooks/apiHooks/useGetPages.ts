import { AxiosResponse } from "axios";
import React from "react";
import { IPageReadDto } from "roottypes";

import { useAppDispatch } from "../../store/hooks";
import { pageSlice } from "../../store/slices/pageSlice";
import useAxios from "../useAxios";

const useGetPages = () => {
  const [loading, setLoading] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  const axios = useAxios();
  const dispatch = useAppDispatch();

  const getPages = () =>
    new Promise((resolve, reject) => {
      axios
        .request<AxiosResponse<IPageReadDto[]>>({
          method: "GET",
          url: "/pages/",
        })
        .then((res) => {
          dispatch(pageSlice.actions.setPages(res.data.data));
        })
        .finally(() => {
          setLoading(true);
          setFinished(true);
        });
    });

  return { getPages, loading, finished };
};

export default useGetPages;
