import { useState } from "react";
import Axios from "axios";
import tiles from "../images/tiles.jpg";
import tiles2 from "../images/tiles2.jpg";
import styled from "styled-components";
Axios.defaults.withCredentials = true;
const ModalLogin = styled.div`
  height: fit-content;
  @media (min-width: 768px) {
      width: 36rem;
  }
`;
const FormAddUser = (props) => {
  const setUserData = (data) => {
    props.setUserData([...props.userData, data]);
  };
  const closeAddUser = () => {
    props.setIsAdd(false);
  };
  const [values, setValues] = useState({
    username: "",
    password: "",
    emailOrMobile: "",
    role: "Staff",
  });
  const [errors] = useState({});
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
    console.log(values.role);
    console.log(values.username);
    event.preventDefault();
    //Username validation
    if (!values.username.trim()) {
      errors.username = "This field is required";
    } else if (values.username.trim().length > 25) {
      errors.username = "Your username must be only 25 characters";
    } else if (!usernameFormat.test(values.username)) {
      errors.username = "Your username must contain only alphanumerics";
    } else if (values.username.trim().length < 6) {
      errors.username = "Your username must be at least 6 characters";
    } else {
      errors.username = "";
    }
    //Password validation
    if (!values.password.trim()) {
      errors.password = "This field is required";
    } else if (values.password.trim().length < 8) {
      errors.password = "Your password must be at least 8 characters";
    }
    else {
      errors.password = "";
    }
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
    if (
      errors.message ||
      errors.password ||
      errors.username ||
      //   errors.rePassword ||
      errors.emailOrMobile
    ) {
      errors.message = "";
      setValues({
        ...values,
        username: values.username,
        password: values.password,
        emailOrMobile: values.emailOrMobile,
        // rePassword: values.rePassword,
      });
    }
    if (
      errors.username === "" &&
      errors.emailOrMobile === "" &&
      errors.password === ""
      //   errors.rePassword === ""
    ) {
      Axios.post(`${process.env.REACT_APP_API_URL}/api/users/userAndUpload`, {
        username: values.username,
        password: values.password,
        emailOrMobile: values.emailOrMobile,
        role: values.role,
      })
        .then((res) => {
          console.log(res.data);
          setUserData(res.data);
          closeAddUser();
        })
        .catch((error) => {
          //   errors.message = error.response.data.message;
          setValues({
            ...values,
            username: values.username,
            password: values.password,
            emailOrMobile: values.emailOrMobile,
            role: values.role,
            // rePassword: values.rePassword,
          });
        });
    }
  };

  return (
    <div className="BaseLogin w-screen h-screen flex justify-center overflow-auto absolute top-0 pt-32 bg-blue-cyan z-10 text-gray-800">
    <ModalLogin className="Login-modal bg-white w-64 shadow-xl rounded-xl relative pb-52 md:pb-32">
    <div className="font-semibold text-xl p-10 md:pl-72">
          Add User
        </div>
        <div className="absolute right-5 top-5">
        <i className="material-icons cursor-pointer" onClick={closeAddUser}>
            close
          </i>
        </div>
        <form onSubmit={addUser} className="w-full h-full">
          <div className="space-y-2 form-content w-full md:w-64 md:ml-72 md:mt-0 text-sm flex flex-col px-4">
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
              className="border border-gray-300 rounded-md text-center py-1.5 focus:outline-none"
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
              className="border border-gray-300 rounded-md text-center py-1.5 focus:outline-none"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={values.password}
            />
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.password}
            </div>

            <select
              name="role"
              type="role"
              value={values.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-md text-center py-1.5 focus:outline-none"
            >
              <option value="Staff" className="py-1">
                Staff
              </option>
              <option value="Admin" className="py-1">
                Admin
              </option>
            </select>
            <div className="text-red-600 self-start text-xs text-left">
              {errors.role}
            </div>
            <div className="text-red-600 self-start text- text-left">
              {errors.message}
            </div>
            <button className="bg-blue-cyan text-white border py-1.5 px-4 rounded-md text-center mt-3 hover:bg-blue-400 hover:text-cyan-blue">
               Add User
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
export default FormAddUser;
