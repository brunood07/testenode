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
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      phone,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async updateUser({ id, name, phone }): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findAllUsers(): Promise<User[]> {
    return this.users.filter((users) => users);
  }
  
}

export { UsersRepositoryInMemory };
