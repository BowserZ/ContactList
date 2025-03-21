import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import Contact from "./Contact";
import { ContextWrapper } from "./Services/Context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextWrapper>
      <Contact />
    </ContextWrapper>
  </StrictMode>
);