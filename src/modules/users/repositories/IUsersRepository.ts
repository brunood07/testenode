import { ICreateUserDTO } from "../DTOs/ICreateUserDTO";
import { User } from "../typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  updateUser(): Promise<User>;
  listUsers(): Promise<User[]>;
}

export { IUsersRepository };