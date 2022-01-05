import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase"

let createUserUseCase: CreateUserUseCase;
let usersRepository: UsersRepositoryInMemory;

describe("Create User", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("Should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "Test Name",
      email: "test@example.com",
      phone: 123456789,
      password: "test123",
      passwordConfirmation: "test123"
    });

    console.log(user);

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create a new user with an already registered email", async () => {
    await createUserUseCase.execute({
      name: "Test Name",
      email: "test@example.com",
      phone: 123456789,
      password: "test123",
      passwordConfirmation: "test123"
    });

    expect(async () => {
      await createUserUseCase.execute({
        name: "Test Name 2",
        email: "test@example.com",
        phone: 123456789,
        password: "test123",
        passwordConfirmation: "test123"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user with differente password and password confirmation", async () => {
    await createUserUseCase.execute({
      name: "Test Name",
      email: "test@example.com",
      phone: 123456789,
      password: "test123",
      passwordConfirmation: "test123"
    });

    expect(async () => {
      await createUserUseCase.execute({
        name: "Test Name 2",
        email: "test2@example.com",
        phone: 123456789,
        password: "test1234",
        passwordConfirmation: "test123"
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});