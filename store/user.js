import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { roles } from "@/lib/room/constants";

const initialState = {
  username: null,
  role: null,
  uuid: null,
  room: null,
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    user: (state, { payload }) => {
      state.username = payload.username;
      state.role = payload.role;
      state.uuid = payload.uuid;
      state.room = payload.room;
    },
  },
});

export const isOwner = (state) => roles[state.user.role] === roles.OWNER;

export const { user, reset } = slice.actions;
export default slice.reducer;
