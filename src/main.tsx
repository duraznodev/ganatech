import ReactDOM from "react-dom/client";
import Router from "./Router";
import { GlobalProvider } from "./contexts/GlobalContext";

import "./index.css";

// async function init() {
// const resp = await signIn("romaneduardorm@gmail.com", "durazno");
// console.log(resp);
//   seeder();
// }

// init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <GlobalProvider>
    <Router />
  </GlobalProvider>
  // </React.StrictMode>
);
