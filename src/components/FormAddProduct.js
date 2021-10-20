import { useState } from "react";
import Axios from "axios";

Axios.defaults.withCredentials = true;
const FormAddProduct = (props) => {
  return (
    <div className="font-kanit w-screen">
      <span className="flex p-8">Add Product</span>
      <form className="px-5">
        <div className="first-container rounded-xl border-2 border-gray-400 flex flex-col items-center w-full h-full p-10">
          <div className="img-container bg-gray-400 w-48 h-48 rounded-lg"></div>
          <button className="border-gray-400 border-4 rounded-2xl px-7 mt-5">
            add
          </button>
          <div className="container-input space-y-4 mt-7 flex flex-col w-full">
            <div className="flex">
              <label className="pr-2">name</label>
              <input className="border-b-2 border-black focus:outline-none w-full" />
            </div>
            <div className="flex">
              <label className="pr-2">brand</label>
              <select className="border-b-2 border-black focus:outline-none w-full">
                <option value="" disabled selected>
                  Choose your brand
                </option>
              </select>
            </div>
            <div className="flex">
              <label className="pr-2">price</label>
              <input className="border-b-2 border-black focus:outline-none  w-full" />
            </div>
            <div className="flex">
              <label className="pr-2">date</label>
              <input
                type="date"
                className="border-b-2 border-black focus:outline-none  w-full"
              />
            </div>
            <div className="flex flex-col items-start">
              <label>Description</label>
              <textarea className="border-2 border-black focus:outline-none  w-full h-40" />
            </div>
          </div>
        </div>
        <div className="second-container rounded-xl border-2 border-gray-400 mt-8 flex flex-col items-center">
          <span className="flex p-8">Patterns</span>
          <div className="container-input flex flex-col">
            <div className="img-container bg-gray-400 w-48 h-48 rounded-lg"></div>
            <div className="flex">
              <select className="border-b-2 border-black focus:outline-none mt-5 w-full">
                <option value="" disabled selected>
                  Choose a color
                </option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default FormAddProduct;
