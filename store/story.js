import { createSlice, createAction } from "@reduxjs/toolkit";

export const ACTIONS = {
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  NEXT: "NEXT",
  BACK: "BACK",
  STOP: "STOP",
  REPLAY: "REPLAY",
};

export const controlAction = createAction("story/controlAction");

const initialState = {
  currentStory: {},
  duration: 30,
  action: ACTIONS.PAUSE,
  key: 0,
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    setStory: (state, action) => {
      state.currentStory = action.payload;
    },
    setAction: (state, action) => {
      state.action = action.payload;
    },
    incrementKeyBy: (state, action) => {
      state.key += action.payload;
    },
  },
});

export const prevStory = (state) => {
  const { stories, key } = state;
  const prevStory = stories[key - 1];
  if (prevStory) {
    return prevStory;
  }
  return stories[stories.length - 1];
};

export const { setAction, setStory, incrementKeyBy } = storySlice.actions;
export default storySlice.reducer;
