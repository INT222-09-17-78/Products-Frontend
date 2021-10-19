import { BrowserRouter as Route, Link } from "react-router-dom";
const Sidebar = (props) => {
  return (
    <div
      className={`Sidebar bg-white h-full z-20 w-3/5 md:w-2/5 lg:hidden top-0 absolute left-0 pl-6 transform ${props.showSidebar} transition duration-300`}
    >
      <i
        className="material-icons cursor-pointer absolute right-3 top-3 text-gray-600"
        onClick={() => {
          props.setShowSidebar("-translate-x-full");
        }}
      >
        close
      </i>
      <div className="w-full h-24 flex items-center space-x-1.5 text-gray-500 font-kanit text-sm">
        <Link to="/login" 
        onClick={() => {
            props.setShowSidebar("-translate-x-full");
          }}
        className="flex items-center space-x-1.5 rounded-full pr-2" style={{boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.2)"}}>
            <i className="material-icons cursor-pointer text-gray-400 text-5xl">
          account_circle
        </i>
        <div>เข้าสู่ระบบ</div>
        </Link>
      </div>

      <div className="Sidebar-Link flex flex-col flex-wrap text-sm font-kanit items-start text-gray-500 w-full space-y-7">
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
            หน้าหลัก
          </div>
        </Link>
        <div className="flex items-center">
          <i className="material-icons cursor-pointer text-gray-400 mr-2">
            category
          </i>
          สินค้าทุกแบรนด์
        </div>
        <div className="flex items-center">
          <i className="material-icons cursor-pointer text-gray-400 mr-2">
            inventory
          </i>
          จัดการสินค้า
        </div>
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
            จัดการข้อมูลผู้ใช้งาน
          </div>
        </Link>
        <div className="flex items-center">
          <i className="material-icons cursor-pointer text-gray-400 mr-2">
            groups
          </i>
          เกี่ยวกับเรา
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
