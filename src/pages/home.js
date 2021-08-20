import Logo from "../components/logo.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormLogin from "../components/formlogin.js";
import FormRegister from "../components/formregis.js";
import homeBanner from "../images/homeBanner.jpg";
import ads1 from "../images/ads1.jpg";
import ads2 from "../images/ads2.jpg";
import ads3 from "../images/ads3.jpg";
import ads4 from "../images/ads4.jpg";
import { useState, useEffect } from "react";
const Home = () => {
  const Header = () => {
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
            <button className="LoginButton text-xs border-2 border-gray-400 w-14 h-6 text-gray-400 rounded-md self-start font-semibold flex-shrink-0 mb-10">
              Log in
            </button> 
      );
    };

    return (
      <Router>
        <div className="Header w-screen py-5 flex space-x-6 items-center justify-center">
          <Link to="/">
            <Logo width="w-16" height="h-16" />
          </Link>
          <Search />
          <Link to="/login">
            <LoginButton />
          </Link>
        </div>
        <Switch>
          <Route path="/login">
            <FormLogin />
          </Route>
          <Route path="/registration" component={FormRegister}></Route>
        </Switch>
      </Router>
    );
  };
  const Navbar = () => {
    return (
      <div className="Navbar w-full h-12 flex flex-row justify-center items-center space-x-7 text-sm font-medium text-gray-500">
        <Link to="/">
          <div>หน้าแรก</div>
        </Link>
        <Link to="#">
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
  const HomeBanner = () => {
    return (
      <div className="HomeBanner w-full h-36 bg-red-400 relative">
        <img
          src={homeBanner}
          alt="HomeBanner"
          className="object-fill w-full h-full absolute"
        />
        {/* <button className="text-white bg-black text-xs w-24 h-7 rounded-3xl font-medium absolute right-12 bottom-2 uppercase tracking-wide">shop now</button> */}
      </div>
    );
  };
  const HomeBanner2 = () => {
    const adsCollection = [ads1, ads2, ads3, ads4];
    return (
      <div className="HomeBanner2 grid grid-cols-2 justify-items-center px-4">
        {adsCollection.map((ads, index) => {
          return (
            <img key={index} src={ads} alt={`${ads}`} className="w-40 h-40" />
          );
        })}
      </div>
    );
  };
  return (
    <div className="Home">
      <Header />
      <Navbar />
      <HomeBanner />
      <HomeBanner2 />
    </div>
  );
};
export default Home;
