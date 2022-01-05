import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { createConnection } from "typeorm";

import "../../container";
import { CreateUserController } from "../../../modules/users/useCases/createUser/CreateUserController";
import { AppError } from "../../errors/AppError";

createConnection();

const app = express();

app.use(express.json());

const createUserController = new CreateUserController();

app.post("/users", createUserController.handle);

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