import { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormLogin from "../components/formlogin.js";
import FormRegister from "../components/formregis.js";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
const Brands = () => {
  console.log("Brands render");
  const [brands, setBrands] = useState([{ name: "SCG" }, { name: "ABC" }]);
  const [currentBrand, setCurrentBrand] = useState(0);
  const [hasNextBrands,sethasNextBrands] = useState("");
  const BrandsList = () => {
    useEffect(() => {
      console.log("Home UseEffect");
      Axios.get("http://localhost:5000/api/show/brands")
        .then((response) => {
          console.log(response.data);
          // setUsernameInSession(response.data.user);
          // setIsLogin(response.data.loggedIn);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    return (
      <div className="BrandsList w-full h-60 bg-cyan-blue flex justify-center items-center">
        <NavigateBeforeIcon
          className="mb-12 cursor-pointer "
          htmlColor="white"
          style={{ fontSize: "3rem" }}
          onClick={() => {
            if (currentBrand > 0) {
              setCurrentBrand(currentBrand - 1);
              console.log(currentBrand)
            }
          }}
        />
        {/* <i
          className="left-arrow material-icons cursor-pointer text-white text-4xl"
          onClick={() => {
            currentBrand > 0 && setCurrentBrand(currentBrand - 2);
          }}
        >
          arrow_back_ios
        </i> */}
        <div className="carousel-warpper flex w-full mt-8 mb-20 flex-row justify-center items-center space-x-6">
          <div className="carousel-warpper-content w-32 h-32 bg-white border-2 shadow-lg rounded-lg flex-shrink-0 overflow-auto">
            {brands[currentBrand].name}
          </div>
        </div>
        <NavigateNextIcon
          className="mb-12 cursor-pointer"
          htmlColor="white"
          style={{ fontSize: "3rem",display: hasNextBrands }}
          onClick={() => {
            if (currentBrand < brands.length - 1) {
              setCurrentBrand(currentBrand + 1);
              console.log(currentBrand)
            }else if(currentBrand == brands.length - 1){
              sethasNextBrands("none");
            }
          }}
        />
        {/* <i
          className="right-arrow material-icons cursor-pointer text-white text-4xl"
          onClick={() => {
            currentBrand < (brands.length - 1) / 2 &&
              setCurrentBrand(currentBrand + 2);
          }}
        >
          arrow_forward_ios
        </i> */}
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
      <div className="ProductsList w-screen h-screen">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 p-8 justify-items-center">
          {products.map((product, i) => (
            <div
              className="bg-gray-400 w-36 h-48 rounded-xl flex items-end shadow-xl"
              key={i}
            >
              <div className="bg-white w-full h-14 rounded-b-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="Brands">
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
