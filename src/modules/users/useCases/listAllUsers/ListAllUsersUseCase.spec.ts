import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

let listAllUsersUseCase: ListAllUsersUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepository: UsersRepositoryInMemory;

describe("List all users", () => {
  beforeAll(async () => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    listAllUsersUseCase = new ListAllUsersUseCase(usersRepository);

    await createUserUseCase.execute({
      name: "Test Name",
      email: "test@example.com",
      phone: 123456789,
      password: "Test123*",
      passwordConfirmation: "Test123*"
    });

    await createUserUseCase.execute({
      name: "Test Name 2",
      email: "test2@example.com",
      phone: 123456789,
      password: "Test123*",
      passwordConfirmation: "Test123*"
    });
    
    await createUserUseCase.execute({
      name: "Test Name 3",
      email: "test3@example.com",
      phone: 123456789,
      password: "Test123*",
      passwordConfirmation: "Test123*"
    });

    await createUserUseCase.execute({
      name: "Test Name 4",
      email: "test4@example.com",
      phone: 123456789,
      password: "Test123*",
      passwordConfirmation: "Test123*"
    });

    await createUserUseCase.execute({
      name: "Test Name 5",
      email: "test5@example.com",
      phone: 123456789,
      password: "Test123*",
      passwordConfirmation: "Test123*"
    });

    await createUserUseCase.execute({
      name: "Test Name 6",
      email: "test6@example.com",
      phone: 123456789,
      password: "Test123*",
      passwordConfirmation: "Test123*"
    });
  });

  it("Should be able to list users with pagination", async () => {
    const pagination = await listAllUsersUseCase.execute({
      skip: 2,
      take: 2,
    });

    expect(pagination.length).toBe(2);
  })
});