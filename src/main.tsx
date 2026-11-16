import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { App } from "./App";
import { normalizePath } from "./config/pages";
import "./styles.css";

const element = document.getElementById("root");
if (element) {
  const page = <App route={normalizePath(window.location.pathname)} />;
  if (element.hasChildNodes()) hydrateRoot(element, page);
  else createRoot(element).render(page);
}
