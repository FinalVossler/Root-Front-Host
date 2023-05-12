import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import ITranslatedText from "../../globalTypes/ITranslatedText";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { IField } from "./fieldSlice";
import { IModel } from "./modelSlice";

export enum EntityEventNotificationTrigger {
  OnCreate = "OnCreate",
}

export interface IEntityEventNotification {
  _id?: string;
  title: ITranslatedText[];
  text: ITranslatedText[];
  trigger: EntityEventNotificationTrigger;
}

export interface IFieldPermission {
  field: IField;
  permissions: StaticPermission[];
}

export enum StaticPermission {
  Create = "Create",
  Read = "Read",
  Update = "Update",
  Delete = "Delete",
}

export interface IEntityPermission {
  _id?: string;
  model: IModel;
  permissions: StaticPermission[];
  entityFieldPermissions: IFieldPermission[];
  entityEventNotifications: IEntityEventNotification[];
}

export enum Permission {
  EditConfiguration = "EditConfiguration",

  CreatePage = "CreatePage",
  ReadPage = "ReadPage",
  UpdatePage = "UpdatePage",
  DeletePage = "DeletePage",

  CreatePost = "CreatePost",

  CreateField = "CreateField",
  ReadField = "ReadField",
  UpdateField = "UpdateField",
  DeleteField = "DeleteField",

  CreateModel = "CreateModel",
  ReadModel = "ReadModel",
  UpdateModel = "UpdateModel",
  DeleteModel = "DeleteModel",

  CreateUser = "CreateUser",
  ReadUser = "ReadUser",
  UpdateUser = "UpdateUser",
  DeleteUser = "DeleteUser",

  CreateRole = "CreateRole",
  ReadRole = "ReadRole",
  UpdateRole = "UpdateRole",
  DeleteRole = "DeleteRole",
}

export interface IRole {
  _id: string;
  name: ITranslatedText[];
  permissions: Permission[];
  entityPermissions: IEntityPermission[];

  createdAt: string;
  updatedAt: string;
}

export interface IRoleState {
  roles: IRole[];
  total: number;
  searchedRoles: PaginationResponse<IRole>;
}

const initialState: IRoleState = {
  roles: [],
  total: 0,
  searchedRoles: {
    data: [],
    total: 0,
  },
};

export const roleSlice = createSlice({
  initialState,
  name: "role",
  reducers: {
    setRoles: (
      state: IRoleState,
      action: PayloadAction<{ roles: IRole[]; total: number }>
    ) => {
      const roles: IRole[] = action.payload.roles;
      const total: number = action.payload.total;
      state.roles = roles;
      state.total = total;
    },
    addRole: (state: IRoleState, action: PayloadAction<IRole>) => {
      const role: IRole = action.payload;
      state.roles.unshift(role);
    },
    updateRole: (state: IRoleState, action: PayloadAction<IRole>) => {
      const role: IRole = action.payload;
      state.roles = state.roles.map((r) => (r._id === role._id ? role : r));
      state.searchedRoles.data = state.searchedRoles.data.map((r) => {
        if (r._id === role._id) {
          return role;
        } else {
          return r;
        }
      });
    },
    deleteRoles: (state: IRoleState, action: PayloadAction<string[]>) => {
      const rolesIds: string[] = action.payload;
      state.roles = state.roles.filter((f) => rolesIds.indexOf(f._id) === -1);

      state.searchedRoles.data = state.searchedRoles.data.filter(
        (u) => rolesIds.indexOf(u._id) === -1
      );
    },
    setSearchedRoles: (
      state: IRoleState,
      action: PayloadAction<PaginationResponse<IRole>>
    ) => {
      state.searchedRoles = action.payload;
    },
  },
});

export default roleSlice.reducer;
