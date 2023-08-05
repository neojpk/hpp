import { createListenerMiddleware } from "@reduxjs/toolkit";
import room from "@/lib/room";
import { user } from "./user";
import {
  initialize,
  fetchRoom,
  vote,
  action,
  story,
  incrementKey,
  ACTIONS,
} from "./room";

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: initialize,
  effect: async (action, listener) => {
    listener.dispatch(user(action.payload));
    await listener.dispatch(fetchRoom());
    room.initialize();
  },
});

listenerMiddleware.startListening({
  actionCreator: action,
  effect: async ({ payload }, listener) => {
    const state = listener.getState();

    if ([ACTIONS.BACK, ACTIONS.NEXT, ACTIONS.REPLAY].includes(payload)) {
      listener.dispatch(incrementKey());
    }

    if (payload === ACTIONS.BACK) {
      if (state.room.story !== 0) {
        listener.dispatch(story(state.room.story - 1));
      }
      listener.dispatch(action(ACTIONS.PAUSE));
    }

    if (payload === ACTIONS.NEXT) {
      if (state.room.story !== state.room.stories.length - 1) {
        listener.dispatch(story(state.room.story + 1));
      }
      listener.dispatch(action(ACTIONS.PAUSE));
    }

    if (payload === ACTIONS.REPLAY) {
      listener.dispatch(action(ACTIONS.PLAY));
    }
  },
});

listenerMiddleware.startListening({
  actionCreator: story,
  effect: async ({ payload }, listener) => {
    const state = listener.getState();
    const story = state.room.stories[payload];

    console.log({ story });
  },
});

listenerMiddleware.startListening({
  actionCreator: vote,
  effect: async (action, listenerApi) => room().vote(action.payload),
});

export default listenerMiddleware;
