import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import ITranslatedText from "../../globalTypes/ITranslatedText";

export interface IRole {
  _id: string;
  name: ITranslatedText[];

  createdAt: string;
  updatedAt: string;
}

export interface IRoleState {
  roles: IRole[];
  total: number;
}

const initialState: IRoleState = {
  roles: [],
  total: 0,
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
      state.roles = state.roles.map((f) => (f._id === role._id ? role : f));
    },
    deleteRoles: (state: IRoleState, action: PayloadAction<string[]>) => {
      const rolesIds: string[] = action.payload;
      state.roles = state.roles.filter((f) => rolesIds.indexOf(f._id) === -1);
    },
  },
});

export default roleSlice.reducer;
