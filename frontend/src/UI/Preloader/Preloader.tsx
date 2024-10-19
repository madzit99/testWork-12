import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";

interface Props {
  loading: boolean;
}

const Preloader: React.FC<Props> = ({ loading }) => {
  return (
    <Backdrop open={loading} style={{ zIndex: 9999 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Preloader;
