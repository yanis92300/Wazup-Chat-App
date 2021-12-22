import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/styles";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Provider as ContextProvider } from './Context';
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <CookiesProvider>
    <ThemeProvider theme={theme}>
      <Router>
      <App />
      </Router>
    </ThemeProvider>
    </CookiesProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();