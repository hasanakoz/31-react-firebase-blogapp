import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import logo2 from "../assets/logo2.jpg";
import { AuthContext } from "../context/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../utils/firebaseConfig";
import { useContext } from "react";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logOut();
  };

  const handleDashboard = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDashboard}
          >
            <img
              src={logo2}
              alt="logo"
              style={{ width: "80px", opacity: "0.9", borderRadius: "10px" }}
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {"<HASAN /> BLOG"}
          </Typography>
          <div>
            <div sx={{ display: "flex" }}>
              {currentUser && (
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {currentUser.displayName}
                </Typography>
              )}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>

            {currentUser ? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/profile">
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>

                <Link to="/new-blog">
                  <MenuItem onClick={handleClose}>New Blog</MenuItem>
                </Link>

                <Link to="/login">
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Link>
              </Menu>
            ) : (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/login">
                  <MenuItem onClick={handleClose}>Login</MenuItem>
                </Link>

                <Link to="/register">
                  <MenuItem onClick={handleClose}>Register</MenuItem>
                </Link>
              </Menu>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
