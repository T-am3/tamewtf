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

// Handle dynamic viewport height for mobile Safari
const setVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Set initial viewport height
setVH();

// Update viewport height on resize and orientation change
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', () => {
  // Small delay to ensure viewport has updated after orientation change
  setTimeout(setVH, 100);
});

// Call the redirect handler before rendering
handleGitHubPagesRedirect();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
