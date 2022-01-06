import { ICreateUserDTO } from "../DTOs/ICreateUserDTO";
import { User } from "../typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  updateUser({ id, name, phone }): Promise<void>;
  findAllUsers(): Promise<User[]>;
}

export { IUsersRepository };