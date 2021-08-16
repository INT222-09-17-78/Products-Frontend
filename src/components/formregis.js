import { useState, useEffect } from "react";
import Axios from "axios";
// const FormRegister = (props) => {
//   const Title = (props) => {
//     return (
//       <div className="font-medium mt-14 sm:p-0  w-full h-5">
//         <h1>{props.title}</h1>
//       </div>
//     );
//   };

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isEmpty, setIsEmpty] = useState(true);
//   const [isLogin, setIsLogin] = useState(true);
//   // const checkForm = () =>{
//   //   if(username.trim().length>0 && email.trim().length>0 && password.trim().length>0){
//   //     setIsEmpty(true)
//   //   }else{
//   //     setIsEmpty(false)
//   //   }
//   // }
//   const swithToRegis = () => {
//     setIsLogin(false);
//   };
//   const inputUsername = (event) => {
//     setUsername(event.target.value);
//   };
//   const inputEmailOrMobile = (event) => {
//     setEmail(event.target.value);
//   };
//   const inputPassword = (event) => {
//     setPassword(event.target.value);
//   };
//   const regisAccount = (event) => {
//     event.preventDefault();

//     const mailFormat = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
//     const usernameFormat = new RegExp(/^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/);
//     //validate all field should not be empty
//     if (
//       username.trim().length <= 0 ||
//       email.trim().length <= 0 ||
//       password.trim().length <= 0
//     ) {
//       setIsEmpty(false);
//       console.log("All field are required");
//     } else if (!mailFormat.test(email)) {
//       setIsEmpty(false);
//       console.log("Email is invaild");
//     } else if (!usernameFormat.test(username) || username.trim().length > 25) {
//       setIsEmpty(false);
//       console.log(
//         "Your username must be at least six alphanumerics and at least one letter"
//       );
//     } else if (password.trim().length < 8) {
//       setIsEmpty(false);
//       console.log("Your password must be at least 8 character");
//     } else {
//       setIsEmpty(true);
//       console.log("สมัครเรียบร้อย!!");
//       const accountData = {
//         username,
//         email,
//         password,
//       };
//       console.log(accountData);
//       setUsername("");
//       setEmail("");
//       setPassword("");
//       Axios.post("http://localhost:5000/api/login", {
//         username: username,
//         password: password,
//       }).then(() => {
//         console.log("very good");
//       });
//     }
//   };

//   // useEffect(()=>{
//   //   if(username.trim().length>0 && email.trim().length>0 && password.trim().length>0){
//   //     setIsEmpty(true)
//   //   }else{
//   //     setIsEmpty(false)
//   //   }
//   // },[username,email,password])

//   return (
//     <>
//       {!isLogin ? <Title title="Create your account" /> : <Title />}
//       <form onSubmit={regisAccount}>
//         <div className="form-control space-y-1 flex flex-col py-1.5 sm:px-14 sm:mt-2 items-start pl-10 pt-4">
//           <input
//             className="border border-gray-300 py-1.5 px-6 rounded-md text-center"
//             type="text"
//             placeholder="Username"
//             onChange={inputUsername}
//             value={username}
//           />
//           {!isEmpty ? (
//             <div className="text-red-600 mr-28 sm:mr-32 h-5">
//               {props.fillText}
//             </div>
//           ) : (
//             <div className="text-red-600 mr-28 sm:mr-32 h-5"></div>
//           )}
//           {!isLogin ? (
//             <>
//               <input
//                 className="border border-gray-300 py-1.5 px-6 rounded-md text-center "
//                 type="text"
//                 placeholder="Email"
//                 onChange={inputEmailOrMobile}
//                 value={email}
//               />
//               {!isEmpty ? (
//                 <div className="text-red-600 mr-28 sm:mr-32 h-5">
//                   {props.fillText}
//                 </div>
//               ) : (
//                 <div className="text-red-600 mr-28 sm:mr-32 h-5"></div>
//               )}
//             </>
//           ) : null}
//           <input
//             className="border border-gray-300 py-1.5 px-6 rounded-md text-center "
//             type="password"
//             placeholder="Password"
//             onChange={inputPassword}
//             value={password}
//           />
//           {!isEmpty ? (
//             <div className="text-red-600 mr-28 sm:mr-32 h-5">
//               {props.fillText}
//             </div>
//           ) : (
//             <div className="text-red-600 mr-28 sm:mr-32 h-5"></div>
//           )}
//           {!isLogin ? (
//             <div className="text-cyan-blue">{props.forgotPass}</div>
//           ) : null}
//         </div>
//         {isLogin ? (
//           <>
//             <button className="bg-cyan-blue text-white border border-gray-300 py-1.5 px-20 rounded-md text-center sm:mt-3 mt-2">
//               {props.textLogin}
//             </button>
//             <div
//               className="text-cyan-blue mt-4 cursor-pointer inline-block hover:text-blue-500 hover:underline font-medium"
//               onClick={swithToRegis}
//             >
//               {props.textRegis}
//             </div>
//           </>
//         ) : (
//           <button className="bg-cyan-blue text-white border border-gray-300 py-1.5 px-6 rounded-md text-center sm:mt-3 mt-2">
//             Create your account now!
//           </button>
//         )}
//       </form>
//     </>
//   );
// };]

