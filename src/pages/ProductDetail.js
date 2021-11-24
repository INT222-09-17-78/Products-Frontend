import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
const ProductDetail = () =>{
    const {productId} = useParams();
    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_API_URL}/api/show/product/${productId}`)
          .then((response) => {
            console.log(response.data)
          })
          .catch((error) => {
 console.log(error)
          });
      }, []);
    return <div className="p-5">Product ID: {productId}</div>
}
export default ProductDetail