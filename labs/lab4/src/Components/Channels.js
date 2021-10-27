import './Channels.css'
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import { red } from "@mui/material/colors";
/** @jsxImportSource @emotion/react */
import {useState, useEffect} from 'react';
import { color } from '@mui/system';
// Layout
const drawerWidth = 200;


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: { 
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },


  drawerPaper: {
    width: drawerWidth,

  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
    
  }
}));

export const Channels = () => {
    
 

    return (
        <div className='channels'>
            <label className='label_channel'>Channels</label>
            <Divider  style={{backgroundColor: '#5a5857'}} /> 
            <List>
              <ListItem style={{ border: "solid 1px transparent",borderBlock:"2"}}> Channel 1 </ListItem>
              <ListItem style={{textAlign:"right"}}> Channel 2</ListItem>

            </List>
           
        </div>
    )
}
