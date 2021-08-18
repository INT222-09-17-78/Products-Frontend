import { useState } from "react";
import Axios from "axios";
import { BrowserRouter as Link } from "react-router-dom";
import tiles from "../images/tiles.jpg";

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

  const regisAccount = (event) => {
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
    <div className="BaseLogin w-screen h-screen flex justify-center overflow-auto absolute top-0 pt-20 bg-black bg-opacity-50">
      <div className="bg-snow w-72 h-108 shadow-xl rounded-xl flex items-end">
        <div className="img-container w-full">
          <form onSubmit={regisAccount}>
            <div className="form-content w-full h-86 text-sm flex flex-col px-10 mt-4">
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
            </div>
          </form>
          <img src={tiles} alt="Tiles" className="rounded-b-xl w-full h-36" />
        </div>
      </div>
    </div>
  );
};
export default FormLogin;
