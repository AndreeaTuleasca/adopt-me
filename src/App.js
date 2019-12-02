import "babel-polyfill";
import React, { useState } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";
import NavBar from './NavBar';

const App = () => {
  const themeHook = useState("darkblue");
  return (
      <ThemeContext.Provider value={themeHook}>
        <div>
            <NavBar/>
          <Router>
            <SearchParams path="/"></SearchParams>
            <Details path="/details/:id"></Details>
          </Router>
        </div>
      </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
