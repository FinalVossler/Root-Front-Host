import { AxiosResponse } from "axios";
import React from "react";
import { EventCommand, IEvent } from "../../globalTypes/IEvent";
import ITranslatedText from "../../globalTypes/ITranslatedText";

import { useAppDispatch } from "../../store/hooks";
import { fieldSlice, IField } from "../../store/slices/fieldSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type FieldTableElementCreateCommand = {
  name: string | ITranslatedText[];
  language: string;
};

export type FieldCreateCommand = {
  name: string;
  type: IField["type"];
  options?: {
    label: string;
    value: string;
  }[];
  fieldEvents: EventCommand[];
  tableOptions: {
    name: string;
    columns: FieldTableElementCreateCommand[];
    rows: FieldTableElementCreateCommand[];
    yearTable: boolean;
  };
  language: string;
};

const useCreateField = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createField = (command: FieldCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IField>>({
          url: "/fields",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const field: IField = res.data.data;
          dispatch(fieldSlice.actions.addField(field));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createField, loading };
};

export default useCreateField;
