import React, { useState } from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/users/usersThunks";
import { User } from "../../type";
import { API_URL } from "../../constants";

interface Props {
  user: User;
}


const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        Привет, {user.displayName ? user.displayName : user.username}!
      </Button>

      <Avatar alt={user.displayName} src={`${API_URL}/${user.avatar}`} />

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
            Выход
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
