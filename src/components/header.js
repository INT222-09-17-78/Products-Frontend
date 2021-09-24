import { BrowserRouter as Switch, Route, Link, Router } from "react-router-dom";
import Logo from "./Logo.js";
import Axios from "axios";
import SearchIcon from '@material-ui/icons/Search';
const Header = (props) => {
  console.log("Header render");
  const logOut = () => {
    if (window.confirm("Do you want to logout?") === true) {
      Axios.get("http://localhost:5000/api/logout");
      window.location.reload();
    }
  };
  // const [showResults, setShowResults] = useState(false)
  const Search = () => {
    return (
      <div className="Search flex items-center text-xs">
        <SearchIcon className="material-icons absolute pl-2 text-gray-400"/>
        <input
          type="text"
          placeholder="ค้นหาสินค้า"
          className="bg-transparent w-40 h-6 pl-7 md:w-56 xsm:h-8 xsm:w-44 md:text-base border-2 border-gray-300 rounded-3xl focus:outline-none lg:w-100 lg:h-9"
        />
      </div>
    );
  };

  const LoginButton = () => {
    // const onClickForLogin = () => setShowResults(true)
    return (
      <Link to={`${props.path}/login`}>
        <button className="LoginButton text-xs border-2 mb-1 border-gray-400 md:w-16 md:h-8 w-14 h-6 text-gray-400 rounded-md font-semibold flex-shrink-0 md:text-base">
          Log in
        </button>
      </Link>
    );
  };

  return (
    // <Router>
    <>
      <div className="Header overflow-hidden w-screen md:h-24 py-5 px-2 lg:h-28 border-none flex space-x-3.5 xs:space-x-6 xsm:space-x-10 justify-center items-center">
        <Link to="/">
          <Logo
            width="w-12"
            height="h-12"
            widthxms="w-14"
            heightxms="h-14"
            widthmd="w-16"
            heightmd="h-16"
            widthlg="w-20"
            heightlg="h-20"
          />
        </Link>
        <Search />
        {props.isLogin ? (
          <div className="loggedIn text-xs flex flex-col items-end break-all text-right">
            <div className="profile-pic rounded-full bg-gray-200 w-10 h-10"></div>
            <div>{props.usernameInSession}</div>
            <div
              className="text-red-500 cursor-pointer hover:underline"
              onClick={logOut}
            >
              Log out
            </div>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </>
    // {/* </Router> */}
  );
};
export default Header;
