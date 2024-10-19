import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Photo, PhotoMutation } from "../../type";
import { RootState } from "../../app/store";

export const fetchPhotos = createAsyncThunk<Photo[]>(
  "photos/fetchAll",
  async () => {
    const response = await axiosApi.get<Photo[]>("/photos");
    return response.data;
  }
);

export const fetchPhotosByUser = createAsyncThunk<Photo[], string>(
  "photos/fetchUserPhotos",
  async (userId) => {
    const response = await axiosApi.get<Photo[]>(
      `/photos?user=${userId}`
    );
    return response.data;
  }
);

export const createPhoto = createAsyncThunk<
  void,
  PhotoMutation,
  { state: RootState }
>("photos/create", async (photoMutation) => {
  try {
    const formData = new FormData();

    formData.append("title", photoMutation.title);
    if (photoMutation.photo) {
      formData.append("photo", photoMutation.photo);
    }

    await axiosApi.post("/photos", formData);
  } catch (e) {
    console.error(e);
  }
});
