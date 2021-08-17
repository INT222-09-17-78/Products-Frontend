import Logo from "../components/logo.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BaseLogin from "../components/baselogin.js";
const Home = () => {
  const Header = () => {
    const Search = () => {
      return (
        <div className="Search flex items-center text-sm">
          <i className="material-icons absolute pl-2 text-gray-400 text-base">
            search
          </i>
          <input
            type="text"
            placeholder="ค้นหาสินค้า"
            className="bg-transparent w-52 h-8 pl-7 border-2 border-gray-300 rounded-3xl focus:outline-none"
          />
        </div>
      );
    };
    const LoginButton = () => {
      return (
        <button className="LoginButton text-xs border-2 border-gray-400 w-14 h-6 text-gray-400 rounded-md self-start font-semibold flex-shrink-0 mb-10">
          Log in
        </button>
      );
    };
    return (
      <div className="Home">
        <Router>
          <div className="Header w-screen py-5 flex space-x-6 items-center justify-center">
            <Link to="/">
              <Logo />
            </Link>
            <Search />
            <Link to="/login">
              <LoginButton />
            </Link>
          </div>
          <Switch>
            <Route path="/login" component={BaseLogin} />
          </Switch>
        </Router>
      </div>
    );
  };
  return <Header />;
};
export default Home;
