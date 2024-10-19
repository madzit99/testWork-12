import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Photo } from "../../type";

export const fetchPhotos = createAsyncThunk<Photo[]>(
  "photos/fetchAll",
  async () => {
    const response = await axiosApi.get<Photo[]>("/photos");
    return response.data;
  }
);
