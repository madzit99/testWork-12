import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import { fetchPhotosByUser } from "../photosThunk";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectPhotos, selectPhotosLoading } from "../photosSlice";
import Preloader from "../../../UI/Preloader/Preloader";
import PhotoItem from "../components/PhotoItem";

const UserPhotos = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const loading = useSelector(selectPhotosLoading);
  const photos = useSelector(selectPhotos);

  useEffect(() => {
    if (id) {
      dispatch(fetchPhotosByUser(id));
    }
  }, [dispatch, id]);

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
        Галерея пользователя {photos[0]?.user.displayName || ""}
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

export default UserPhotos;
