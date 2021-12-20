import React from "react";
/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import crypto from 'crypto'
import qs from 'qs'
import axios from 'axios'
// Layout
import { useTheme } from '@mui/styles';
// Local
import Context from '../Context'
import {
  useNavigate
} from "react-router-dom";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


const base64URLEncode = (str) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const sha256 = (buffer) => {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest()
}


const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(.5),
        display: 'block',
      },
    },
  },

  welcome :{
    backgrounColor:"red"
  }
})

const Redirect = ({
  config,
  codeVerifier,
}) => {
  const styles = useStyles(useTheme())
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 400,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const handleClickSignUp = () => {
    window.location = "/Signup";
  };
  const redirect = (e) => {
    e.stopPropagation()
    const code_challenge = base64URLEncode(sha256(codeVerifier))
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`,
    ].join('')
    window.location = url
  }
  return (
    <div >

      <Grid>
       <Paper elevation={10} style={paperStyle}>
         <Grid align="center">
           <Avatar style={avatarStyle}>
             <LockOutlinedIcon />
           </Avatar>
           <h2>Sign In</h2>
        </Grid>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{position:"absolute", left :"50%", transform : "translate(-50%, -50%)",top :"50%",width:"300px",height:"60px"}}
          onClick={redirect}
        >
          <label style={{fontSize:"18px"}}>Sign in with...</label>
        </Button>
         <TextField style={{position:"relative", top:"5%"}}
         label="Username"
           placeholder="Enter username"
           fullWidth
           required
         />
         <TextField style={{position:"relative", top:"10%"}}
           label="Password"
           placeholder="Enter password"
           type="password"
          fullWidth
           required
         /> *
         <FormControlLabel style={{position:"absolute", top:"28%"}}
           control={<Checkbox name="checkedB" color="primary" />}
           label="Remember me"
         />
         <Typography style={{position:"absolute", top:"32%"}}>
           <Link >Forgot password ?</Link>
         </Typography>
         <Typography>
           {" "}
           <Button
             onClick={handleClickSignUp}
             style={{
              backgroundColor: "#C8C8C8",
               position:"absolute", left :"50%", transform : "translate(-50%, -50%)",top :"60%",width:"300px",height:"60px"
             }}
           >
             
             <label style={{fontSize:"18px"}}>Sign up</label>
             </Button>

    </Typography>      

        </Paper>

      </Grid>
       
    </div>
  )
}

const Tokens = ({
  oauth
}) => {
  const {setOauth} = useContext(Context)
  const styles = useStyles(useTheme())
  const {id_token} = oauth
  const id_payload = id_token.split('.')[1]
  const {email} = JSON.parse(atob(id_payload))
  const logout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <div css={styles.welcome}>
   <Link onClick={logout} color="secondary">logout</Link>
    </div>
  )
}

const LoadToken = ({
  code,
  codeVerifier,
  config,
  removeCookie,
  oauth,
  setOauth
}) => {
  const styles = useStyles(useTheme())
  const navigate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try {
        const {data} = await axios.post(
          config.token_endpoint
        , qs.stringify ({
          grant_type: 'authorization_code',
          client_id: `${config.client_id}`,
          code_verifier: `${codeVerifier}`, 
          redirect_uri: `${config.redirect_uri}`,
          code: `${code}`,
        }))
        removeCookie('code_verifier')
        setOauth(data)
        const  users = await axios.get('http://localhost:3001/users')   
        var isHere = false
        users.data.map(async(user)=>{
          if(data.email === user.email )
          {
            isHere = true   
            
          }            
      })

            if(!isHere)
            {
              await axios.post('http://localhost:3001/users',{username : data.username, email: data.email})

            }
      
        navigate('/')
      }catch (err) {
        console.error(err)
      }
    }      
    
    fetch()
  })
  return (
    <div css={styles.root}>Loading tokens</div>
  )
}

const Login = ({
  onUser
}) => {
  const styles = useStyles(useTheme());
  
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const {oauth, setOauth} = useContext(Context)
  const config = {
    authorization_endpoint: 'http://localhost:5556/dex/auth',
    token_endpoint: 'http://localhost:5556/dex/token',
    client_id: 'webtech-frontend',
    redirect_uri: 'http://localhost:3000',
    scope: 'openid%20profile%20email%20offline_access',   
  }

  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  
    if(!code){ // no: we are not being redirected from an oauth server
      if(!oauth){
        const codeVerifier = base64URLEncode(crypto.randomBytes(32))
        console.log('set code_verifier', codeVerifier)
        setCookie('code_verifier', codeVerifier)
        return (
          <Redirect codeVerifier={codeVerifier} config={config} css={styles.root} />
        )
      }else{ // yes: user is already logged in, great, is is working
        return (
          <Tokens oauth={oauth} css={styles.root} />
        )
      }
    }else{ // yes: we are coming from an oauth server
  
      return (
        <LoadToken
          code={code}
          codeVerifier={cookies.code_verifier}
          config={config}
          setOauth={setOauth}
          removeCookie={removeCookie} />
      )
    }
  
};

export default Login;
