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
      password: "Test123*",
      passwordConfirmation: "Test123*"
    });

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create a new user with an already registered email", async () => {
    await createUserUseCase.execute({
      name: "Test Name",
      email: "test@example.com",
      phone: 123456789,
      password: "Test123*",
      passwordConfirmation: "Test123*"
    });

    expect(async () => {
      await createUserUseCase.execute({
        name: "Test Name 2",
        email: "test@example.com",
        phone: 123456789,
        password: "Test123*",
        passwordConfirmation: "Test123*"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user with different password and password confirmation", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Test Name 2",
        email: "test2@example.com",
        phone: 123456789,
        password: "Test123*",
        passwordConfirmation: "Test1234*"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user if the password do not have an upper case letter", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Test Name 2",
        email: "test2@example.com",
        phone: 123456789,
        password: "test123*",
        passwordConfirmation: "test1234*"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user if the password do not have at least 8 characters", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Test Name 2",
        email: "test2@example.com",
        phone: 123456789,
        password: "Test12*",
        passwordConfirmation: "Test12*"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user if the password do not have an lower case letter", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Test Name 2",
        email: "test2@example.com",
        phone: 123456789,
        password: "TEST123*",
        passwordConfirmation: "TEST123*"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user if the password do not at least one number", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Test Name 2",
        email: "test2@example.com",
        phone: 123456789,
        password: "Testtest*",
        passwordConfirmation: "Testtest*"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user if the password do not at least one special character", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Test Name 2",
        email: "test2@example.com",
        phone: 123456789,
        password: "Test123",
        passwordConfirmation: "Test123"
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});