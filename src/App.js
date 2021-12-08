import "./App.css";
import "./styles/output.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AllProduct from "./pages/AllProduct";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";
import { useState, useEffect } from "react";
import FormLogin from "./components/FormLogin.js";
import UserManage from "./pages/UsersManage.js";
import PrivateRoute from "./components/PrivateRoute";
import Axios from "axios";
import Sidebar from "./components/Sidebar";
import FormAddProduct from "./pages/FormAddProduct";
import FormEditProduct from "./pages/FormEditProduct";
import ProductDetail from "./pages/ProductDetail";
const App = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role , setRole] = useState("");
  const [showSidebar, setShowSidebar] = useState("-translate-x-full");
  const logOut = () => {
    if (window.confirm("Do you want to logout?") === true) {
      Axios.get(`${process.env.REACT_APP_API_URL}/api/users/logout`);
      localStorage.removeItem("isLoggedIn")
      window.location = "/login";
    }
  };
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/users/username`)
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
      });
      Axios.get(`${process.env.REACT_APP_API_URL}/api/users/role`)
      .then((response) => {
        setRole(response.data.role);
      })
      .catch((error) => {
      });
      Axios.get(`${process.env.REACT_APP_API_URL}/api/users/isLoggedIn`)
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
        localStorage.setItem("isLoggedIn", response.data.isLoggedIn)
      })
      .catch((error) => {

      });
  }, [username]);
  
  return (
    <div className="App w-screen h-screen overflow-x-hidden">
      <Router>
        <Header
          username={username}
          setShowSidebar={setShowSidebar}
          logOut={logOut}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
          isLoggedIn={isLoggedIn}
        />
        <Navbar 
        role={role}
        />
        <Sidebar
          username={username}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          logOut={logOut}
          role={role}
          isLoggedIn={isLoggedIn}
        />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route
            path="/products"
            component={() => <AllProduct searchInput={searchInput}/>}
            exact
          />
          <Route path="/login" component={FormLogin} exact/>
          <PrivateRoute
            path="/users"
            component={() => <UserManage setUsername={setUsername} />}
            exact
          />
          <PrivateRoute path="/addProduct" 
            component={FormAddProduct} 
            exact
          />
          <Route
            path="/products/productDetail/:productId"
            component={() => <ProductDetail />}
            isLoggedIn={isLoggedIn}
            exact
          />
          <PrivateRoute
            path="/products/productDetail/:productId/editProduct"
            component={() => <FormEditProduct />}
            exact
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
