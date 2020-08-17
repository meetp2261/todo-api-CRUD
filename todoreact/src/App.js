import React from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Todo from "./Todo";
import Reg from "./Reg";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Reg" component={Reg} />
        <Route exact path="/todo" component={Todo} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
