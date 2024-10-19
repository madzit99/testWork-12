import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { selectUser } from "../../users/usersSlice";
import { fetchPhotos } from "../photosThunk";
import { useSelector } from "react-redux";
import { selectPhotos, selectPhotosLoading } from "../photosSlice";
import { Grid, Typography } from "@mui/material";
import Preloader from "../../../UI/Preloader/Preloader";
import PhotoItem from "../components/PhotoItem";

const Photos = () => {
  const dispatch = useAppDispatch();
  const photos = useSelector(selectPhotos);
  const user = useSelector(selectUser);
  const loading = useSelector(selectPhotosLoading);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: "15px",
          color: "blue",
        }}
      >
        Галерея
      </Typography>
      {loading ? (
        <Preloader loading={loading} />
      ) : photos.length > 0 ? (
        <Grid container spacing={4} alignItems="center">
          {photos.map((photo) => (
              <PhotoItem key={photo._id} photo={photo} />
          ))}
        </Grid>
      ) : (
        <Typography variant="h3" sx={{ textAlign: "center", color: "blue" }}>
          Фотографий пока нет!
        </Typography>
      )}
    </>
  );
};

export default Photos;
