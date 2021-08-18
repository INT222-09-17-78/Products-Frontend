import { useState } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import tiles from "../images/tiles.jpg";
import FormRegister from "./formregis";
import Logo from "./logo";

const FormLogin = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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
    setValues({
      ...values,
      username: values.username,
      password: values.password,
    });
    if (errors.username === "" && errors.password === "") {
      setValues({
        ...values,
        username: "",
        password: "",
      });
      Axios.post("http://localhost:5000/api/login", {
        username: values.username,
        password: values.password,
      }).then(() => {
        console.log("very good");
      });
    }
  };
  return (
    <div className="BaseLogin w-screen h-screen flex justify-center overflow-auto absolute top-0 pt-14 bg-black bg-opacity-50">
      <Logo
        width="w-24"
        height="h-24"
        display="absolute"
        top="top-4"
        text_size="text-xl"
      />
      <div className="bg-snow w-72 h-112 shadow-xl rounded-xl flex items-end">
        <div className="absolute self-start flex w-72 justify-end p-5">
        <Link to="/">
            <i class="material-icons cursor-pointer">close</i>
        </Link>
        </div>
        <div className="form-container w-full">
          <form onSubmit={loginAccount}>
            <div className="form-content w-full h-96 text-sm flex flex-col px-10 mt-4">
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
              <div
                className={`text-green-600 self-start text-xs mt-0.5 text-left ${
                  errors.username === "" && errors.password === ""
                    ? ""
                    : "hidden"
                }`}
              >
                Login Successful
              </div>
              <div className="text-cyan-blue self-start mt-3 text-xs">
                forgot your password ?
              </div>
              <button className="bg-cyan-blue text-white border py-1.5 px-4 rounded-md text-center mt-3 hover:bg-blue-200 hover:text-cyan-blue">
                Sign in
              </button>
              <Link to="/registration">
                <div className="text-cyan-blue mt-3 font-semibold cursor-pointer hover:text-blue-300 hover:underline ">
                  Create an account
                </div>
              </Link>
              <Switch>
                <Route path="/registration" component={FormRegister}></Route>
              </Switch>
            </div>
          </form>
          <img src={tiles} alt="Tiles" className="rounded-b-xl w-full h-36" />
        </div>
      </div>
    </div>
  );
};
export default FormLogin;
