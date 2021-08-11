import mobileBanner from "../images/mobliebanner.png";
import banner from "../images/banner.jpg";
import iconFacebook from "../images/Iconfacebook.png";
import iconGmail from "../images/Icongmail.png";
import iconTwitter from "../images/Icontwitter.png";
import { useState} from "react";
import Axios from "axios";

const Title = () => {
  return <h1 className="font-medium pt-16 sm:pt-2">Create your account</h1>;
};
const FormRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(true);

  // const checkForm = () =>{
  //   if(username.trim().length>0 && email.trim().length>0 && password.trim().length>0){
  //     setFormValid(true)
  //   }else{
  //     setFormValid(false)
  //   }
  // }
  const inputUsername = (event) => {
    setUsername(event.target.value);
  };
  const inputPhoneOrEmail = (event) => {
    setEmail(event.target.value);
  };
  const inputPassword = (event) => {
    setPassword(event.target.value);
  };
  const regisAccount = (event) => {
    event.preventDefault();

    const mailformat = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
    //validate all field should not be empty
    if (
      username.trim().length <= 0 &&
      email.trim().length <= 0 &&
      password.trim().length <= 0
    ) {
      setFormValid(false);
      console.log("All field are required");
    } 
    else if(!mailformat.test(email)){
      setFormValid(false);
      console.log("Email is invaild");
    }
    else{
      setFormValid(true);
      console.log("สมัครเรียบร้อย!!");
      const accountData = {
        username,
        email,
        password,
      };
      console.log(accountData);
      setUsername("");
      setEmail("");
      setPassword("");
      Axios.post("http://localhost:5000/api",{
        username: username,
        password: password
      }).then(()=>{
        console.log("very good")
      })

    }
  };

  // useEffect(()=>{
  //   if(username.trim().length>0 && email.trim().length>0 && password.trim().length>0){
  //     setFormValid(true)
  //   }else{
  //     setFormValid(false)
  //   }
  // },[username,email,password])

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
          placeholder="Email"
          onChange={inputPhoneOrEmail}
          value={email}
        />
        <input
          className="border border-gray-300 py-1.5 px-6 rounded-md text-center "
          type="password"
          placeholder="Password"
          onChange={inputPassword}
          value={password}
        />
      </div>
      <div className="text-red-500 mr-28 sm:mr-32">
        {/* {formValid ? null : "please!!"} */}
      </div>
      <input
        className="mt-5 bg-cyan-blue text-white border border-gray-300 py-1.5 px-6 rounded-md text-center sm:mt-3"
        type="submit"
        value="Create your account now!"
      />
    </form>
  );
};
const Regis = () => {
  // const [usersList, setUserList] = useState([]);

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/data").then((response) => {
  //     setUserList(response.data);
  //     console.log(response.data);
  //   });
  // }, []);
  // const user = usersList.map((user) =>
  //   <div key={user.id}>
  //     {user.username}
  //     {user.password}
  //   </div>
  // );

  return (
    <div className="regis flex flex-col bg-snow w-72 h-108 sm:w-108 sm:h-80 rounded-lg shadow-lg sm:flex sm:flex-row-reverse text-sm absolute">
      <div className="w-full h-108 rounded-lg sm:h-full sm:w-100 sm:rounded-none sm:rounded-r-lg p-2">
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
