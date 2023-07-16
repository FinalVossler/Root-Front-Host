import { AxiosResponse } from "axios";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { fieldSlice } from "../../store/slices/fieldSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useDeleteFields = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const deleteFields = (fieldsIds: string[]) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<void>>({
          method: "DELETE",
          url: "/fields",
          data: fieldsIds,
        })
        .then((res) => {
          dispatch(fieldSlice.actions.deleteFields(fieldsIds));
          resolve(res);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { deleteFields, loading };
};

export default useDeleteFields;
