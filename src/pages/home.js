import Logo from "../components/logo.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormLogin from "../components/formlogin.js";
import FormRegister from "../components/formregis.js";
import Header from "../components/header.js";
import Navbar from "../components/navbar.js";
import homeBanner from "../images/homeBanner.jpg";
import ads1 from "../images/ads1.jpg";
import ads2 from "../images/ads2.jpg";
import ads3 from "../images/ads3.jpg";
import ads4 from "../images/ads4.jpg";
import { useState, useEffect } from "react";
const Home = () => {
  const HomeBanner = () => {
    return (
      <div className="HomeBanner w-full h-36 relative">
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
      <Header path=""/>
      <Navbar />
      <HomeBanner />
      <HomeBanner2 />
        <Switch>
          <Route path="/login">
            <FormLogin regisPath=""/>
          </Route>
          <Route path="/registration" component={FormRegister} />
        </Switch>
    </div>
  );
};
export default Home;