const FormRegister = () => {
  // useEffect(() => {
  //   console.log("useEffect")
  // },[]);
  const [values, setValues] = useState({
    username: "",
    password: "",
    emailOrMobile: "",
    rePassword: ""
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
  const [isLogin, setIsLogin] = useState(true);
  // const [emailOrMobile, setEmailOrMobile] = useState("");
  // const inputEmailOrMobile = (event) => {
  //   setEmailOrMobile(event.target.value);
  // };
  const switchToRegis = () => {
    setIsLogin(false);
    setValues({
      ...values,
      username: "",
      password: "",
      emailOrMobile: "",
    });
    setErrors({});
  };
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
    } else if(values.rePassword !== values.password && !isLogin){
      errors.password = "Your password not the same";
    }else {
      errors.password = "";
    }
    //Re-type Password
     if (!values.rePassword.trim()) {
      errors.rePassword = "This field is required";
    } else if (values.rePassword.trim().length < 8) {
      errors.rePassword = "Your password must be at least 8 characters";
    } else if(values.rePassword !== values.password){
      errors.rePassword = "Your password not the same";
    }else {
      errors.rePassword = "";
    }
    //Email and Phone
    if (!values.emailOrMobile.trim()) {
      errors.emailOrMobile = "This field is required";
    } else if (!mailFormat.test(values.emailOrMobile)) {
      errors.emailOrMobile = "Enter your moblie or email only";
    } else {
      errors.emailOrMobile = ""
    }

    console.log(errors);
    setValues({
      ...values,
      username: values.username,
      password: values.password,
      emailOrMobile: values.emailOrMobile,
      rePassword : values.rePassword
    });
  };
  // //validate username must be at least six alphanumerics and at least one letter
  // else if (!mailFormat.test(emailOrMobile)) {
  //   // setIsEmpty(false);
  //   console.log("Email is invaild");
  // } else if (!usernameFormat.test(username) || username.trim().length > 25) {
  //   // setIsEmpty(false);
  //   console.log(
  //     "Your username must be at least six alphanumerics and at least one letter"
  //   );
  // } else if (password.trim().length < 8) {
  //   // setIsEmpty(false);
  //   console.log("Your password must be at least 8 character");
  // }
  // else {
  //   // setIsEmpty(true);
  //   console.log("สมัครเรียบร้อย!!");
  //   const accountData = {
  //     username,
  //     emailOrMobile,
  //     password,
  //   };
  //   console.log(accountData);
  //   setUsername("");
  //   setEmailOrMobile("");
  //   setPassword("");
  //   Axios.post("http://localhost:5000/api/login", {
  //     username: username,
  //     password: password,
  //   }).then(() => {
  //     console.log("very good");
  //   });
  // }
  // };
  return (
    <form onSubmit={regisAccount}>
      <div className={`font-semibold ${!isLogin ? "" : "hidden"}`}>
        Create your account
      </div>
      <div className="form-content w-full h-86 text-sm flex flex-col px-10 mt-4">
        <input
          className="border border-gray-300 rounded-md text-center py-1.5 focus:outline-none "
          type="text"
          placeholder={`${!isLogin ? "Username" : "Username, Email or Phone"}`}
          name="username"
          onChange={handleChange}
          value={values.username}
        />
        <div className="text-red-600 self-start text-xs mt-0.5 text-left">
          {errors.username}
        </div>
        <input
          className={`border border-gray-300 rounded-md text-center py-1.5 mt-2 focus:outline-none ${
            !isLogin ? "" : "hidden"
          }`}
          type="text"
          name="emailOrMobile"
          placeholder="Email or Mobile"
          onChange={handleChange}
          value={values.emailOrMobile}
        />
        <div
          className={`text-red-600 self-start text-xs mt-0.5 text-left ${!isLogin ? "" : "hidden"
          }`}
        >
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
          className={`border border-gray-300 rounded-md text-center py-1.5 mt-2 focus:outline-none ${
            !isLogin ? "" : "hidden"
          }`}
          type="password"
          name="rePassword"
          placeholder="Re-type Password"
          onChange={handleChange}
          value={values.rePassword}
        />
        <div className={`text-red-600 self-start text-xs mt-0.5 text-left ${!isLogin ? "" : "hidden"
          }`}>
          {errors.rePassword}
        </div>
        <div
          className={`text-cyan-blue self-start mt-3 text-xs ${
            isLogin ? "" : "hidden"
          }`}
        >
          forgot your password ?
        </div>
        <button className="bg-cyan-blue text-white border py-1.5 px-4 rounded-md text-center mt-3 hover:bg-blue-200 hover:text-cyan-blue">
          {!isLogin ? "Create your account now!" : "Sign in"}
        </button>
        <div
          className={`text-cyan-blue mt-3 font-semibold cursor-pointer hover:text-blue-300 hover:underline ${
            isLogin ? "" : "hidden"
          }`}
          onClick={switchToRegis}
        >
          Create an account
        </div>
        
      </div>
    </form>
  );
};
export default FormRegister;
