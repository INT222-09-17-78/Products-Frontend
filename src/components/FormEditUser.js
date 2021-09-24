import { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import tiles from "../images/tiles.jpg";
import Logo from "./Logo.js";
import CloseIcon from '@material-ui/icons/Close';
import styled from "styled-components"
Axios.defaults.withCredentials = true;
const ModalLogin = styled.div`
    height: fit-content;
   
`;
const FormEditUser = (props) => {
  console.log("regis render");
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    email: "",
    mobile: "",
    role: ""
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
  const addUser = (event) => {
    console.log(values.role)
    console.log(values.username)
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


    // //Email and Phone
    // if (!values.emailOrMobile.trim()) {
    //   errors.emailOrMobile = "This field is required";
    // } else if (
    //   !mailFormat.test(values.emailOrMobile) &&
    //   !moblieFormat.test(values.emailOrMobile)
    // ) {
    //   errors.emailOrMobile = "Enter your moblie or email only";
    // } else {
    //   errors.emailOrMobile = "";
    // }
    // if(!mailFormat.test(values.emailOrMobile)){
    //   errors.email = "Enter your email only";
    // }
    if (
      errors.message ||

      errors.username ||

      errors.email ||

      errors.mobile
    ) {
      errors.message = "";
      setValues({
        ...values,
        username: values.username,

        email: values.email,
        mobile: values.mobile,
        role: values.role,
      });
    }
    if (
      errors.username === ""
    ) {
      Axios.put("http://localhost:5000/api/users/userAndUpload", {
        id: 1,
        username: values.username,
        email: values.email,
        mobile: values.mobile,
        role: values.role
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          history.push("/login");
        })
        .catch((error) => {
          errors.message = error.response.data.message;
          setValues({
            ...values,
            username: values.username,

            email: values.email,
            mobile: values.mobile,
            role: values.role
          });
        });
    }
  };

  return (
    <div className="BaseLogin w-screen h-screen flex justify-center overflow-auto absolute bg-black bg-opacity-50 top-0 pt-14 z-10">
      <ModalLogin className="Login-modal bg-snow w-64 md:w-104 shadow-xl rounded-xl relative pb-52 md:pb-32">
        <Logo
          position="absolute"
          w="w-24"
          h="h-24"
        />
        <div className="absolute right-5 top-5">

          <CloseIcon onClick={() => { props.setIsEdit(false) }} className="cursor-pointer" />

        </div>
        <form onSubmit={addUser} className="w-full h-full">
          <div className="form-content w-full md:w-64 md:ml-52 md:mt-28 text-sm flex flex-col mt-20 px-4">
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
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChange}
              value={values.email}
            />
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.email}
            </div>
            <input
              className="border border-gray-300 rounded-md text-center py-1.5 mt-2 focus:outline-none"
              type="mobile"
              name="mobile"
              placeholder="mobile"
              onChange={handleChange}
              value={values.mobile}
            />
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.mobile}
            </div>
            {/* <input
              className="border border-gray-300 rounded-md text-center py-1.5 mt-2 focus:outline-none"
              type="role"
              name="role"
              placeholder="role"
              onChange={handleChange}
              value={values.role}
            /> */}
            <select name="role" type="role" value={values.role} onChange={handleChange} class="border border-gray-300 rounded-md text-center py-1.5 mt-2 focus:outline-none">
              <option value="Staff" class="py-1">Staff</option>
              <option value="Admin" class="py-1">Admin</option>
            </select>
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.role}
            </div>
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.message}
            </div>
            <button className="bg-cyan-blue text-white border py-1.5 px-4 rounded-md text-center mt-3 hover:bg-blue-200 hover:text-cyan-blue">
              Submit
            </button>
          </div>
        </form>
        <div className="md:float-left">
          <img src={tiles} alt="Tiles" className="object-cover rounded-b-xl md:rounded-l-xl md:rounded-br-none md:h-full md:w-2/6 absolute bottom-0" />
        </div>
      </ModalLogin>
    </div>
  );
};
export default FormEditUser;
