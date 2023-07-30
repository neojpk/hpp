import { createListenerMiddleware } from "@reduxjs/toolkit";
import room from "@/lib/room";
import { user } from "./user";
import { initialize, fetchRoom, vote } from "./room";
import {
  controlAction,
  setStory,
  setAction,
  incrementKeyBy,
  ACTIONS,
} from "./story";

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: initialize,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(user(action.payload));
    listenerApi.dispatch(fetchRoom()).then(({ payload }) => {
      room().setup();
      listenerApi.dispatch(setStory(payload.stories.at(0)));
    });
  },
});

listenerMiddleware.startListening({
  actionCreator: controlAction,
  effect: (action, listener) => {
    const state = listener.getState();

    switch (action.payload) {
      case ACTIONS.BACK:
        console.log({ state });
        listener.dispatch(setAction(ACTIONS.PAUSE));

      case ACTIONS.NEXT:
      case ACTIONS.PAUSE:
      case ACTIONS.PLAY:
      case ACTIONS.STOP:
      case ACTIONS.REPLAY:
    }

    if (action.payload === ACTIONS.REPLAY) {
      listener.dispatch(setAction(ACTIONS.PLAY));
      listener.dispatch(incrementKeyBy(1));
      return;
    }

    //listener.dispatch(setAction(action.payload));
  },
});

listenerMiddleware.startListening({
  actionCreator: vote,
  effect: async (action, listenerApi) => room().vote(action.payload),
});

export default listenerMiddleware;
