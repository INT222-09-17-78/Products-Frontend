import "./App.css";
import "./styles/output.css";
import BaseLogin from "./components/baselogin.js";
import Logo from "./components/logo";
import Home from "./pages/home";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () =>{
  return (
    <div className="App w-screen h-screen">
      <Home />
      <Router>
        <Switch>
             <Route path="/login" component={BaseLogin}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;

