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
import { useContext } from "react";
import Context from "../Context";
import { Checkbox } from "@material-ui/core";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";
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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex ",
    alignItems: "center",
    marginBottom: theme.spacing(5),
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
    
    padding: theme.spacing(2),
    fontWeight: "600",
    color: "#555",
    flexDirection: "column",
    margin : '0 auto'
    
  },

  header_text:{
    
    [theme.breakpoints.down("sm")]: {
      display:'none'
    },

   


  },

  avatar: {},
}));

export const Leftbar = () => {
  const classes = useStyles();
  const {
    oauth,
    channels, setChannels, users, setUsers, currentChannel, setCurrentChannel
  } = useContext(Context)
  const navigate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels')
        setChannels(channels)
        const {data : users } = await axios.get('http://localhost:3001/users')
        setUsers(users)
        removeCurrentUser()        
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setChannelUsers([])
  };

var  currentUserId
var currentUsername

const getCurrentUserId = ()=>{
const currentEmail = oauth.email /// chamyanis
users.map((user)=>{
  if(user.email === currentEmail )
     currentUserId = user.id 
     currentUsername = user.username
    })
 }       

var filteredUsers

const removeCurrentUser = ()=>{
  getCurrentUserId()
  filteredUsers = users.filter (user => user.id !== currentUserId)
}

removeCurrentUser()


  const handleAdd = async()=>{

    const channel_name = create_channel_name(channelUsers)

    await axios.post('http://localhost:3001/channels',{name : channel_name, users: channelUsers})

    setAnchorEl(null);
    setChannelUsers([])
  }


  const [channelUsers, setChannelUsers] = useState([])

  const handleChange = (event)=>{
    
    event.target.checked ===true ? setChannelUsers([...channelUsers,event.target.value]) : setChannelUsers(channelUsers.filter(channelUser => channelUser !== event.target.value))
  }

  const handleClickItem = (event)=>{
    setCurrentChannel(event.currentTarget.getAttribute('id'))
    // console.log(currentChannel);//object
  }

  const create_channel_name = (channelUsers)=>{

    var  channelName =""
    channelUsers.map((channelUser)=>{

      // console.log(channelUser);

      filteredUsers.map((filteredUser)=>{ /// on a un id du premlier user du channel on veut recuperer le nom de tous les persnne

        if(channelUser===filteredUser.id)
        {
          // console.log(filteredUser.username);
      
          channelName = channelName + ","+ filteredUser.username
         
        }

      })
 })

return  channelName


  }

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
        
        <Button className={classes.header} onClick={handleClick} > 
          <AddCircleSharp
            sx={{ height: "28px", width: "28px", paddingLeft: "3px" }}
          />

          <div  className={classes.header_text}>Discussions</div>
        </Button>

        <Menu     
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
         {

            filteredUsers.map((user)=>{
              return(
                <MenuItem>
                
                <FormControlLabel control={<Checkbox />} value ={user.id} label={user.username} onChange={handleChange}  />

              </MenuItem>
              )
            })

          }
          <MenuItem onClick={handleAdd}> 

          <label style={{margin:'0 auto'}}>ADD</label>

          </MenuItem>



          {/* <MenuItem className={classes.menuItem} onClick={handleClose}>
            Profile
          </MenuItem>
     
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem >Logout</MenuItem> */}
        </Menu>
        
        <List disablePadding>
          <Divider />

          {

            channels.map((channel)=>{

              return ( 
                <>
                      <ListItem>
                        <ListItemButton style={{ paddingBottom: "10px" }}  id = {channel.id} onClick={handleClickItem} >
                        <ListItemAvatar>
                        <Avatar
                  alt={channel.name.charAt(1)}
                  src="/static/images/avatar/2.jpg"
                  sx={{ height: "35px", width: "35px" }}
                        />
                        </ListItemAvatar>
                        <ListItemText
                className={classes.text}
                primary={channel.name}
                secondary="...."
              />
                        </ListItemButton>



                      </ListItem>   

                      
                      <Divider/>
                      </>

              )

            })
          }          
        </List>
      </nav>
    </Box>
  );
};
