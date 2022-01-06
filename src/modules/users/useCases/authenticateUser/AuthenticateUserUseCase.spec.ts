import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("Should be able to authenticate a user", async () => {
    await createUserUseCase.execute({
      name: "Test Name",
      email: "test@example.com",
      phone: 123456789,
      password: "Test123*",
      passwordConfirmation: "Test123*"
    });

    const result = await authenticateUserUseCase.execute({
      email: "test@example.com",
      password: "Test123*"
    });

    expect(result).toHaveLength(224);
  });

  it("Should not be able to authenticate user with incorrect email", () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Test Name",
        email: "test@example.com",
        phone: 123456789,
        password: "Test123*",
        passwordConfirmation: "Test123*"
      });
  
      const result = await authenticateUserUseCase.execute({
        email: "test2@example.com",
        password: "Test123*"
      });  
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate user with incorrect password", () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Test Name",
        email: "test@example.com",
        phone: 123456789,
        password: "Test123*",
        passwordConfirmation: "Test123*"
      });
  
      const result = await authenticateUserUseCase.execute({
        email: "test@example.com",
        password: "Test123*5"
      });  
    }).rejects.toBeInstanceOf(AppError);
  });
});