import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGOLE_CLIENT_ID } from "./constants.ts";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import { addInterceptors } from "./axiosApi.ts";

addInterceptors(store);

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGOLE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
