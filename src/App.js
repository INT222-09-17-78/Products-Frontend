import "./App.css";
import "./styles/output.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Brands from "./pages/Brands";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";
import { useState, useEffect} from "react";
import FormLogin from "./components/FormLogin.js";
import UserManage from "./pages/UsersManage.js";
import PrivateRoute from "./components/PrivateRoute";
import Axios from "axios";
import Sidebar from "./components/Sidebar";
import FormAddProduct from "./components/FormAddProduct";
const App = () => {
  const [username, setUsername] = useState("");
  const [showSidebar, setShowSidebar] = useState("-translate-x-full");
  const logOut = () => {
    if (window.confirm("Do you want to logout?") === true) {
      Axios.get(`${process.env.REACT_APP_API_URL}/api/users/logout`);
      localStorage.removeItem("isLoggedIn");
      window.location = "/login";
    }
  };
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/users/login`)
      .then((response) => {
        setUsername(response.data.user);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("isLoggedIn");
        }else{
          console.log(error)
        }
      });
  }, []);
  return (
    <div className="App w-screen h-screen overflow-x-hidden">
      <Router>
        <Header
          username={username}
          setShowSidebar={setShowSidebar} 
          logOut={logOut}>
        </Header>
        <Navbar/>
        <Sidebar username={username} showSidebar={showSidebar} setShowSidebar={setShowSidebar} logOut={logOut}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/brands" component={Brands} />
          <Route path="/login" component={() => <FormLogin />} />
          <PrivateRoute
            path="/users"
            component={() => <UserManage setUsername={setUsername} />}
          />
          <Route path="/products" component={() => <FormAddProduct />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
