import { AxiosResponse } from "axios";
import React from "react";
import { EventCommand } from "../../globalTypes/IEvent";

import { useAppDispatch } from "../../store/hooks";
import { fieldSlice } from "../../store/slices/fieldSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IFieldReadDto, IFieldUpdateCommand } from "roottypes";

export type IFieldTableElementUpdateCommand = {
  _id?: string;
  name: string;
  language: string;
};

const useUpdateField = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateField = (command: IFieldUpdateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IFieldReadDto>>({
          url: "/fields",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const field: IFieldReadDto = res.data.data;
          dispatch(fieldSlice.actions.updateField(field));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updateField, loading };
};

export default useUpdateField;
