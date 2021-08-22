import { useState } from "react";
import Header from "../components/header.js";
import Navbar from "../components/navbar.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormLogin from "../components/formlogin.js";
import FormRegister from "../components/formregis.js";
const Brands = () => {
  const BrandsList = () => {
    const brands = [
      {
        name: "SCG",
      },
      {
        name: "TOT",
      },
      {
        name: "SHERA",
      },
      {
        name: "JOTUN",
      },
    ];
    const [currentBrand, setCurrentBrand] = useState(0);
    return (
      <div className="BrandsList w-full h-60 bg-cyan-blue flex justify-center">
        <i
          className="left-arrow material-icons cursor-pointer text-white text-4xl absolute left-6 top-56 z-10 "
          onClick={() => {
            currentBrand > 0 && setCurrentBrand(currentBrand - 2);
          }}
        >
          arrow_back_ios
        </i>
        <div className="carousel-warpper flex w-full mt-8 mb-20 flex-row justify-center items-center relative space-x-6">
          <div className="carousel-warpper-content w-32 h-32 bg-white border-2 shadow-lg rounded-lg flex-shrink-0 overflow-auto ">
            {brands[currentBrand].name}
          </div>
          <div className="carousel-warpper-content w-32 h-32 bg-white border-2 shadow-lg rounded-lg flex-shrink-0 overflow-auto ">
            {brands[currentBrand + 1].name}
          </div>
        </div>
        <i
          className="right-arrow material-icons cursor-pointer text-white text-4xl absolute right-4 top-56 z-10 "
          onClick={() => {
            currentBrand < (brands.length - 1) / 2 &&
              setCurrentBrand(currentBrand + 2);
          }}
        >
          arrow_forward_ios
        </i>
      </div>
    );
  };
  const ProductsList = () => {
    const products = [
      {
        name: "Ceramic Tile",
      },
      {
        name: "Porcelain Tile",
      },
      {
        name: "Glass Tile",
      },
      {
        name: "Granite Tile",
      },
    ];

    return (
      <div className="ProductsList w-full h-full">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 p-8 justify-items-center">
          {products.map((product, i) => (
            <div className="bg-gray-400 w-36 h-48 rounded-xl flex items-end shadow-xl" key={i}>
              <div className="bg-white w-full h-14 rounded-b-xl">

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="Brands">
      <Header path="brands" />
      <Navbar />
      <BrandsList />
      <ProductsList />
      <Switch>
        <Route path="/brands/login">
          <FormLogin regisPath="/brands" />
        </Route>
        <Route path="/brands/registration" component={FormRegister} />
      </Switch>
    </div>
  );
};
export default Brands;
