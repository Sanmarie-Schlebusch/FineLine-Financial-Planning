import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle redirect from 404.html
const urlParams = new URLSearchParams(window.location.search);
const redirect = urlParams.get('redirect');
if (redirect) {
  // Remove the redirect parameter and navigate to the intended path
  const newUrl = window.location.pathname + redirect + window.location.hash;
  window.history.replaceState(null, '', newUrl);
}

createRoot(document.getElementById("root")!).render(<App />);
