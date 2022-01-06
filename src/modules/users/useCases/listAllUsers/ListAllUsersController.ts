import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);

    const allUsers = await listAllUsersUseCase.execute();

    return res.status(200).json(allUsers);
  }
}

export { ListAllUsersController };