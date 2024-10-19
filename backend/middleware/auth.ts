import { NextFunction, Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import User from "../models/User";
import { UserFields } from "../type";

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields>;
}

const auth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const headerValue = req.get("Authorization");

    if (!headerValue) {
      res.status(401).send({ error: "No Authorization header present" });
      return;
    }

    const [_bearer, token] = headerValue.split(" ");

    if (!token) {
      res.status(401).send({ error: "No token present" });
      return; 
    }

    const user = await User.findOne({ token });

    if (!user) {
      res.status(401).send({ error: "Wrong token!" });
      return; 
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
