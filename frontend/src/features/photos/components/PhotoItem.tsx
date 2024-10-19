import React, { useState } from "react";
import { Photo } from "../../../type";
import {
  Box,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { API_URL } from "../../../constants";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  photo: Photo;
}

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const PhotoItem: React.FC<Props> = ({ photo }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let cardImage = API_URL + "/" + photo.photo;
  return (
    <Grid item lg={3}>
      <Box sx={{ border: "none", mb: "40px" }}>
        <CardMedia
          component="img"
          height="360"
          image={cardImage}
          onClick={handleClickOpen}
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
          <Link to={`/photos/${photo.user._id}`}>
            Автор: {photo.user.displayName}
          </Link>
        </Typography>
      </Box>
      <Dialog onClose={handleClose} open={open} maxWidth="lg">
        <DialogTitle sx={{ m: 0, p: 2, pb: 1 }}>{photo.title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <img
            src={cardImage}
            alt={photo.title}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
            }}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default PhotoItem;
