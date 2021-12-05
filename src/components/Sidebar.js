import { BrowserRouter as Route, Link } from "react-router-dom";
const Sidebar = (props) => {
  return (
    <div
      className={`Sidebar bg-white h-full z-20 w-56 md:w-2/5 lg:hidden top-0 absolute left-0 pl-6 transform ${props.showSidebar} transition duration-300`}
    >
      <i
        className="material-icons cursor-pointer absolute right-3 top-3 text-gray-600"
        onClick={() => {
          props.setShowSidebar("-translate-x-full");
        }}
      >
        close
      </i>
      {props.isLoggedIn ? (
        <div className="w-full h-24 flex items-center space-x-1.5 text-gray-500 font-kanit text-sm">
          <i className="material-icons cursor-pointer text-gray-400 text-5xl">
            account_circle
          </i>
          <div className="break-all text-left pr-16">{props.username}</div>
        </div>
      ) : (
        <div className="w-full h-24 flex items-center space-x-1.5 text-gray-500 font-kanit text-sm">
          <Link
            to="/login"
            onClick={() => {
              props.setShowSidebar("-translate-x-full");
            }}
            className="flex items-center space-x-1.5 rounded-full pr-2"
            style={{ boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.2)" }}
          >
            <i className="material-icons cursor-pointer text-gray-400 text-5xl">
              account_circle
            </i>
            <div>Login</div>
          </Link>
        </div>
      )}
      <div className="Sidebar-Link flex flex-col flex-wrap capitalize text-sm font-kanit items-start text-gray-500 w-full space-y-7">
        <Link to="/">
          <div
            className="flex items-center"
            onClick={() => {
              props.setShowSidebar("-translate-x-full");
            }}
          >
            <i className="material-icons cursor-pointer text-gray-400 mr-2">
              home
            </i>
            home
          </div>
        </Link>
        <Link to="/products">
        <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              props.setShowSidebar("-translate-x-full");
            }}
          >
          <i className="material-icons cursor-pointer text-gray-400 mr-2">
            category
          </i>
          all product
        </div>
        </Link>
        <Link to="/addProduct">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              props.setShowSidebar("-translate-x-full");
            }}
          >
            <i className="material-icons cursor-pointer text-gray-400 mr-2">
              inventory
            </i>
            add product
          </div>
        </Link>
        {props.role === 'Admin' ?
          <Link to="/users">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              props.setShowSidebar("-translate-x-full");
            }}
          >
            <i className="material-icons cursor-pointer text-gray-400 mr-2">
              manage_accounts
            </i>
            user management
          </div>
        </Link> : null
        }
        
        <div className="flex items-center">
          <i className="material-icons cursor-pointer text-gray-400 mr-2">
            groups
          </i>
          about us
        </div>
        {props.isLoggedIn ? (
          <div
            className="flex items-center text-red-500 cursor-pointer"
            onClick={props.logOut}
          >
            <i className="material-icons cursor-pointer text-red-500 mr-2">
              logout
            </i>
            Logout
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Sidebar;
