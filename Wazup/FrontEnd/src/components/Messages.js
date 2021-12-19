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
  const { id } = useParams()
  const {
    oauth,
    channels, setChannels, users, setUsers, currentChannel, setCurrentChannel
  } = useContext(Context)
  const [messages, setMessages] = useState([])
  const [content , setContent] = useState("")
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


  // const addMessage = (message) => {
  //   setMessages([...messages, message])
  // }
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

    
  }, [ oauth, navigate,currentChannel])

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
    <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.channelInfo}>
               channelName 
        </Typography>
        <Divider></Divider>

  </Toolbar>

      <div className={classes.wrapMessage}>       
        
       {
         messages.map((message)=>{
          //  console.log(message.author);
          //  console.log(currentUserId);
          if(message.author=== currentUserId)
          {
            return(
              <Message  own ={true} text = {message.content}/>
            )            
          }
          else
          {
            return(

              <Message  own ={false}   text = {message.content} />
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
