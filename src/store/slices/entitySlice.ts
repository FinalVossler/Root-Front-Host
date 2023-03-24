import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IFile from "../../globalTypes/IFile";

import ITranslatedText from "../../globalTypes/ITranslatedText";
import { IField } from "./fieldSlice";
import { IModel } from "./modelSlice";

export interface IEntity {
  _id: string;
  model: IModel;
  entityFieldValues: IEntityFieldValue[];

  createdAt: string;
  updatedAt: string;
}

export interface IEntityFieldValue {
  field: IField;
  value: ITranslatedText[];
  files: IFile[];
}

export interface IEntityState {
  entitiesByModel: { modelId: string; entities: IEntity[]; total: number }[];
  total: number;
}

const initialState: IEntityState = {
  entitiesByModel: [],
  total: 0,
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
  },
});

export default entitySlice.reducer;
