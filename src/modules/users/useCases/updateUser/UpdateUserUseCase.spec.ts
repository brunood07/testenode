import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { User } from "../../typeorm/entities/User";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let updateUserUseCase: UpdateUserUseCase;

describe("Update user", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    updateUserUseCase= new UpdateUserUseCase(usersRepository);
  });

  it("Should be able to update user name", async () => {
    const user: User = await createUserUseCase.execute({
      name: "Test Name",
      email: "test@example.com",
      phone: 123456789,
      password: "Test123*",
      passwordConfirmation: "Test123*"
    });

    const result = await updateUserUseCase.execute({
      id: user.id,
      name: "Test Name 2",
    });

    expect(result.name).toBe("Test Name 2");
  });

  it("Should be able to update user phone", async () => {
    const user = await createUserUseCase.execute({
      name: "Test Name",
      email: "test@example.com",
      phone: 123456789,
      password: "Test123*",
      passwordConfirmation: "Test123*"
    });

    const result = await updateUserUseCase.execute({
      id: user.id,
      phone: 1234567,
    });

    expect(result.phone).toBe(1234567);
  });

  it("Should be able to update user name and phone", async () => {
    const user = await createUserUseCase.execute({
      name: "Test Name",
      email: "test@example.com",
      phone: 123456789,
      password: "Test123*",
      passwordConfirmation: "Test123*"
    });

    const result = await updateUserUseCase.execute({
      id: user.id,
      name: "Test Name 2",
      phone: 123987
    });

    expect(result.name).toBe("Test Name 2");
    expect(result.phone).toBe(123987);
  });
});