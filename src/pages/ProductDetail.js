import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
const Description = styled.li`
  height: fit-content;
`;
const ProductDetail = () => {
  const { state } = useLocation();
  const [product, setProduct] = useState({});
  useEffect(() => {
    setProduct(state)
  }, [state]);
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
          <ul className="text-left p-5 space-y-2 rounded-b-lg relative">
            <i className="absolute material-icons border-2 border-black rounded-md right-5 mt-1 cursor-pointer">
              edit
            </i>
            <li className="text-xl">{product.ProdName}</li>
            <li>Price: {product.Price} ฿</li>
            <li>Description</li>
            <Description className="break-words">{product.Description}</Description>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
