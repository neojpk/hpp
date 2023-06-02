import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { NextApiResponseWithSocket } from "@/types/socket";
import { points, stories } from "@/lib/room/room";
import { RoomEvents } from "@/lib/room/constants";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    res.socket.server.io = io;
    const roomspace = io.of(/^\/room-\d+$/);
    roomspace.on("connection", async (socket) => {
      socket.data = {
        username: socket.handshake.query.username,
        role: socket.handshake.query.role,
      };

      const sockets = await socket.nsp.fetchSockets();

      console.log({ l: sockets.length, data: socket.data });
      socket.emit(RoomEvents.JOIN, { points, stories });

      //socket.broadcast.emit(RoomEvents.JOINED, {
      //  participants:,
      //});
    });
  }

  res.end();

  // io.on("new_namespace", (nsp) => {
  //   nsp.adapter.on("join-room", (room, id) => {
  //     console.log({ room, id, enter: true });
  //   });

  //   nsp.adapter.on("leave-room", (room, id) => {
  //     console.log({ room, id, leave: true });
  //   });
  // });
}
