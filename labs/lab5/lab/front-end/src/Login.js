
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
})

export default function Login({
  onUser
}) {
  const styles = useStyles(useTheme())
  return (
    <div css={styles.root}>
      <div>
        <fieldset>
           <TextField  id="username" label="Username" variant="standard" />
          
        </fieldset>
        <fieldset>
         <TextField id="passsword" id="password" label="Password" variant="standard" />

        </fieldset>
        <fieldset>
          <Button variant="contained" style={{backgroundColor: '#12824C', color: '#FFFFFF'}} onClick={ (e) => {
            e.stopPropagation()
            onUser({username: 'david'})
          }}>Login</Button>
        </fieldset>
      </div>
    </div>
  );
}
