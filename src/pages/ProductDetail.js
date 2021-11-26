import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
const Description = styled.li`
  height: fit-content;
`;
const ProductDetail = (props) => {
  const history = useHistory();
  // const { state } = useLocation();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  // useEffect(() => {
  //   setProduct(state);
  // }, [state]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/show/product/${productId}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch(() => {
        history.push("/products");
      });
  }, [productId]);
  const deleteThisProduct = (id) => {
    Axios.delete(`${process.env.REACT_APP_API_URL}/api/delete/product/${id}`);
  };
  return (
    <div className="font-kanit">
      {product.Brands ? (
        <div className="text-2xl p-8 p">{product.Brands.BrandName}</div>
      ) : null}
      <div className="container w-full px-8">
        <div className="card shadow-xl rounded-lg">
          {product.Image ? (
            <div
              className="container h-64 bg-cover rounded-t-lg "
              style={{
                backgroundImage: `url(${process.env.REACT_APP_API_URL}/api/download/image/${product.Image})`,
              }}
            />
          ) : null}
          <ul className="text-left p-4 space-y-2 rounded-b-lg relative">
            <i className="absolute material-icons border-2 border-gray-700 text-gray-700 rounded-md right-5 mt-1 cursor-pointer">
              edit
            </i>
            <li className="text-xl">{product.ProdName}</li>
            <li>Price: {product.Price} ฿</li>
            <li>Description</li>
            <Description className="break-words">
              {product.Description}
            </Description>
          </ul>
          {product.Patterns ? (
            <div className="grid grid-cols-3 w-full justify-items-center pb-5">
              {product.Patterns.map((pattern, i) => {
                return pattern.PatternName ? (
                  <div key={i}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/download/image/${pattern.PatternName}`}
                      alt="NOT LOADED"
                      className="w-16 h-16 rounded-md"
                    />
                    <span className="text-sm">{pattern.color}</span>
                  </div>
                ) : null;
              })}
            </div>
          ) : null}
        </div>
        <Link
          to={{
            pathname: `/products`,
            state: product.ProdID,
          }}
        >
          <button
            className="bg-red-700 text-white rounded-2xl px-6 py-1 mt-5"
            onClick={()=>{deleteThisProduct(product.ProdID)}}
          >
            delete
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ProductDetail;
