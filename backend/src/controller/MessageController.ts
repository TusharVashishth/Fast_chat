import { prismaClient } from "../config/db.config.js";
import { Request, Response } from "express";

type MessageType = {
  name: string;
  group_id: string;
  message: string;
  created_at: Date;
};

class MessageController {
  static async index(req: Request, res: Response) {
    const page: number = Number(req.query?.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
    const { group_id } = req.params;

    const skip = (page - 1) * limit;

    const messages = await prismaClient.messages.findMany({
      take: limit,
      skip: skip,
      select: {
        id: true,
        name: true,
        created_at: true,
        group_id: true,
        message: true,
        type: true,
      },
      orderBy: {
        id: "desc",
      },
      where: {
        group_id: group_id,
      },
    });

    return res.json({ data: messages });
  }

  static async store(req: Request, res: Response) {
    const body: MessageType = req.body;
    const message = await prismaClient.messages.create({ data: body });
    return res.json({ data: message });
  }
}

export default MessageController;
