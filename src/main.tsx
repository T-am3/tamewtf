import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Handle GitHub Pages SPA redirects
// The 404.html file redirects to /?/path, so we need to restore the original path
const handleGitHubPagesRedirect = () => {
  const path = window.location.search.slice(1); // Remove the leading '?'
  if (path && path.startsWith('/')) {
    // Replace the current URL with the original path
    window.history.replaceState(null, '', path);
  }
};

// Call the redirect handler before rendering
handleGitHubPagesRedirect();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
