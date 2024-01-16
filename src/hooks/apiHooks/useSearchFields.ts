import React from "react";
import { AxiosResponse } from "axios";
import uuid from "react-uuid";
import _ from "lodash";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { IModelField } from "../../store/slices/modelSlice";
import { fieldSlice } from "../../store/slices/fieldSlice";
import { useAppDispatch } from "../../store/hooks";
import {
  IFieldReadDto,
  IFieldsSearchCommand,
  IModelReadDto,
  IPaginationCommand,
  IPaginationResponse,
} from "roottypes";

const useSearchFields = (model: IModelReadDto | undefined) => {
  const [selectedModelFields, setSelectedModelFields] = React.useState<
    IModelField[]
  >([]);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  // The searched model fields should be initialized to the models' model fields
  React.useEffect(() => {
    if (model) {
      const newSelectedModelFields: IModelField[] =
        model.modelFields.map((modelField) => ({
          ...modelField,
          field: modelField.field,
          required: modelField.required,
          conditions:
            modelField.conditions?.map((condition) => ({
              value: condition.value,
              conditionType: condition.conditionType,
              field: condition.field,
              modelState: condition.modelState,
            })) || [],
        })) || [];

      handleSelectModelFields(
        newSelectedModelFields.map((modelField) => ({
          ...modelField,
          uuid: uuid(),
        }))
      );
    }
  }, [model]);

  // We shouldn't allow selecting the same field more than once.
  const handleSelectModelFields = (selected: IModelField[]) => {
    const result = _.uniqBy(
      selected,
      (modelField: IModelField) => (modelField.field as IFieldReadDto)._id
    );
    setSelectedModelFields(result);
  };

  const handleSearchFieldsPromise = (
    name: string,
    paginationCommand: IPaginationCommand
  ) =>
    new Promise<IPaginationResponse<IFieldReadDto>>((resolve, _) => {
      const command: IFieldsSearchCommand = {
        paginationCommand: paginationCommand,
        name,
      };

      axios
        .request<AxiosResponse<IPaginationResponse<IFieldReadDto>>>({
          url: "/fields/search",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
          dispatch(fieldSlice.actions.setSearchedFields(res.data.data));
        });
    });

  const handleSelectField = (field: IFieldReadDto) => {
    handleSelectModelFields([
      { field, required: false, uuid: uuid() },
      ...selectedModelFields,
    ]);
  };

  const handleDeleteModelField = (index: number) => {
    let newSelectedModelFields = [...selectedModelFields];
    newSelectedModelFields.splice(index, 1);
    handleSelectModelFields(newSelectedModelFields);
  };

  return {
    handleSelectField,
    handleDeleteModelField,
    selectedModelFields,
    setSelectedModelFields: handleSelectModelFields,
    handleSearchFieldsPromise,
  };
};

export default useSearchFields;
