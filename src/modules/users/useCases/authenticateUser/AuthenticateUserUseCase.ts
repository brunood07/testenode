import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { sign } from "jsonwebtoken";

interface IAuthenticateUser {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IAuthenticateUser) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("email or password incorrect");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError("email or password incorrect");

    const secretToken = "e2171a394509ff73270a6dee1745d4b4";

    const token = sign({email}, secretToken, {
      subject: user.id,
      expiresIn: 60 * 3
    });

    return token;
  }
}

export { AuthenticateUserUseCase };