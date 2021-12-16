import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import BuildIcon from "@mui/icons-material/Build";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import Context from '../Context';
import { Link } from "react-router-dom";


import {
  AppBar,
  Button,
  InputBase,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { alpha } from "@material-ui/core";
import Search from "@mui/icons-material/Search";
import { borderRadius, color } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  menu: {},
  menuItem: {},
  toolbar: {
    display: "flex",
    justifyContent: "space-between ",
  },
  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    width: "300px",
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "& :hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
}));

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    oauth, setOauth,
     } = useContext(Context)
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.logoLg}>
          Wazup Chat
        </Typography>
        
        {/* <Typography> 
        {
        oauth ?
          <span>
            {oauth.email}
          </span>
        :
          <span>new user</span>
      }
        </Typography> */}


       
        <Typography variant="h6" className={classes.logoSm}>
          Wazup
        </Typography>
        <div className={classes.search}>
          <Search />
          <InputBase placeholder="Search..." />
        </div>
        <Button
          id="MoreVertButton"
          onClick={handleClick}
          style={{ color: "white" }}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          className={classes.menu}
          id="MoreVertMenu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={onClickLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
