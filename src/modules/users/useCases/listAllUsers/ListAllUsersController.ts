import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const skip = req.query.page;
    const take = req.query.take;

    const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);

    const allUsers = await listAllUsersUseCase.execute({ skip, take });

    return res.status(200).json(allUsers);
  }
}

export { ListAllUsersController };