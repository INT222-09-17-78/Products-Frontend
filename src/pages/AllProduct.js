import { useState, useEffect } from "react";
import Axios from "axios";
import images from '../images/ads1.jpg'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useLocation,
} from "react-router-dom";
const AllProduct = (props) => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { state } = useLocation();
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/show/products`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
      });
    return () => {
      setProducts([]);
    };
  }, []);
  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.ProdName.toLowerCase().includes(
          props.searchInput.toLowerCase()
        ) ||
        product.Brands.BrandName.toLowerCase().includes(
          props.searchInput.toLowerCase()
        )
    );
    setSearchResults(results);

    if (state) {
      const remainingResults = products.filter(
        (product) => product.ProdID !== state
      );
      setSearchResults(remainingResults);
    }
  }, [products, props.searchInput, state]);
  return (
    <div className="ProductsList w-screen h-screen font-kanit md:text-lg lg:text-xl xl:text-2xl text-gray-800">
      <div className="p-5 lg:p-8 xl:p-10 text-lg md:text-xl lg:text-2xl xl:text-3xl">All Product</div>
      <div className="grid grid-cols-2 gap-y-5 gap-x-6 px-5 justify-items-center md:grid-cols-4 xl:gap-x-0 md:px-16 lg:px-24">
        {searchResults.map((product, i) => (
          <Link
            to={{
              pathname: `/products/productDetail/${product.ProdID}`,
              state: product,
            }}
            key={i}
          >
            <div className="card shadow-xl rounded-xl w-32 h-56 lg:h-69 lg:w-44 xl:h-96 xl:w-60">
              <div
                className="h-32 lg:h-44 xl:h-64 rounded-t-xl bg-cover"
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API_URL}/api/download/image/${product.Image})`,
                }}
              />
              <ul className="px-5 pt-4 rounded-b-xl text-left text-sm xl:text-xl flex flex-col">
                <li className="truncate text-left">Name: {product.ProdName}</li>
                <li className="truncate text-left">
                  Brand: {product.Brands.BrandName}
                </li>
                <li className="truncate text-left">Price: {product.Price} ฿</li>
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default AllProduct;
