import { createSlice } from "@reduxjs/toolkit";
import { Photo } from "../../type";
import { fetchPhotos } from "./photosThunk";

export interface PhotoState {
  photos: Photo[];
  singlePhoto: Photo | null;
  fetchLoading: boolean;
}

const initialState: PhotoState = {
  photos: [],
  singlePhoto: null,
  fetchLoading: false,
};

export const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload: photos }) => {
        state.fetchLoading = false;
        state.photos = photos;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
  selectors: {
    selectPhotos: (state) => state.photos,
    selectSinglePhoto: (state) => state.singlePhoto,
    selectPhotosLoading: (state) => state.fetchLoading,
  },
});

export const photosReducer = photoSlice.reducer;

export const { selectPhotos, selectSinglePhoto, selectPhotosLoading } =
  photoSlice.selectors;
