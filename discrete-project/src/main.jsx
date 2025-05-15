import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router";
//added based on GPT due to routing issues
// import { BrowserRouter as Router } from "react-router-dom";


createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
