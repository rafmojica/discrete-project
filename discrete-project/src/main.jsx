import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router";
//added from GPT to resolve npm vite issue
// import { BrowserRouter as Router } from "react-router-dom";


createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
