import { IUsersRepository } from "../../repositories/IUsersRepository";

import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

interface IUpdateUser {
  id: string;
  name?: string;
  phone?: number;
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
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError("user does not exists");

    user.name = name ? name : user.name
    user.phone = phone ? phone : user.phone
    
    const updatedUser = await this.usersRepository.updateUser(user);

    return updatedUser;
  }
}

export { UpdateUserUseCase }