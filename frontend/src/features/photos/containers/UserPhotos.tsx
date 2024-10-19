import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { NavLink, useParams } from "react-router-dom";
import { fetchPhotosByUser } from "../photosThunk";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { selectPhotos, selectPhotosLoading } from "../photosSlice";
import Preloader from "../../../UI/Preloader/Preloader";
import PhotoItem from "../components/PhotoItem";
import { selectUser } from "../../users/usersSlice";

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});


const UserPhotos = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const loading = useSelector(selectPhotosLoading);
  const photos = useSelector(selectPhotos);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchPhotosByUser(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: "15px",
            color: "blue",
          }}
        >
          Галерея пользователя {photos[0]?.user.displayName || ""}
        </Typography>
        {user?._id === id ? (
          <Button variant="contained">
            <Link to={"/create"}>Загрузить изображение</Link>
          </Button>
        ) : (
          ""
        )}
      </Box>
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
