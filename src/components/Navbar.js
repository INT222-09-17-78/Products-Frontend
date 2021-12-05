import { BrowserRouter as Route, Link } from "react-router-dom";
const Navbar = (props) => {
  return (
    <div className="Navbar px-20 font-kanit border-none w-full text-sm capitalize font-light bg-blue-cyan text-white h-16 relative lg:flex flex-row shadow-xl z-10 space-x-10 hidden items-center xl:text-lg">
      <Link to="/" className="flex flex-row items-center">
        <i className="material-icons cursor-pointer mr-2">home</i>
        <div className="cursor-pointer ">home</div>
      </Link>
      <Link to="/products" className="flex flex-row items-center">
        <i className="material-icons cursor-pointer mr-2">
          category
        </i>
        <div className="cursor-pointer ">all product</div>
      </Link>
      <Link to="/addProduct" className="flex flex-row items-center">
        <i className="material-icons cursor-pointer mr-2">
          inventory
        </i>
        <div className="cursor-pointer ">add product</div>
      </Link>
      {props.role === 'Admin' ? 
        <Link to="/users" className="flex flex-row items-center">
        <i className="material-icons cursor-pointer mr-2">
          manage_accounts
        </i>
        <div className="cursor-pointer ">user management</div>
      </Link> : null
      }
      
      <Link to="#" className="flex flex-row items-center">
        <i className="material-icons cursor-pointer mr-2">
          groups
        </i>
        <div className="cursor-pointer ">about us</div>
      </Link>
    </div>
  );
};
export default Navbar;
