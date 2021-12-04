import { BrowserRouter as Switch, Link, useHistory } from "react-router-dom";
import SquareLogo from "../images/SquareLogo.png";
const Header = (props) => {
  const history = useHistory();
  const handleChange = (event) => {
    history.push("/products");
    props.setSearchInput(event.target.value);
  };
  return (
    // <Router>
    <>
      <div className="Header overflow-hidden w-screen border-none p-5 lg:px-16 space-x-6 flex justify-center items-center bg-blue-cyan">
        <img
          src={SquareLogo}
          alt="logo"
          hidden
          className="lg:block lg:w-28 lg:h-28 xl:w-32 xl:h-32"
        />
        <i
          className="lg:hidden material-icons cursor-pointer text-white"
          onClick={() => {
            props.setShowSidebar("-translate-x-0");
          }}
        >
          menu
        </i>
        <div className="Search flex items-center font-kanit text-xs lg:text-sm xl:text-lg flex-grow relative">
          <i className="material-icons absolute font-semibold text-sm lg:text-base pl-3 xl:text-lg text-gray-400 cursor-pointer">
            search
          </i>
          <input
            type="text"
            placeholder="search"
            className="bg-transparent flex flex-grow h-7 lg:h-9 lg:pl-10 xl:h-10 pl-8 bg-white rounded-3xl focus:outline-none"
            value={props.searchInput}
            onChange={handleChange}
          />
        </div>
        {localStorage.getItem("isLoggedIn") === "true" ? (
          <div
            hidden
            className="hidden loggedIn ml-5 lg:flex flex-row break-all text-right font-kanit items-center"
          >
            <i className="material-icons cursor-pointer text-white text-7xl mr-1">
              account_circle
            </i>
            <div>
              <div className="text-white text-left mb-1 text-lg ml-1">{props.username}</div>
              <div
                className="flex items-center text-red-500 bg-white rounded-full px-3 py-1 cursor-pointer text-sm"
                onClick={props.logOut}
              >
                <i className="material-icons mr-2 text-sm">logout</i>
                Logout
              </div>
            </div>
          </div>
        ) : (
          <Link
            hidden
            className="LoginButton ml-8 text-sm font-kanit justify-center items-center lg:flex bg-white lg:w-20 lg:h-8 xl:w-32 xl:h-10 xl:text-lg text-gray-700 rounded-md flex-shrink-0"
            to={`/login`}
          >
            <button>Login</button>
          </Link>
        )}
      </div>
    </>
    // {/* </Router> */}
  );
};
export default Header;
