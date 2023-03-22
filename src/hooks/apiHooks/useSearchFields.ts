import React from "react";
import { AxiosResponse } from "axios";
import uuid from "react-uuid";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IModel, IModelField } from "../../store/slices/modelSlice";
import { IField } from "../../store/slices/fieldSlice";

export type FieldsSearchCommand = {
  name: string;
  paginationCommand: PaginationCommand;
};

const useSearchFields = (model: IModel | undefined) => {
  const [selectedModelFields, setSelectedModelFields] = React.useState<
    IModelField[]
  >([]);

  const axios = useAuthorizedAxios();

  // The searched model fields should be initialized to the models' model fields
  React.useEffect(() => {
    if (model) {
      const newSelectedModelFields = [...model.modelFields];

      setSelectedModelFields(
        newSelectedModelFields.map((modelField) => ({
          ...modelField,
          uuid: uuid(),
        }))
      );
    }
  }, [model]);

  const handleSearchFieldsPromise = (
    name: string,
    paginationCommand: PaginationCommand
  ) =>
    new Promise<PaginationResponse<IField>>((resolve, _) => {
      const command: FieldsSearchCommand = {
        paginationCommand: paginationCommand,
        name,
      };

      axios
        .request<AxiosResponse<PaginationResponse<IField>>>({
          url: "/fields/search",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
        });
    });

  const handleSelectField = (field: IField) => {
    setSelectedModelFields([
      { field, required: false, uuid: uuid() },
      ...selectedModelFields,
    ]);
  };

  const handleDeleteModelField = (index: number) => {
    let newSelectedModelFields = [...selectedModelFields];
    newSelectedModelFields.splice(index, 1);
    setSelectedModelFields(newSelectedModelFields);
  };

  return {
    handleSelectField,
    handleDeleteModelField,
    selectedModelFields,
    setSelectedModelFields,
    handleSearchFieldsPromise,
  };
};

export default useSearchFields;
