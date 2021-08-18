// import mobileBanner from "../images/mobliebanner.png";
// import banner from "../images/banner.jpg";
// import iconFacebook from "../images/Iconfacebook.png";
// import iconGmail from "../images/Icongmail.png";
// import iconTwitter from "../images/Icontwitter.png";
import FormRegister from "./formregis";
import FormLogin from "./formlogin";
// const BaseLogin = () => {
//   // const [usersList, setUserList] = useState([]);

//   // useEffect(() => {
//   //   Axios.get("http://localhost:3001/data").then((response) => {
//   //     setUserList(response.data);
//   //     console.log(response.data);
//   //   });
//   // }, []);
//   // const user = usersList.map((user) =>
//   //   <div key={user.id}>
//   //     {user.username}
//   //     {user.password}
//   //   </div>
//   // );

//   return (
//     <div className="regis flex flex-col bg-snow w-72 h-104 sm:w-108 sm:h-80 rounded-lg shadow-lg sm:flex sm:flex-row-reverse text-sm absolute">
//       <div className="w-full h-108 rounded-lg sm:h-full sm:w-100 sm:rounded-none sm:rounded-r-lg sm:p-0 sm:flex sm:flex-col sm:justify-center">

//         <FormRegister textLogin="Sign In" textRegis="Create your accout" forgotPass="I forgot my password" fillText="This field is required"/>
//         {/* <div className="border-b border-gray-700 mt-7 sm:hidden"></div>
//         <div className="mt-4  text-gray-600 sm:mt-1">or sign up with</div>
//         <div className="flex flex-row space-x-4 justify-center mt-2">
//           <img className="w-10 h-10" src={iconFacebook} alt="iconfacebook" />
//           <img className="w-10 h-10" src={iconGmail} alt="icongmail" />
//           <img className="w-10 h-10" src={iconTwitter} alt="icontwitter" />
//         </div> */}
//       </div>
//       <div className="w-full h-72 rounded-b-md mt-5 sm:mt-0 sm:h-full sm:w-2/5 sm:rounded-l-lg sm:rounded-br-none">
//         <img
//           className="mobileBanner rounded-b-lg w-full h-full sm:hidden"
//           src={mobileBanner}
//           alt="Home"
//         />
//         <img
//           className="banner rounded-l-lg hidden sm:flex h-full w-full"
//           src={banner}
//           alt="Home"
//         />
//       </div>
//     </div>
//   );
// };
// export default BaseLogin;
import tiles from "../images/tiles.jpg";
const BaseLogin = () => {
  return (
    <div className="BaseLogin w-screen h-screen flex justify-center overflow-auto absolute top-0 pt-20 bg-black bg-opacity-50">
      <div className="bg-snow w-72 h-108 shadow-xl rounded-xl flex items-end">
        <div className="img-container w-full">
          <FormLogin/>
          <img src={tiles} alt="Tiles" className="rounded-b-xl w-full h-36" />
        </div>
      </div>
    </div>
  );
};
export default BaseLogin;
