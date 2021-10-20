import { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import FormLogin from "../components/FormLogin.js";
import FormRegister from "./UsersManage.js";
const Brands = () => {
  // const [brands, setBrands] = useState([{ name: "a" }, { name: "b" }, { name: "c" }, { name: "d" }]);
  // const [currentBrand, setCurrentBrand] = useState(0);
  // const [hasNextBrands, sethasNextBrands] = useState("none");
  // const [hasBeforeBrands, sethasBeforeBrands] = useState("none");
  // const [hasOneBrands, sethasOneBrands] = useState("");
  // const BrandsList = () => {
  //   useEffect(() => {
  //     Axios.get(`${process.env.REACT_APP_API_URL}/api/show/brands`)
  //       .then((response) => {
  //         // setUsernameInSession(response.data.user);
  //         // setIsLogin(response.data.loggedIn);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     if (currentBrand === brands.length - 2) {
  //       sethasNextBrands("none")
  //     }
  //     if (brands.length > 1 && currentBrand !== brands.length - 2) {
  //       sethasNextBrands("")
  //     }
  //     if (currentBrand === 0) {
  //       sethasBeforeBrands("none")
  //     }
  //     if (currentBrand > 0) {
  //       sethasBeforeBrands("")
  //     }
  //   }, []);
  //   return (
  //     <div className="BrandsList w-full h-60 bg-cyan-blue relative flex justify-center items-center">
  //       <div
  //         className="absolute left-0  mb-12  z-10 cursor-pointer "
  //         htmlColor="white"
  //         style={{ fontSize: "2rem", display: hasBeforeBrands }}
  //         onClick={() => {
  //           setCurrentBrand(currentBrand - 1)
  //         }}
  //       />
  //       <div className="absolute carousel-warpper flex w-full h-full mt-8 mb-20 flex-row justify-center items-center space-x-6">

  //         <div className={`carousel-warpper-content w-28 h-28 xs:w-32 xs:h-32 bg-white border-2 shadow-lg rounded-lg flex-shrink-0 overflow-auto ${hasOneBrands}`}>
  //           {brands[currentBrand] === undefined ? sethasOneBrands("hidden") : brands[currentBrand].name}
  //         </div>

  //         <div className={`carousel-warpper-content w-28 h-28 xs:w-32 xs:h-32 bg-white border-2 shadow-lg rounded-lg flex-shrink-0 overflow-auto ${hasOneBrands}`}>
  //           {brands[currentBrand + 1] === undefined ? sethasOneBrands("hidden") : brands[currentBrand + 1].name}
  //         </div>
  //       </div>
  //       <div
  //         className="absolute right-0 mb-12 cursor-pointer z-10"
  //         htmlColor="white"
  //         style={{ fontSize: "2rem", display: hasNextBrands }}
  //         onClick={() => {
  //           setCurrentBrand(currentBrand + 1)

  //         }}
  //       />
  //       {/* <i
  //         className="right-arrow material-icons cursor-pointer text-white text-4xl"
  //         onClick={() => {
  //           currentBrand < (brands.length - 1) / 2 &&
  //             setCurrentBrand(currentBrand + 2);
  //         }}
  //       >
  //         arrow_forward_ios
  //       </i> */}
  //     </div>
  //   );
  // };
  const ProductsList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      Axios.get(`${process.env.REACT_APP_API_URL}/api/show/products`)
        .then((response) => {
          setProducts(response.data)
          // setUsernameInSession(response.data.user);
          // setIsLogin(response.data.loggedIn);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    return (
      <div className="ProductsList w-screen h-screen">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 p-8 justify-items-center md:grid-cols-4">
          {products.map((product, i) => (
            <div
              className="bg-gray-400 w-32 h-44 rounded-xl flex items-end shadow-xl md:w-40 md:h-52"
              key={i}
            >
              <div className="bg-white w-full h-14 rounded-b-xl">{product.ProdName}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="Brands">
      {/* <BrandsList /> */}
      <ProductsList />
    </div>
  );
};
export default Brands;
