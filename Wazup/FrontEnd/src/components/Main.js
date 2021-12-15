import { Button, makeStyles } from "@material-ui/core";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import * as React from "react";
import { Navbar } from "./Navbar";
import { Leftbar } from "./Leftbar";
import { Grid } from "@mui/material";
import { Messages } from "./Messages";

const useStyles = makeStyles((theme) => ({
    container: {
      height: "100vh",
    },
  }));
  

export const Main = () => {

    const classes = useStyles();

    return (
        <div>
        <Navbar />
      <Grid container className={classes.container}>
        <Grid item xs={2}>
          <Leftbar />
        </Grid>
        <Grid
          item
          xs={10}
          style={{
            backgroundColor: "white",
            borderLeft: "solid 1px",
            borderLeftColor: "#dbd9d9",
          }}
        >
          <Messages /> 
        </Grid>
        {/* <Grid item sm={3}></Grid> */}
      </Grid>


            
        </div>
    )
}
