import { Model, Types } from "mongoose";

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  avatar: string;
  displayName?: string;
  googleID?: string;
  __confirmPassword: string;
}

export interface UserVirtuals {
  confirmPassword: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods, UserVirtuals>;
