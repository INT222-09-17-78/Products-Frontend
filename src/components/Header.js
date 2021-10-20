import { BrowserRouter as Switch, Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import SquareLogo from "../images/SquareLogo.png";
const Header = (props) => {
  // const [show, setShow] = useState(false);
  return (
    // <Router>
    <>
      <div className="Header overflow-hidden w-screen border-none p-5 lg:px-16 space-x-6 flex justify-center items-center bg-blue-cyan">
        <img
          src={SquareLogo}
          alt="logo"
          hidden
          className="lg:block lg:w-28 lg:h-28"
        />
        <i
          className="lg:hidden material-icons cursor-pointer text-white"
          onClick={() => {
            props.setShowSidebar("-translate-x-0");
          }}
        >
          menu
        </i>
        <div className="Search flex items-center font-kanit text-xs lg:text-sm flex-grow relative">
          <i className="material-icons absolute font-semibold text-sm lg:text-base pl-3 text-gray-400 cursor-pointer">
            search
          </i>
          <input
            type="text"
            placeholder="search"
            className="bg-transparent flex flex-grow h-7 lg:h-9 lg:pl-10 pl-8 bg-white rounded-3xl focus:outline-none"
          />
        </div>
        {localStorage.getItem("isLoggedIn") === "true" ? (
          <div
            hidden
            className="hidden loggedIn ml-5 lg:flex flex-col break-all items-end text-right font-kanit"
          >
            <i className="material-icons cursor-pointer text-white text-5xl">
              account_circle
            </i>
            <div className="text-white">{props.username}</div>
            <div
              className="flex items-center text-red-500 cursor-pointer"
              onClick={props.logOut}
            >
              Logout
            </div>
          </div>
        ) : (
          <Link
            hidden
            className="LoginButton ml-8 text-sm font-kanit justify-center items-center lg:flex bg-white lg:w-20 lg:h-8 text-black rounded-md flex-shrink-0"
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
