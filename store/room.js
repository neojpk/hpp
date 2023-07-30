import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserRoom } from "@/api";

const initialState = {
  participants: [],
  stories: [],
  points: [],
};

export const initialize = createAction("room/initialize");
export const vote = createAction("room/vote");

export const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    reset: () => initialState,
    participants: (state, action) => {
      console.log({ action });
      state.participants = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoom.fulfilled, (state, { payload }) => {
      state.stories = payload.stories;
      state.points = payload.points;
    });
  },
});

export const fetchRoom = createAsyncThunk("room/fetchRoom", async (_, tp) => {
  const response = await fetchUserRoom();
  return response;
});

export const { participants } = room.actions;
export default room.reducer;
