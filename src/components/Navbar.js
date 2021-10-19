import { BrowserRouter as Route, Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="Navbar px-20 font-kanit border-none w-full text-sm font-light bg-blue-cyan text-white h-16 relative lg:flex flex-row shadow-xl z-10 space-x-10 hidden items-center">
      <Link to="/" className="flex flex-row items-center">
        <i className="material-icons cursor-pointer mr-2">home</i>
        <div className="cursor-pointer">หน้าแรก</div>
      </Link>
      <Link to="/brands" className="flex flex-row items-center">
        <i className="material-icons cursor-pointer mr-2">
          category
        </i>
        <div>สินค้าทุกแบรนด์</div>
      </Link>
      <Link to="#" className="flex flex-row items-center">
        <i className="material-icons cursor-pointer mr-2">
          inventory
        </i>
        <div>จัดการสินค้า</div>
      </Link>
      <Link to="/users" className="flex flex-row items-center">
        <i className="material-icons cursor-pointer mr-2">
          manage_accounts
        </i>
        <div className="cursor-pointer">จัดการผู้ใช้</div>
      </Link>
      <Link to="#" className="flex flex-row items-center">
        <i className="material-icons cursor-pointer mr-2">
          groups
        </i>
        <div>เกี่ยวกับเรา</div>
      </Link>
    </div>
  );
};
export default Navbar;
