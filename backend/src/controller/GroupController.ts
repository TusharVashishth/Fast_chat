import { Request, Response } from "express";
import { errors } from "@vinejs/vine";
import groupValidator from "../validations/groupValidation.js";
import { prismaClient } from "../config/db.config.js";
class GroupController {
  static async index(req: Request, res: Response) {
    try {
      const { user_id } = req.query;
      const groups = await prismaClient.group.findMany({
        where: {
          user_id: user_id as string,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return res.json({ data: groups });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;
    const group = await prismaClient.group.findUnique({
      where: {
        id: id,
      },
    });

    return res.json({ data: group });
  }

  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      const payload = await groupValidator.validate(body);
      const group = await prismaClient.group.create({ data: payload });
      return res.json({ message: "Group created successfully", data: group });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(403).json({ errors: error.messages });
      }
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default GroupController;
