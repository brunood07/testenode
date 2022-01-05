import { hash } from "bcryptjs";
import { User } from "modules/users/typeorm/entities/User";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface ICreateUser {
  name: string;
  email: string;
  phone: number;
  password: string;
  passwordConfirmation: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") 
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    name,
    email,
    phone,
    password,
    passwordConfirmation
  }: ICreateUser) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }
    
    if (password.length < 8) throw new AppError("Password must be at least 8 characters");
    
    if (password.search(/[A-Z]/) < 0) throw new AppError("Password must have at least one upper case character");

    if (password.search(/[A-Z]/) < 0) throw new AppError("Password must have at least one lower case character");

    if (!password.match(/([0-9])/)) throw new AppError("Password must have at least a number");

    if (!password.match(/([!, %, &, @, #, $, ^, *, ?, _, ~])/)) throw new AppError("Password must have at least one special character"); 

    if (password !== passwordConfirmation) throw new AppError("Password do not match");

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      phone,
      password: passwordHash,
      passwordConfirmation,
    });

    return user;
  }
}

export { CreateUserUseCase };