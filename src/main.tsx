import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const handleGitHubPagesRedirect = () => {
  const path = window.location.search.slice(1); 
  if (path && path.startsWith('/')) {
    window.history.replaceState(null, '', path);
  }
};

handleGitHubPagesRedirect();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
