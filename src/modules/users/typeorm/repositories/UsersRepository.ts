import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../DTOs/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    phone,
    password,
    id
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      phone,
      password,
      id
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne({ id });
  }

  async updateUser({ id, name, phone }): Promise<User> {
    await this.repository
      .createQueryBuilder()
      .update(User)
      .set({ name: name, phone: phone })
      .where("id = :id", { id: id })
      .execute();

    const user = await this.repository.findOne({ id });

    return user;
  }

  async findAllUsers({ page, take }): Promise<User[]> {
    const data = await this.repository.find({
      take,
      skip: take * (page - 1)
    });

    return data;
  }

}

export { UsersRepository };
