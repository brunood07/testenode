import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const secretToken = "e2171a394509ff73270a6dee1745d4b4";

    const { sub: user_id } = verify(token, secretToken) as IPayload;

    req.user = {
      id: user_id
    }

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}