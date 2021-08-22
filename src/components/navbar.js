import { BrowserRouter as Switch, Route, Link, Router } from "react-router-dom";
import Brands from "../pages/brands";
import Home from "../pages/home";
const Navbar = () => {
    return (
      <div className="Navbar w-full h-12 flex flex-row justify-center items-center space-x-7 text-sm font-medium text-gray-500">
        <Link to="/">
          <div className="cursor-pointer">หน้าแรก</div>
        </Link>
        <Link to="/brands">
          <div>สินค้าทุกแบรนด์</div>
        </Link>
        <Link to="#">
          <div>จัดการสินค้า</div>
        </Link>
        <Link to="#">
          <div>เกี่ยวกับเรา</div>
        </Link>
      </div>
    );
  };
export default Navbar;
