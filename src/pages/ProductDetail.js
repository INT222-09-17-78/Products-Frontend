import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
const Description = styled.li`
  height: fit-content;
`;
const ProductDetail = (props) => {
  const history = useHistory();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/show/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch(() => {
        history.push("/products");
      });
  }, [productId,history]);
  const deleteThisProduct = (id) => {
    Axios.delete(`${process.env.REACT_APP_API_URL}/api/delete/product/${id}`);
  };
  return (
    <div className="font-kanit md:text-lg lg:text-xl xl:text-2xl xl:flex xl:flex-col xl:justify-center xl:items-center lg:pb-20">
      {product.Brands ? (
        <div className="text-2xl p-8">{product.Brands.BrandName}</div>
      ) : null}
      <div className="container px-8 md:px-60 2xl:px-96">
        <div className="card shadow-xl rounded-lg">
          {product.Image ? (
            <img className="rounded-t-lg" src={`${process.env.REACT_APP_API_URL}/api/download/image/${product.Image}`}/>
          ) : null}
          <ul className="text-left p-4 space-y-2 rounded-b-lg relative">
           <Link to={`/products/productDetail/${productId}/editProduct`}>
            <i className="absolute material-icons border-2 border-gray-700 text-gray-700 rounded-md right-5 mt-1 cursor-pointer"
            >
              edit
            </i>
            </Link>
            <li className="text-xl">{product.ProdName}</li>
            <li>Price: {product.Price} ฿</li>
            <li>Description</li>
            <Description className="break-words">
              {product.Description}
            </Description>
          </ul>
          {product.Patterns ? (
            <div className="grid grid-cols-2 w-full justify-items-center pb-5">
              {product.Patterns.map((pattern, i) => {
                return pattern.PatternName ? (
                  <div key={i}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/download/image/${pattern.PatternName}`}
                      alt="NOT LOADED"
                      className="w-28 h-28 rounded-md"
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
