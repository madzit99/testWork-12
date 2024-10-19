import React from "react";
import { Photo } from "../../../type";
import { Box, CardMedia, Grid, Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { API_URL } from "../../../constants";

interface Props {
    photo: Photo
}

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const PhotoItem: React.FC<Props> = ({photo}) => {
      let cardImage = API_URL + "/" + photo.photo;
  return (
    <Grid item lg={3}>
      <Link to={`/photos/${photo._id}`}>
        <Box sx={{ border: "none", mb: "40px" }}>
          <CardMedia
            component="img"
            height="360"
            image={cardImage}
            sx={{
              bgcolor: "#fff",
              boxShadow: "4px 9px 13px -4px rgba(0,0,0,0.31)",
            }}
          />
          <Typography
            variant="h4"
            component="div"
            sx={{ textDecoration: "none", mt: "10px", textAlign: "center" }}
          >
            {photo.title}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ textDecoration: "none", mt: "10px", textAlign: "center" }}
          >
            Автор: {photo.user.displayName}
          </Typography>
        </Box>
      </Link>
    </Grid>
  );
};

export default PhotoItem;