import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import BuildIcon from "@mui/icons-material/Build";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useContext, useRef} from "react";
import Context from "../Context";
import { Checkbox } from "@material-ui/core";
import { useNavigate , useParams} from "react-router";
import axios from "axios";
import { useEffect } from "react";

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
import { borderLeft, borderRadius, color, flexbox } from "@mui/system";
import { Container, Divider, Grid } from "@mui/material";
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
    marginTop:'130px',

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

  toolbar :{
    position:"fixed",
    top:50,
    width:'80%',
    display: "flex",
    justifyContent: "space-between ",
    color: "#7943FF",
    backgroundImage: "linear-gradient(to right, rgba(0,224, 255, 1), rgba(0, 133, 255, 1))",
    paddingTop: "1px"
  },



  channelInfo:{

    margin:'0 auto  '

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
  const navigate = useNavigate()
  const classes = useStyles();
  const listRef = useRef()
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickToolbar= (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleCloseToolbar = () => {
    setAnchorEl(null);
  };

  const { id } = useParams()
  const {
    oauth,
    channels, setChannels,
    users, setUsers,
    currentChannel, setCurrentChannel,
    messages, setMessages,
    content, setContent 
  } = useContext(Context)
  
  var currentChannelId 

  var  currentUserId
  
  const getCurrentUserId = ()=>{
  const currentEmail = oauth.email /// chamyanis
  users.map((user)=>{
    if(user.email === currentEmail )
       currentUserId = user.id 
      })
   }  

getCurrentUserId()



const handleChange = (event)=>{
setContent(event.target.value)

}
const handleModifyChannel =()=> {

  <InputBase placeholder=" Aa"   className={classes.menuChannelInfo} />




}

  useEffect( () => {
    const fetch = async () => {
      try{
        if(currentChannel)
    {
      currentChannelId = currentChannel.id
    }
        if(currentChannel)
        {
          const {data: res_messages} = await axios.get(`http://localhost:3001/channels/${currentChannelId}/messages`)
          setMessages(res_messages)

        }
        
      }catch(err){

      }
    }
    fetch()

    
  }, [ oauth, navigate,currentChannel]) // RAJOUTER DU CODE ICI ???? genre messages ? 

  const handleClick = async ()=>{


if(currentChannel)
{
 const  {data : message} =   await axios.post(`http://localhost:3001/channels/${currentChannel.id}/messages`,{author : currentUserId , content : content })
  setMessages([...messages, message])
    setContent("")
    console.log(message);
    
}
         
    }  

  return (
<div>
    <div className={classes.wrapall}>
     <Toolbar color="blue" className={classes.toolbar}>

       <Typography> 
        { 
        oauth && !currentChannel ?
          <span>
            {oauth.username}
          </span>
        :
        <></>
        
        }
        </Typography>

               <Typography variant="h6" className={classes.channelInfo}>
               { currentChannel ?  currentChannel.name : " "}       
               </Typography>
               <Button
          id="MoreVertButton"
          onClick={handleClickToolbar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        </Button>
        <Menu
         // className={classes.menu}
          id="MoreVertMenu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseToolbar}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem className={classes.menuItem} onClick={handleModifyChannel}>
            Modify channel Name
          </MenuItem>
     
          <MenuItem >Add Member</MenuItem>
        </Menu>





              </Toolbar>
    

      <div className={classes.wrapMessage}>       
        
       {
         messages.map((message)=>{
          //  console.log(message.author);
          //  console.log(currentUserId);
          if(message.author=== currentUserId)
          {
            return(
              <div>
              <Message  own={true} message={message}  text={message.content}/>
              
              </div>
              
            )            
          }
          else
          {
            return(

              <div>

              <Message  own={false} message={message}  text={message.content} />
             
              </div>
            )

          }

         })

       }
        
      </div>
      <div className={classes.box}>
        {/* <TextField variant="outlined" label="Messsage"></TextField> */}
        <InputBase placeholder=" Aa" className={classes.input}  value = {content}onChange={handleChange} />
        <Button className={classes.sendIcon}  onClick={handleClick}  >
          <Send />
        </Button>
      </div>
    </div>
    </div>
  );
};
