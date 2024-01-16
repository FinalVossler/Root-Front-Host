import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { IPaginationResponse, IRoleReadDto } from "roottypes";

export interface IRoleState {
  roles: IRoleReadDto[];
  total: number;
  searchedRoles: IPaginationResponse<IRoleReadDto>;
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
      action: PayloadAction<{ roles: IRoleReadDto[]; total: number }>
    ) => {
      const roles: IRoleReadDto[] = action.payload.roles;
      const total: number = action.payload.total;
      state.roles = roles;
      state.total = total;
    },
    addRole: (state: IRoleState, action: PayloadAction<IRoleReadDto>) => {
      const role: IRoleReadDto = action.payload;
      state.roles.unshift(role);
    },
    updateRole: (state: IRoleState, action: PayloadAction<IRoleReadDto>) => {
      const role: IRoleReadDto = action.payload;
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
      action: PayloadAction<IPaginationResponse<IRoleReadDto>>
    ) => {
      state.searchedRoles = action.payload;
    },
  },
});

export default roleSlice.reducer;
