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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { alpha } from "@material-ui/core";
import Search from "@mui/icons-material/Search";
import { borderRadius, color, flexbox, rgbToHex } from "@mui/system";
import { Container, Grid } from "@mui/material";
import { ClassNames } from "@emotion/react";
import axios from "axios";
import { useContext, useRef, useEffect} from "react";
import Context from "../Context";

const useStyles = makeStyles((theme) => ({
  // textBar: {

  // },
  message: {
    paddingTop: theme.spacing(8),
    paddingLeft: (props) => (props.own ? theme.spacing(8) : theme.spacing(150)),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: (props) =>
        props.own ? theme.spacing(60) : theme.spacing(8),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: (props) =>
        props.own ? theme.spacing(25) : theme.spacing(8),
    },

    
  },

  menu: {},

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
    backgroundColor: (props) => (props.own ? "#1877f2" :  "rgb(245,245,241)"),
    color: (props) => (props.own ? "white": "black" ),
    maxWidth: "400px",
  },

  messageBottom: {
    fontSize: "12px",
  },
}));

export const Message = (props) => {
  const classes = useStyles(props);

  // BESOIN pour suppr le message 
  const {
    messages, setMessages, users, setUsers, oauth , 
  } = useContext(Context)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  var  currentUserId
  
  const getCurrentUserId = ()=>{
  const currentEmail = oauth.email /// chamyanis
  users.map((user)=>{
    if(user.email === currentEmail )
       currentUserId = user.id 
      })
   }  

getCurrentUserId()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /// A FINIR DE CODER ///////////
  useEffect( () => {
    const fetch = async () => {
      try{
     
          const {data: res_messages} = await axios.get(`http://localhost:3001/channels/${props.message.channelId}/messages/`)
          //console.log(res_messages)
          setMessages(res_messages) // Rempli messages du useContext !!!!

        }catch(err){

      }
    }
    fetch()

    
  }, []) // [ ] ???? pour les console.log dans le handleClose ca change des trucs

  const handleClose = async (event) => {

    /// -------------- A  FINIR DE CODER DELETE -------------------------------
    if (event.currentTarget.getAttribute('name') === 'delete'){
      console.log("In delete");
      //console.log(props.message)
      await axios.delete(`http://localhost:3001/channels/${props.message.channelId}/messages/${props.message.creation}`)
      const filteredMessages = messages.filter(message => message.creation !== props.message.creation)
      if (messages) console.log(messages)
      setMessages(filteredMessages)
      if (messages) console.log(messages)
      
      //console.log(filteredMessages)
      //setMessages(filteredMessages)
    }

    /// -------------- A  FINIR DE CODER MODIFIER -------------------------------
    if(event.currentTarget!== null)
    {
      
    if (event.currentTarget.getAttribute('name') === 'modify'){
      console.log("In modify");
      // CA MODIFIE BIEN LES MESSAGES !!! ALORS PQ CA NE CHANGE PAS A l'écran
      // --> CA change dans messages mais pas sur l'interface en temps réel !!! (socket comme eliott ??)
      await axios.put(`http://localhost:3001/channels/${props.message.channelId}/messages/${props.message.creation}`,{author : currentUserId, content : "non"})


      props.message.content = "noooo"
      if (messages) console.log(messages)
      setMessages(messages)
      if (messages) console.log(messages)
    }
  }

    setAnchorEl(null);
  };

  return (
    <div className={classes.message}>
      <div className={classes.messageTop}>
        {
          props.own === true ?( 
            <>
              <Button id="MoreVertButton" style={{ color: "black" }} onClick={handleClick} >
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
                  <MenuItem className={classes.menuItem} name='delete' onClick={handleClose}>
                    delete message
                  </MenuItem>
            
                  <MenuItem name='modify' onClick={handleClose}>modify message</MenuItem>
              </Menu>
              <p className={classes.messageText}>
                {
                  props.text
                }
              </p>
            </>
             ) 
             :
            (<>
                <p className={classes.messageText}>
                  {
                    props.text
                  }
                </p>
                
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
                  <MenuItem className={classes.menuItem} name='delete' onClick={handleClose}>
                    delete message
                  </MenuItem>
            
                  <MenuItem name='modify' onClick={handleClose}>modify message</MenuItem>
                </Menu>
            </>
            )
        }
      </div>
      {/* <div className={classes.messageBottom}>1 hour ago</div> */}
    </div>
  );
};
