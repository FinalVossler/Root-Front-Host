import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { fieldSlice } from "../../store/slices/fieldSlice";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { IFieldReadDto, IFieldsGetCommand } from "roottypes";

const useGetFields = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getFields = (command: IFieldsGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IPaginationResponse<IFieldReadDto>>>({
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
