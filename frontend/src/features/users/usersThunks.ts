import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import axiosApi from "../../axiosApi";
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  User,
  ValidationError,
} from "../../type";
import { unsetUser } from "./usersSlice";
import { RootState } from "../../app/store";

export const register = createAsyncThunk<
  User,
  RegisterMutation,
  { rejectValue: ValidationError }
>("users/register", async (registerMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    Object.entries(registerMutation).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });

    const user = await axiosApi.post<User>("/users", formData);

    return user.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const login = createAsyncThunk<
  User,
  LoginMutation,
  { rejectValue: GlobalError }
>("users/login", async (loginMutation, { rejectWithValue }) => {
  try {
    const { data: user } = await axiosApi.post<User>(
      "/users/sessions",
      loginMutation
    );
    return user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  "users/logout",
  async (_, { getState, dispatch }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete("/users/sessions", {
      headers: { Authorization: "Bearer " + token },
    });
    dispatch(unsetUser());
  }
);
export const googleLogin = createAsyncThunk<
  User,
  string,
  { rejectValue: GlobalError }
>("users/googleLogin", async (credential: string, { rejectWithValue }) => {
  try {
    const { data: user } = await axiosApi.post<User>("users/google", {
      credential,
    });
    return user;
  } catch (error) {
    if (
      isAxiosError<GlobalError>(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});
