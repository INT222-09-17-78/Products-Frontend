import "./App.css";
import "./styles/output.css";
import Home from "./pages/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Brands from "./pages/brands";
import Header from "./components/header.js";
import Navbar from "./components/navbar.js";
import { useState, useEffect } from "react";
import Axios from "axios";
const App = () => {
  console.log("App render")
  const [usernameInSession, setUsernameInSession] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    console.log("Home UseEffect")
    Axios.get("http://localhost:5000/api/login").then((response) => {
      setUsernameInSession(response.data.user);
      setIsLogin(response.data.loggedIn);
    }).catch((error) => {
      if(!error.response)
      console.log(error.response)
    });
  }, []);
  return (
    <div className="App w-screen h-screen">
      <Router>
        <Header path="" usernameInSession={usernameInSession} isLogin={isLogin}/>
        <Navbar />
        <Switch>
          <Route path="/brands" component={Brands} />
          <Home/>
        </Switch>
      </Router>

      {/* <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router> */}
    </div>
  );
};

export default App;
