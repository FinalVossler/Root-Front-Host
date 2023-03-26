import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { fieldSlice, IField } from "../../store/slices/fieldSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type FieldUpdateCommand = {
  _id: string;
  name: string;
  type: IField["type"];
  language: string;
  options?: {
    label: string;
    value: string;
  }[];
};

const useUpdateField = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateField = (command: FieldUpdateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IField>>({
          url: "/fields",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const field: IField = res.data.data;
          dispatch(fieldSlice.actions.updateField(field));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updateField, loading };
};

export default useUpdateField;
