import { BrowserRouter as Switch, Link } from "react-router-dom";
import Logo from "./Logo.js";
import Axios from "axios";
import { useState, useEffect } from "react";
import SquareLogo from "../images/SquareLogo.png";
const Header = (props) => {
  // const [show, setShow] = useState(false);
  const logOut = () => {
    if (window.confirm("Do you want to logout?") === true) {
      Axios.get(`${process.env.REACT_APP_API_URL}/api/users/logout`);
      localStorage.removeItem("isLoggedIn");
      window.location = "/login";
    }
  };
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
            placeholder="ค้นหาสินค้า"
            className="bg-transparent flex flex-grow h-7 lg:h-9 lg:pl-10 pl-8 bg-white rounded-3xl focus:outline-none"
          />
        </div>
        {localStorage.getItem("isLoggedIn") ? (
          <div
            hidden
            className="hidden loggedIn text-xs ml-5 lg:flex flex-col items-end break-all text-right"
          >
            <div className="profile-pic rounded-full bg-white w-10 h-10"></div>
            <div>{props.username}</div>
            <div
              className="text-red-500 cursor-pointer hover:underline"
              onClick={logOut}
            >
              Log out
            </div>
          </div>
        ) : (
          <Link
            hidden
            className="LoginButton ml-8 text-sm font-kanit justify-center items-center lg:flex bg-white lg:w-20 lg:h-8 text-black rounded-md flex-shrink-0"
            to={`/login`}
          >
            <button>เข้าสู่ระบบ</button>
          </Link>
        )}
      </div>
    </>
    // {/* </Router> */}
  );
};
export default Header;
