import { AxiosResponse } from "axios";
import React from "react";
import PaginationCommand from "../../globalTypes/PaginationCommand";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch } from "../../store/hooks";
import { fieldSlice, IField } from "../../store/slices/fieldSlice";

import useAuthorizedAxios from "../useAuthorizedAxios";

export type FieldsGetCommand = {
  paginationCommand: PaginationCommand;
};

const useGetFields = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getFields = (command: FieldsGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<PaginationResponse<IField>>>({
          method: "POST",
          url: "/fields/getFields",
          data: command,
        })
        .then((res) => {
          dispatch(
            fieldSlice.actions.setFields({
              fields: res.data.data.data,
              total: res.data.data.total,
            })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getFields: getFields, loading };
};

export default useGetFields;
