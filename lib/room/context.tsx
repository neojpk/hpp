"use client";

import {
  createContext,
  useReducer,
  useMemo,
  useRef,
  useEffect,
  useContext,
  useCallback,
  type ReactNode,
  type Dispatch,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { RoomEvents, UserEvents } from "./constants";
import { Message, ISocketContext } from "@/types/socket";

type RoomProviderType = {
  id: string;
  children: ReactNode;
  username: string | undefined;
  role: string | undefined;
};

export const RoomContext = createContext<{
  state: any;
  dispatch: Dispatch<any>;
  send: (message: Message) => void;
} | null>(null);

export const RoomProvider = ({
  children,
  id,
  username,
  role,
}: RoomProviderType) => {
  const [done, setDone] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const roomId = useMemo(() => `/room-${id}`, [id]);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(roomId, {
      autoConnect: false,
      path: "/api/socket",
      query: { username, role },
    });

    const eventHandler = (event: string, args: any) => {
      dispatch({ type: event, payload: args });
    };

    socket.current.onAny(eventHandler);
    return () => {
      socket.current?.offAny(eventHandler);
      socket.current?.disconnect();
    };
  }, [roomId, role, username]);

  useEffect(() => {
    socket.current?.connect();
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const send = useCallback(
    (message: Message) => {
      if (socket.current) {
        console.log({ message });
        fetch("/api/message", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...message, nsp: roomId }),
        });
      }
    },
    [roomId, socket]
  );

  const contextValue = useMemo(
    () => ({ state, dispatch, send }),
    [state, send]
  );

  return (
    <RoomContext.Provider value={contextValue}>{children}</RoomContext.Provider>
  );
};

export const useRoom = () => {
  const context = useContext(RoomContext);

  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }

  return context;
};

const initialState = {
  user: null,
  room: {
    participants: [],
    stories: [],
    points: [],
  },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case UserEvents.USER:
      return {
        ...state,
        user: action.payload,
      };
    case RoomEvents.JOIN:
      return {
        ...state,
        room: {
          ...state.room,
          ...action.payload,
        },
      };
    case RoomEvents.JOINED:
      return {
        ...state,
        room: {
          ...state.room,
          participants: action.payload,
        },
      };
    default: {
      throw new Error("Unknown action: " + action.type);
    }
  }
};
