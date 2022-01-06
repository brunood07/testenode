import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import { createConnection } from "typeorm";

import { AuthenticateUserController } from "../../../modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../../modules/users/useCases/createUser/CreateUserController";
import { ListAllUsersController } from "../../../modules/users/useCases/listAllUsers/ListAllUsersController";
import { UpdateUserController } from "../../../modules/users/useCases/updateUser/UpdateUserController";
import "../../container";
import { AppError } from "../../errors/AppError";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";


createConnection();

const app = express();

app.use(express.json());

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserController = new UpdateUserController();
const listAllUsersController = new ListAllUsersController();

app.post("/users", createUserController.handle);
app.post("/session", authenticateUserController.handle);
app.put("/users/update", ensureAuthenticated, updateUserController.handle);
app.get("/users", ensureAuthenticated, listAllUsersController.handle);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
          return response.status(err.statusCode).json({
              message: err.message,
          });
      }
      return response.status(500).json({
          status: "error",
          message: `Internal server error - ${err.message}`,
      });
  }
);

export { app };

