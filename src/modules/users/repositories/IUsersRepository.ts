import { ICreateUserDTO } from "../DTOs/ICreateUserDTO";
import { User } from "../typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  updateUser({ id, name, phone }): Promise<User>;
  findAllUsers({ page, take }): Promise<User[]>;
}

export { IUsersRepository };