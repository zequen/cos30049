import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./App";

// get root element from html and create react root
const root = ReactDOM.createRoot(document.getElementById("root"));
// render app component with strict mode for development warnings
root.render(
    <React.StrictMode>
        <MainApp />
    </React.StrictMode>
);