import { useState, useEffect } from "react";
import Axios from "axios";
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
    Axios.get(`${process.env.REACT_APP_API_URL}/api/show/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
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
  }, [products, props.searchInput]);
  return (
    <div className="ProductsList w-screen h-screen font-kanit">
      <div className="p-5">All Product</div>
      <div className="grid grid-cols-2 gap-y-5 gap-x-6 px-5 justify-items-center md:grid-cols-4">
        {searchResults.map((product, i) => (
          <Link
            to={{
              pathname: `/products/editProduct/${product.ProdID}`,
              state: product,
            }}
            key={i}
          >
            <div className="card shadow-xl rounded-xl w-32 h-52">
              <div
                className="h-32 rounded-t-xl bg-cover"
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API_URL}/api/download/image/${product.Image})`,
                }}
              />
              <ul className="p-2 rounded-b-xl text-left text-sm">
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
