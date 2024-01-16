import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IEntityReadDto, IPaginationResponse } from "roottypes";

export interface IEntityState {
  entitiesByModel: {
    modelId: string;
    entities: IEntityReadDto[];
    total: number;
    searchResult: IPaginationResponse<IEntityReadDto>;
  }[];
  total: number;

  assignedEntitiesByModel: {
    total: number;
    entities: IEntityReadDto[];
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
        entities: IEntityReadDto[];
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
      action: PayloadAction<{ modelId: string; entity: IEntityReadDto }>
    ) => {
      const entity: IEntityReadDto = action.payload.entity;
      const modelId: string = action.payload.modelId;
      state.entitiesByModel
        .find((el) => el.modelId === modelId)
        ?.entities.unshift(entity);
    },
    updateEntity: (
      state: IEntityState,
      action: PayloadAction<{ modelId: string; entity: IEntityReadDto }>
    ) => {
      const entity: IEntityReadDto = action.payload.entity;
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
        searchResult: IPaginationResponse<IEntityReadDto>;
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
        entities: IEntityReadDto[];
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
  const entityAsEntity: IEntityReadDto = entity;
  return entityAsEntity.entityFieldValues
    .map((fieldValue) => getTranslatedText(fieldValue.value))
    .join(", ");
};

export default entitySlice.reducer;
