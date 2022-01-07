import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const {
      name,
      phone
    } = req.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const result = await updateUserUseCase.execute({ id, name, phone });

    return res.status(200).json(result);
  }
}

export { UpdateUserController };