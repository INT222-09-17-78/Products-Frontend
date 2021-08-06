import mobileBanner from "../images/mobliebanner.png";
import banner from "../images/banner.jpg";
import iconFacebook from "../images/Iconfacebook.png";
import iconGmail from "../images/Icongmail.png";
import iconTwitter from "../images/Icontwitter.png";
import { useState } from "react";


const Title = () => {
  return <h1 className="font-medium pt-16 sm:pt-2">Create your account</h1>;
};
const FormRegister = () => {
  const [username, setUsername] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid,setFormValid] = useState(true);

  // const checkForm = () =>{
  //   if(username.trim().length>0 && phoneOrEmail.trim().length>0 && password.trim().length>0){
  //     setFormValid(true)
  //   }else{
  //     setFormValid(false)
  //   }
  // } 
  const inputUsername = (event) => {
    setUsername(event.target.value);
  };
  const inputPhoneOrEmail = (event) => {
    setPhoneOrEmail(event.target.value);
  };
  const inputPassword = (event) => {
    setPassword(event.target.value);
  };
  const regisAccount = (event) => {
    event.preventDefault();
    if(username.trim().length>0 && phoneOrEmail.trim().length>0 && password.trim().length>0){
      setFormValid(true)
      console.log("สมัครเรียบร้อย!!");
      const accountData = {
        username,
        phoneOrEmail,
        password,
      };
      console.log(accountData);
      setUsername("");
      setPhoneOrEmail("");
      setPassword("");
    }else{
      setFormValid(false)
      console.log("please!!");
    }
  };

  // useEffect(()=>{
  //   if(username.trim().length>0 && phoneOrEmail.trim().length>0 && password.trim().length>0){
  //     setFormValid(true)
  //   }else{
  //     setFormValid(false)
  //   }
  // },[username,phoneOrEmail,password])

  return (
    <form onSubmit={regisAccount}>
      <div className="form-control space-y-2 mt-5 flex flex-col py-1.5 px-6 sm:mt-2">
        <input
          className="border border-gray-300 py-1.5 px-6 rounded-md text-center "
          type="text"
          placeholder="Username"
          onChange={inputUsername}
          value={username}
        />
        <input
          className="border border-gray-300 py-1.5 px-6 rounded-md text-center "
          type="text"
          placeholder="Email or Moblie"
          onChange={inputPhoneOrEmail}
          value={phoneOrEmail}
        />
        <input
          className="border border-gray-300 py-1.5 px-6 rounded-md text-center "
          type="password"
          placeholder="Password"
          onChange={inputPassword}
          value={password}
        />
      </div>
      <div className="text-red-500 mr-28 sm:mr-32">{ formValid ? null : "ใส่ข้อมูลก่อนดิ้ ไอสัส!!" }</div>
      <input
        className="mt-5 bg-cyan-blue text-white border border-gray-300 py-1.5 px-6 rounded-md text-center sm:mt-3"
        type="submit"
        value="Create your account now!"
      />
    </form>
  );
};
const Regis = () => {
  return (
    <div className="regis flex flex-col bg-snow w-4/5 h-5/6 rounded-lg shadow-lg sm:flex sm:flex-row-reverse text-sm">
      <div className="w-full h-3/4 rounded-lg sm:h-full sm:w-3/5 sm:rounded-none sm:rounded-r-lg">
        <Title />
        <FormRegister />
        <div className="border-b border-gray-700 mt-7 sm:hidden"></div>
        <div className="mt-4  text-gray-600 sm:mt-1">or sign up with</div>
        <div className="flex flex-row space-x-4 justify-center mt-2">
          <img className="w-10 h-10" src={iconFacebook} alt="iconfacebook" />
          <img className="w-10 h-10" src={iconGmail} alt="icongmail" />
          <img className="w-10 h-10" src={iconTwitter} alt="icontwitter" />
        </div>
      </div>
      <div className="w-full h-1/4 rounded-b-md mt-5 sm:mt-0 sm:h-full sm:w-2/5 sm:rounded-l-lg sm:rounded-br-none">
        <img
          className="mobileBanner rounded-b-lg w-full h-full sm:hidden"
          src={mobileBanner}
          alt="Home"
        />
        <img
          className="banner rounded-l-lg hidden sm:flex h-full w-full"
          src={banner}
          alt="Home"
        />
      </div>
    </div>
  );
};
export default Regis;
