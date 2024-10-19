import mongoose, { HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import { UserFields, UserMethods, UserModel, UserVirtuals } from "../type";

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema<
  UserFields,
  UserModel,
  UserMethods,
  {},
  UserVirtuals
>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/,
        "Пожалуйста, введите действительный адрес электронной почты.",
      ],
      validate: {
        validator: async function (value: string): Promise<boolean> {
          if (!(this as HydratedDocument<UserFields>).isModified("username")) {
            return true;
          }

          const user = await User.findOne({ username: value });
          return !user;
        },
        message: "Этот пользователь уже зарегистрирован!",
      },
    },

    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
    displayName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    googleID: String,
  },
  {
    virtuals: {
      confirmPassword: {
        get() {
          return this.__confirmPassword;
        },
        set(confirmPassword: string) {
          this.__confirmPassword = confirmPassword;
        },
      },
    },
  }
);

UserSchema.path("password").validate(function (v) {
  if (!this.isModified("password")) {
    return;
  }

  if (v !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Пароли не совпадают!");
    this.invalidate("password", "Пароли не совпадают!");
  }
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<UserFields, UserModel>("User", UserSchema);

export default User;
