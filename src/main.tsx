import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import "./index.css";



// async function init() {
// const resp = await signIn("romaneduardorm@gmail.com", "durazno");
// console.log(resp);
//   seeder();
// }

// init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
