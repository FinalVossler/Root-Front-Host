import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IFile from "../../globalTypes/IFile";
import ITranslatedText from "../../globalTypes/ITranslatedText";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { IField, IFieldTableElement } from "./fieldSlice";
import { IModel } from "./modelSlice";
import { IUser } from "./userSlice";

export interface IEntity {
  _id: string;
  model: IModel;
  entityFieldValues: IEntityFieldValue[];
  assignedUsers?: IUser[];

  createdAt: string;
  updatedAt: string;
}

export interface IEntityFieldValue {
  field: IField;
  value: ITranslatedText[];
  files: IFile[];

  tableValues?: IEntityTableFieldCaseValue[];
  yearTableValues?: IEntityYearTableFieldRowValues[];
}

export interface IEntityTableFieldCaseValue {
  column: IFieldTableElement;
  row: IFieldTableElement;
  value: ITranslatedText[];
}

export interface IEntityYearTableFieldRowValues {
  row: IFieldTableElement;
  values: {
    year: number;
    value: ITranslatedText[];
  }[];
}

export interface IEntityState {
  entitiesByModel: {
    modelId: string;
    entities: IEntity[];
    total: number;
    searchResult: PaginationResponse<IEntity>;
  }[];
  total: number;

  assignedEntitiesByModel: {
    total: number;
    entities: IEntity[];
    modelId: string;
  }[];
}

const initialState: IEntityState = {
  entitiesByModel: [],
  total: 0,
  assignedEntitiesByModel: [],
};

export const entitySlice = createSlice({
  initialState,
  name: "entity",
  reducers: {
    setModelEntities: (
      state: IEntityState,
      action: PayloadAction<{
        entities: IEntity[];
        modelId: string;
        total: number;
      }>
    ) => {
      const modelEntities = state.entitiesByModel.find(
        (el) => el.modelId === action.payload.modelId
      );
      if (modelEntities) {
        modelEntities.entities = [...action.payload.entities.reverse()];
        modelEntities.total = action.payload.total;
      } else {
        state.entitiesByModel.push({
          modelId: action.payload.modelId,
          entities: [...action.payload.entities],
          total: action.payload.total,
          searchResult: {
            data: [],
            total: 0,
          },
        });
      }
    },
    addEntity: (
      state: IEntityState,
      action: PayloadAction<{ modelId: string; entity: IEntity }>
    ) => {
      const entity: IEntity = action.payload.entity;
      const modelId: string = action.payload.modelId;
      state.entitiesByModel
        .find((el) => el.modelId === modelId)
        ?.entities.unshift(entity);
    },
    updateEntity: (
      state: IEntityState,
      action: PayloadAction<{ modelId: string; entity: IEntity }>
    ) => {
      const entity: IEntity = action.payload.entity;
      const modelId: string = action.payload.modelId;
      state.entitiesByModel = state.entitiesByModel.map((entitiesByModel) => {
        if (entitiesByModel.modelId === modelId) {
          return {
            ...entitiesByModel,
            entities: entitiesByModel.entities.map((el) => {
              if (el._id === entity._id) {
                return entity;
              } else {
                return el;
              }
            }),
            searchResult: {
              total: entitiesByModel.searchResult.total,
              data: entitiesByModel.searchResult.data.map((el) => {
                if (el._id === entity._id) {
                  return entity;
                } else {
                  return el;
                }
              }),
            },
          };
        } else {
          return entitiesByModel;
        }
      });
    },
    deleteEntities: (
      state: IEntityState,
      action: PayloadAction<{ entitiesIds: string[]; modelId: string }>
    ) => {
      const modelId: string = action.payload.modelId;
      const entitiesIds: string[] = action.payload.entitiesIds;

      state.entitiesByModel = state.entitiesByModel.map((entitiesByModel) => {
        if (entitiesByModel.modelId === modelId) {
          return {
            ...entitiesByModel,
            entities: entitiesByModel.entities.filter(
              (entity) => entitiesIds.indexOf(entity._id) === -1
            ),
          };
        } else {
          return entitiesByModel;
        }
      });
    },
    setSearchedEntities: (
      state: IEntityState,
      action: PayloadAction<{
        searchResult: PaginationResponse<IEntity>;
        modelId: string;
      }>
    ) => {
      const modelEntities = state.entitiesByModel.find(
        (el) => el.modelId === action.payload.modelId
      );
      if (modelEntities) {
        modelEntities.searchResult = action.payload.searchResult;
      } else {
        state.entitiesByModel.push({
          modelId: action.payload.modelId,
          entities: [],
          total: 0,
          searchResult: action.payload.searchResult,
        });
      }
    },
    setAssignedEntitiesByModel: (
      state: IEntityState,
      action: PayloadAction<{
        entities: IEntity[];
        modelId: string;
        total: number;
      }>
    ) => {
      const modelEntities = state.assignedEntitiesByModel.find(
        (el) => el.modelId === action.payload.modelId
      );
      if (modelEntities) {
        modelEntities.entities = [...action.payload.entities.reverse()];
        modelEntities.total = action.payload.total;
      } else {
        state.assignedEntitiesByModel.push({
          modelId: action.payload.modelId,
          entities: [...action.payload.entities],
          total: action.payload.total,
        });
      }
    },
  },
});

export const getEntityName = ({ entity, getTranslatedText }) => {
  const entityAsEntity: IEntity = entity;
  return entityAsEntity.entityFieldValues
    .map((fieldValue) => getTranslatedText(fieldValue.value))
    .join(", ");
};

export default entitySlice.reducer;
