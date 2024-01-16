import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { fieldSlice } from "../../store/slices/fieldSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IFieldCreateCommand, IFieldReadDto } from "roottypes";

const useCreateField = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createField = (command: IFieldCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IFieldReadDto>>({
          url: "/fields",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const field: IFieldReadDto = res.data.data;
          dispatch(fieldSlice.actions.addField(field));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createField, loading };
};

export default useCreateField;
