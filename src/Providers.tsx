import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "react-jss";

import SocketProvider from "../src/providers/SocketProvider";
import theme from "./config/theme";

import { store } from "./store/store";
import App from "./App";

import "./index.css";

const container = document.getElementById("app")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <SocketProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </SocketProvider>
  </Provider>
);
