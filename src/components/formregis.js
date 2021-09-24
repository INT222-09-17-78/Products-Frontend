import { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { taggedTemplateExpression } from "@babel/types";
const FormRegister = () => {
  console.log("regis render");
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    password: "",
    emailOrMobile: "",
    rePassword: "",
  });
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:5000/api/users")
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        if (!error.response || error.response.status === 401) {
          console.log(error.response);
        }
      });
  }, []);


  return (

    // <table>
    //     <thead>
    //       <tr>
    //         <th scope="col">id</th>
    //         <th scope="col">username</th>
    //         <th scope="col">moblie</th>
    //         <th scope="col">email</th>
    //         <th scope="col">role</th>
    //         <th scope="col">action</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {userData.map((user, index) => {
    //         return (
    //           <tr key={index}>
    //             <td>{user.id}</td>
    //             <td>{user.username}</td>
    //             <td>{user.moblie ? user.moblie : "-"}</td>
    //             <td>{user.email ? user.email : "-"}</td>
    //             <td>{user.role}</td>
    //             <td>
    //               <MoreVertIcon
    //                 style={{ cursor: "pointer" }}
    //               />
    //             </td>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>

    <>


      <section class="container mx-auto p-6 font-mono">
        <button className="flex items-start ml-6 mb-2 bg-cyan-blue text-white border py-1.5 px-4 rounded-md text-center mt-3 hover:bg-blue-200 hover:text-cyan-blue">
          Add User
        </button>
        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">

            <table class="w-full">
              <thead>
                <tr class="text-center text-md font-semibold tracking-wide text-gray-900 bg-red-600 uppercase border-gray-600 ">

                </tr>
                <tr class="text-center text-md font-semibold tracking-wide text-gray-900 bg-gray-100 uppercase  border-gray-600">
                  <th class="px-4 py-3">id</th>
                  <th class="px-4 py-3">username</th>
                  <th class="px-4 py-3">mobile</th>
                  <th class="px-4 py-3">email</th>
                  <th class="px-4 py-3">role</th>
                  <th class="px-4 py-3">action</th>
                </tr>

              </thead>
              <tbody class="bg-white">
                {userData.map((user, index) => {
                  return (
                    <tr key={index} class="text-gray-700">
                      <td class="px-4 py-3 border">
                        <div class="flex items-center text-sm">
                          <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                            <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div>
                          <div>
                            <p class="font-semibold text-black">{user.id}</p>
                            {/* <p class="text-xs text-gray-600">Developer</p> */}
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-ms font-semibold border">{user.username}</td>
                      {/* <td class="px-4 py-3 text-xs border">
              <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">{user.moblie ? user.moblie : "-"}</span>
            </td> */}
                      <td class="px-4 py-3 text-sm border">{user.mobile ? user.mobile : "-"}</td>
                      <td class="px-4 py-3 text-sm border">{user.email ? user.email : "-"}</td>
                      <td class="px-4 py-3 text-sm border">{user.role}</td>
                      <td class="py-4 px-6 border-b border-grey-light">
                        <a href="#" class="font-semibold leading-tight text-green-700 bg-green-100 rounded-sm py-1 px-3 mx-2">Edit</a>
                        <a href="#" class="font-semibold leading-tight text-red-700 bg-red-100 rounded-sm py-1 px-3 mx-2">Delete</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>


  );
};
export default FormRegister;
