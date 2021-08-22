import { BrowserRouter as Switch, Route, Link, Router } from "react-router-dom";
import Logo from "../components/logo.js";
import FormLogin from "../components/formlogin";
import FormRegister from "../components/formregis";
const Header = (props) => {
  // const [showResults, setShowResults] = useState(false)
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
    // const onClickForLogin = () => setShowResults(true)
    return (
      <Link to={`${props.path}/login`}>
        <button className="LoginButton text-xs border-2 border-gray-400 w-14 h-6 text-gray-400 rounded-md self-end font-semibold flex-shrink-0">
          Log in
        </button>
      </Link>
    );
  };

  return (
    // <Router>
    <>
      <div className="Header w-screen py-5 flex space-x-6 justify-center items-stretch">
        <Link to="/">
          <Logo width="w-16" height="h-16" />
        </Link>
        <Search />
        <LoginButton />
      </div>
    </>
    // {/* </Router> */}
  );
};
export default Header;
