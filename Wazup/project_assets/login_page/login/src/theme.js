import { createTheme } from "@mui/material/styles";
import { blue } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    secondary: {
      main: blue[50],
    },
  },
  myButton: {
    backgroundColor: "red",
    color: "white",
    border: "1px solid black  ",
  },
});
