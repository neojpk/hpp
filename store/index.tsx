"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider as ReduxProvider } from "react-redux";

import user from "./user";
import room from "./room";
import middleware from "./middleware";

export const store = configureStore({
  devTools: {
    name: "poker-planner",
  },
  reducer: {
    user,
    room,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(middleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export function Provider({ children }: { children: React.ReactNode }) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
