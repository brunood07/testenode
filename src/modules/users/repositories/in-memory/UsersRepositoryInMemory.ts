import { ICreateUserDTO } from "../../DTOs/ICreateUserDTO";
import { User } from "../../typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    email,
    phone,
    password,
    password_confirmation
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      phone,
      password,
      password_confirmation
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  updateUser(): Promise<User> {
    throw new Error("Method not implemented.");
  }

  listUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  
}

export { UsersRepositoryInMemory };
