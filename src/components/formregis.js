import { useEffect, useState } from "react";
import Axios from "axios";
import tiles from "../images/tiles.jpg";
import Logo from "./logo";
import { BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";


const FormRegister = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    password: "",
    emailOrMobile: "",
    rePassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const mailFormat = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
  const usernameFormat = new RegExp(
    /(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  );
  const moblieFormat = new RegExp(/^(0[689]{1})+([0-9]{8})+$/g);
  const regisAccount = (event) => {
    event.preventDefault();
    //Username validation
    if (!values.username.trim()) {
      errors.username = "This field is required";
    } else if (values.username.trim().length > 25) {
      errors.username = "Your username must be only 25 characters";
    } else if (!usernameFormat.test(values.username)) {
      errors.username = "Your username must contain only alphanumerics";
    } else if (values.username.trim().length < 7) {
      errors.username = "Your username must be at least 6 characters";
    } else {
      errors.username = "";
    }
    //Password validation
    if (!values.password.trim()) {
      errors.password = "This field is required";
    } else if (values.password.trim().length < 8) {
      errors.password = "Your password must be at least 8 characters";
    } else if (values.rePassword !== values.password) {
      errors.password = "Your password not the same";
    } else {
      errors.password = "";
    }
    //Re-type Password
    if (!values.rePassword.trim()) {
      errors.rePassword = "This field is required";
    } else if (values.rePassword.trim().length < 8) {
      errors.rePassword = "Your password must be at least 8 characters";
    } else if (values.rePassword !== values.password) {
      errors.rePassword = "Your password not the same";
    } else {
      errors.rePassword = "";
    }
    //Email and Phone
    if (!values.emailOrMobile.trim()) {
      errors.emailOrMobile = "This field is required";
    } else if (
      !mailFormat.test(values.emailOrMobile) &&
      !moblieFormat.test(values.emailOrMobile)
    ) {
      errors.emailOrMobile = "Enter your moblie or email only";
    } else {
      errors.emailOrMobile = "";
    }
    setValues({
      ...values,
      username: values.username,
      password: values.password,
      emailOrMobile: values.emailOrMobile,
      rePassword: values.rePassword,
    });
    if (
      errors.username === "" &&
      errors.emailOrMobile === "" &&
      errors.password === "" &&
      errors.rePassword === ""
    ) {
      setValues({
        ...values,
        username: "",
        password: "",
        emailOrMobile: "",
        rePassword: "",
      });
      Axios.post("http://localhost:5000/api/uploadNone", {
        username: values.username,
        password: values.password,
      }).then((res) => {
        console.log(res)
        console.log(res.data)
        history.push("/login")
      }).catch((res) => {
        console.log(res.json())
      })
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
            <i className="material-icons cursor-pointer">close</i>
        </Link>
        </div>
        <div className="form-container w-full">
          <form onSubmit={regisAccount}>
            <div className="font-semibold">Create your account</div>
            <div className="form-content w-full h-96 text-sm flex flex-col px-10 mt-4">
              <input
                className="border border-gray-300 rounded-md text-center py-1.5 focus:outline-none "
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                value={values.username}
              />
              <div className="text-red-600 self-start text-xs mt-0.5 text-left">
                {errors.username}
              </div>
              <input
                className="border border-gray-300 rounded-md text-center py-1.5 mt-2 focus:outline-none"
                type="text"
                name="emailOrMobile"
                placeholder="Email or Mobile"
                onChange={handleChange}
                value={values.emailOrMobile}
              />
              <div className="text-red-600 self-start text-xs mt-0.5 text-left">
                {errors.emailOrMobile}
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

              <input
                className="border border-gray-300 rounded-md text-center py-1.5 mt-2 focus:outline-none"
                type="password"
                name="rePassword"
                placeholder="Re-type Password"
                onChange={handleChange}
                value={values.rePassword}
              />
              <div className="text-red-600 self-start text-xs mt-0.5 text-left">
                {errors.rePassword}
              </div>
              <div
                className={`text-green-600 self-start text-xs mt-0.5 text-left ${
                  errors.username === "" &&
                  errors.emailOrMobile === "" &&
                  errors.password === "" &&
                  errors.rePassword === ""
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
                Create your account now!
              </button>
            </div>
          </form>
          <img src={tiles} alt="Tiles" className="rounded-b-xl w-full h-36" />
        </div>
      </div>
    </div>
  );
};
export default FormRegister;
