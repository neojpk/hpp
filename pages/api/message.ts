import { NextApiRequest } from "next";
import { NextApiResponseWithSocket } from "@/types/socket";

const handler = async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (req.method === "POST") {
    // get message
    const { to, nsp, data } = req.body;

    // dispatch to channel "message"
    res?.socket?.server?.io?.of(nsp).emit(to, data);

    // return message
    res.status(201).json(true);
  }
};
export default handler;
