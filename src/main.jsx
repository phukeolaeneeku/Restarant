import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { TableStatusProvider } from "./owner/counter/TableStatusContext.jsx"; // Import context provider



ReactDOM.createRoot(document.getElementById("root")).render(
  <TableStatusProvider>
    <App />
  </TableStatusProvider>,
);
