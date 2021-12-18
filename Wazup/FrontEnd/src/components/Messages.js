import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import BuildIcon from "@mui/icons-material/Build";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

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
import { borderRadius, color, flexbox } from "@mui/system";
import { Container, Grid } from "@mui/material";
import { ClassNames } from "@emotion/react";
import Send from "@mui/icons-material/Send";
import { Message } from "./Message";
const useStyles = makeStyles((theme) => ({
  // textBar: {

  // },
  message: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(8),
  },
  box: {
    textAlign: "center",
    alignItems: "center",
  },

  wrapMessage: {
    height: "84vh",
    overflowY: "scroll",
    marginTop:'130px'
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
    backgroundColor: "#1877f2",
    color: "white",
    maxWidth: "300px",
  },

  messageBottom: {
    fontSize: "12px",
  },
}));

export const Messages = () => {
  const classes = useStyles();
  return (
    // <div className={classes.textBar}>
    //   <InputBase placeholder=" Aa" />
    //   <Button className={classes.sendIcon}>
    //     <Send />
    //   </Button>
    // </div>


    <div className={classes.wrapall}>
      <div className={classes.wrapMessage}>       
        {/* <div className={classes.message}>
          <div className={classes.messageTop}>
            <p className={classes.messageText}>
              Hello this is a messageHello this is a message Hello this is a
              messageHello this is a message Hello this is a message Hello this
              is a message Hello this is a message Hello this is a message Hello
              tthis is a message Hello this is a message Hello this is a message
            </p>
          </div>
          <div className={classes.messageBottom}>1 hour ago</div>
        </div> */}
        <Message />
        <Message own={true} />
        <Message />
        <Message own={true} />
        <Message />
        <Message />
        <Message />
        <Message />

      </div>
      <div className={classes.box}>
        {/* <TextField variant="outlined" label="Messsage"></TextField> */}
        <InputBase placeholder=" Aa" className={classes.input} />
        <Button className={classes.sendIcon}>
          <Send />
        </Button>
      </div>
    </div>
  );
};
