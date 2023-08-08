import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material";
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
