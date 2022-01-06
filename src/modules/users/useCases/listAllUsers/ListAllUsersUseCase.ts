import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "../../typeorm/entities/User";

@injectable()
class ListAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  
  async execute(): Promise<User[]> {
    const allUsers = await this.usersRepository.findAllUsers();

    return allUsers;
  }
}

export { ListAllUsersUseCase };