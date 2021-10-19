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
const App = () => {
  const [username, setUsername] = useState("");
  const [showSidebar, setShowSidebar] = useState("-translate-x-full");
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/users/login`)
      .then((response) => {
        setUsername(response.data.user);
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
          setShowSidebar={setShowSidebar}>
        </Header>
        <Navbar/>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/brands" component={Brands} />
          <Route path="/login" component={() => <FormLogin />} />
          <PrivateRoute
            path="/users"
            component={() => <UserManage setUsername={setUsername} />}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
