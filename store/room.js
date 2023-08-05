import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserRoom } from "@/api";

export const ACTIONS = {
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  NEXT: "NEXT",
  BACK: "BACK",
  STOP: "STOP",
  REPLAY: "REPLAY",
};

export const STATES = {
  [ACTIONS.PAUSE]: [ACTIONS.BACK, ACTIONS.PLAY, ACTIONS.NEXT],
  [ACTIONS.PLAY]: [ACTIONS.BACK, ACTIONS.PAUSE, ACTIONS.NEXT],
  [ACTIONS.STOP]: [ACTIONS.BACK, ACTIONS.REPLAY, ACTIONS.NEXT],
};

const initialState = {
  story: 0,
  key: 0,
  duration: 30,
  participants: [],
  stories: [],
  points: [],
  currentAction: ACTIONS.PAUSE,
};

export const initialize = createAction("room/initialize");
export const vote = createAction("room/vote");
export const action = createAction("room/action");
export const story = createAction("room/story");

export const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    reset: () => initialState,
    participants: (state, action) => {
      state.participants = action.payload;
    },
    incrementKey: (state) => {
      state.key += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoom.fulfilled, (state, { payload }) => {
      state.stories = payload.stories;
      state.points = payload.points;
    });
    builder.addCase(action, (state, { payload }) => {
      state.currentAction = payload;
    });
    builder.addCase(story, (state, { payload }) => {
      state.story = payload;
    });
  },
});

export const fetchRoom = createAsyncThunk("room/fetchRoom", async () => {
  const response = await fetchUserRoom();
  return response;
});

export const currentStory = (state) => state.room.stories[state.room.story];
export const currentEnabledActions = (state) =>
  STATES[state.room.currentAction];
export const { participants, incrementKey, setAction } = room.actions;
export default room.reducer;
