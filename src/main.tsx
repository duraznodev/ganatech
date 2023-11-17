import ReactDOM from "react-dom/client";
import Router from "./Router";
import { GlobalProvider } from "./contexts/GlobalContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <GlobalProvider>
    <Router />
  </GlobalProvider>,
  // </React.StrictMode>
);
