import "./App.css";
import "./styles/output.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Brands from "./pages/Brands";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";
import { useState, useEffect } from "react";
import FormLogin from "./components/FormLogin.js";
import UserManage from "./pages/UsersManage.js";
import Axios from "axios";
const App = () => {
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:5000/api/users/login")
      .then((response) => {
        setUsername(response.data.user);
        setIsLogin(response.data.loggedIn);
      })
      .catch((error) => {
        if (!error.response || error.response.status === 401) {
          console.log(error.response);
        }
      });
  }, []);
  return (
    <div className="App w-screen h-screen overflow-x-hidden">
       <Router>
        <Header
          username={username}
          isLogin={isLogin}
        />
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/brands" component={Brands} />
          <Route path="/login" component={FormLogin} />
          <Route path="/users">
            <UserManage setUsername={setUsername}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
