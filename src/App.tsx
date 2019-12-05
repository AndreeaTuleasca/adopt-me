import "@babel/polyfill";
import React, { useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import { Provider } from "react-redux";
// import ThemeContext from "./ThemeContext";
import NavBar from "./NavBar";
import store from "./store";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  const themeHook = useState("darkblue");
  return (
    // <ThemeContext.Provider value={themeHook}>
    <Provider store={store}>
      <div>
        <NavBar />
        <Suspense fallback={<h1>loading ... </h1>}>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </Suspense>
      </div>
    </Provider>
    // </ThemeContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
