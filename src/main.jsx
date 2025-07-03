import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastWrapper } from "keep-react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ToastWrapper
      richColors={true}
      position="top-right"
      toastOptions={{
        classNames: {
          title: "text-body-3 font-medium",
          toast: "rounded-xl shadow-large",
          description: "text-body-4 font-normal",
        },
      }}
    />
  </BrowserRouter>
);
