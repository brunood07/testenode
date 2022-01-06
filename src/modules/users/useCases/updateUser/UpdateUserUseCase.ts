import { IUsersRepository } from "../../repositories/IUsersRepository";

import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

interface IUpdateUser {
  id: string;
  name?: string;
  phone?: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    id,
    name,
    phone
  }: IUpdateUser) {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) throw new AppError("user does not exists");
    
    const updatedUser = await this.usersRepository.updateUser({ id, name, phone });

    return updatedUser;
  }
}

export { UpdateUserUseCase }