import { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Switch, Link, useHistory } from "react-router-dom";
import tiles from "../images/tiles.jpg";
import tiles2 from "../images/tiles2.jpg";
import styled from "styled-components";
import SquareLogoBlack from "../images/SquareLogoT.png";
Axios.defaults.withCredentials = true;
const ModalLogin = styled.div`
  height: fit-content;
  @media (min-width: 768px) {
      width: 36rem;
  }
`;
const FormLogin = (props) => {
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const loginAccount = (event) => {
    event.preventDefault();
    //Username, Email and Phone validation

    if (!values.username.trim()) {
      errors.username = "This field is required";
    } else {
      errors.username = "";
    }
    //Password validation
    if (!values.password.trim()) {
      errors.password = "This field is required";
    } else {
      errors.password = "";
    }

    if (errors.message || errors.password || errors.username) {
      errors.message = "";
      setValues({
        ...values,
        username: values.username,
        password: values.password,
      });
    }
    if (errors.username === "" && errors.password === "") {
      Axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        username: values.username,
        password: values.password,
      })
        .then((res) => {
          localStorage.setItem("isLoggedIn", true);
          setValues({
            ...values,
            username: "",
            password: "",
          });
          window.location = "/";
        })
        .catch((error) => {
          errors.message = error.response.data.message;
          setValues({
            ...values,
            username: values.username,
            password: values.password,
          });
        });
    }
  };
  return (
    <div className="BaseLogin w-screen h-screen flex justify-center overflow-auto absolute top-0 pt-52 bg-blue-cyan z-10">
      <ModalLogin className="Login-modal bg-white w-64 shadow-xl rounded-xl relative pb-52 md:pb-32">
        <img
          src={SquareLogoBlack}
          alt="logo"
          className="absolute w-40 h-40 left-32 z-10 md:-top-12 md:ml-52"
        />
        <div className="absolute right-5 top-5">
          <Link to="/">
            <i className="material-icons">close</i>
          </Link>
        </div>
        <form onSubmit={loginAccount} className="w-full h-full">
          <div className="form-content w-full md:w-64 md:ml-72 md:mt-0 md:pt-36 text-sm flex flex-col mt-36 px-4">
            <input
              className="border border-gray-300 rounded-md text-center py-1.5 focus:outline-none "
              type="text"
              placeholder="Username, Email or Phone"
              name="username"
              onChange={handleChange}
              value={values.username}
            />
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.username}
            </div>
            <input
              className="border border-gray-300 rounded-md text-center py-1.5 mt-2 focus:outline-none"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={values.password}
            />
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.password}
            </div>
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.message}
            </div>
            <button className="bg-blue-cyan text-white border py-1.5 px-4 rounded-md text-center mt-3 hover:bg-blue-400 hover:text-cyan-blue">
              Sign in
            </button>
          </div>
        </form>
        <div className="md:float-left">
          <img
            src={tiles}
            alt="Tiles"
            className="object-cover rounded-b-xl md:rounded-l-xl md:rounded-br-none md:h-full md:w-2/6 absolute bottom-0 md:hidden"
          />
          <img
            src={tiles2}
            alt="Tiles2"
            className="object-cover rounded-b-xl md:rounded-l-xl md:rounded-br-none md:h-full md:w-5/12 absolute bottom-0 hidden md:flex"
          />
        </div>
      </ModalLogin>
    </div>
  );
};
export default FormLogin;
