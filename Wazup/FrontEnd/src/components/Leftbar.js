import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

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
import {
  Container,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import Home from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inbox from "@mui/icons-material/Inbox";
import AddCircleSharp from "@mui/icons-material/AddCircleSharp";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex ",
    alignItems: "center",
    marginBottom: theme.spacing(5),
    //border: "solid",
  },
  text: {
    color: "#555",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  container: {
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(8),
    height: "84vh",
    borderRight: "1.5px solid #ece7e7",
  },
  accountIcon: {
    color: "#555",
  },

  header: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },

    padding: theme.spacing(1),
    fontWeight: "600",
    color: "#555",
    justifyContent: "left ",
    alignItems: "center",
    flexDirection: "column",
  },

  avatar: {},
}));

export const Leftbar = () => {
  const classes = useStyles();
  return (
    <Box
      className={classes.container}
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <nav>
        <div className={classes.header}>
          <AddCircleSharp
            sx={{ height: "28px", width: "28px", paddingLeft: "3px" }}
          />

          <div style={{}}>Discussions</div>
        </div>
        <List disablePadding>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton style={{ paddingBottom: "10px" }}>
              <ListItemAvatar>
                <Avatar
                  alt="Travis Howard"
                  src="/static/images/avatar/2.jpg"
                  sx={{ height: "35px", width: "35px" }}
                />
              </ListItemAvatar>
              <ListItemText
                className={classes.text}
                primary="Travis"
                secondary="Coucou bg "
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton style={{ paddingBottom: "10px" }}>
              <ListItemAvatar>
                <Avatar
                  alt="Cindy Baker"
                  src="/static/images/avatar/3.jpg"
                  sx={{ height: "35px", width: "35px" }}
                />
              </ListItemAvatar>
              <ListItemText
                className={classes.text}
                primary="Christian"
                secondary="Haha mdrrrr"
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton style={{ paddingBottom: "10px" }}>
              <ListItemAvatar>
                <Avatar
                  alt="Xravis Howard"
                  src="/static/images/avatar/2.jpg"
                  sx={{ height: "35px", width: "35px" }}
                />
              </ListItemAvatar>
              <ListItemText
                className={classes.text}
                primary="Xavier"
                secondary="Je sais pas :/"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
    </Box>
  );
};
