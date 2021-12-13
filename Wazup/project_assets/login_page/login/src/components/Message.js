import React from "react";
import {
  AppBar,
  Button,
  InputBase,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { alpha } from "@material-ui/core";
import Search from "@mui/icons-material/Search";
import { borderRadius, color, flexbox, rgbToHex } from "@mui/system";
import { Container, Grid } from "@mui/material";
import { ClassNames } from "@emotion/react";

const useStyles = makeStyles((theme) => ({
  // textBar: {

  // },
  message: {
    paddingTop: theme.spacing(8),
    paddingLeft: (props) => (props.own ? theme.spacing(100) : theme.spacing(8)),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: (props) =>
        props.own ? theme.spacing(60) : theme.spacing(8),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: (props) =>
        props.own ? theme.spacing(25) : theme.spacing(8),
    },
  },

  box: {
    textAlign: "center",
    alignItems: "center",
  },

  wrapMessage: {
    height: "95vh",
    overflowY: "scroll",
  },

  wrapall: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    borderRadius: theme.shape.borderRadius,
    border: "solid 2px ",
    borderColor: alpha("#E8E8E8", 1),
    backgroundColor: alpha("#F2F3F5", 0.8),
    "& :hover": {
      backgroundColor: alpha("#F2F3F5", 2),
    },
    width: "700px",
    [theme.breakpoints.down("sm")]: {
      width: "280px",
    },
  },

  messageTop: {
    display: "flex",
  },

  messageText: {
    padding: "10px",
    borderRadius: "20px",
    backgroundColor: (props) => (props.own ? "rgb(245,245,241)" : "#1877f2"),
    color: (props) => (props.own ? "black" : "white"),
    maxWidth: "400px",
  },

  messageBottom: {
    fontSize: "12px",
  },
}));

export const Message = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.message}>
      <div className={classes.messageTop}>
        <p className={classes.messageText}>
          Hello this is a messageHello this is a message Hello this is a
          messageHello this is a message Hello this is a message Hello this is a
          m
        </p>
      </div>
      <div className={classes.messageBottom}>1 hour ago</div>
    </div>
  );
};
