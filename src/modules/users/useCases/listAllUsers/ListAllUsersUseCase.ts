import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "../../typeorm/entities/User";

interface IListALlUsers {
  page: string;
  take: string;
}

@injectable()
class ListAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  
  async execute({ page, take }: IListALlUsers): Promise<User[]> {
    const allUsers = await this.usersRepository.findAllUsers({ page, take });

    return allUsers;
  }
}

export { ListAllUsersUseCase };