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
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      phone,
      password,
    });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async updateUser({ id, name, phone }): Promise<User> {
    const user = this.users.find(user => user.id === id);
    if (user) {
      user.name = name;
      user.phone = phone;
    } 

    return user;
  }

  async findAllUsers({ take, skip }): Promise<User[]> {
    const pagination = this.users.slice(skip, take + skip);

    return pagination;
  }
}

export { UsersRepositoryInMemory };
