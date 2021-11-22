import { useState, useEffect } from "react";
import Axios from "axios";
import noimg from "../images/no-img.png";
Axios.defaults.withCredentials = true;
const FormAddProduct = (props) => {
  const [brands, setBrands] = useState([]);
  // const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [patterns, setPatterns] = useState([]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/show/brands`)
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // Axios.get(`${process.env.REACT_APP_API_URL}/api/show/colors`)
    //   .then((response) => {
    //     setColors(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    Axios.get(`${process.env.REACT_APP_API_URL}/api/show/sizes`)
      .then((response) => {
        setSizes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [values, setValues] = useState({
    ProdName: "",
    Price: 0,
    Description: "",
    ProduceDate: "",
    BrandID: 0,
    Sizes: [],
    Images: [],
  });
  const [errors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "Sizes") {
      if (event.target.checked) {
        setValues({
          ...values,
          [name]: [...values.Sizes, { SizeName: value }],
        });
      } else {
        const index = values.Sizes.findIndex((size) => size.SizeName === value);
        values.Sizes.splice(index, 1);
        setValues({ ...values, [name]: [...values.Sizes] });
      }
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const addProduct = (event) => {
    console.log(values);
    event.preventDefault();
    Axios.post(`${process.env.REACT_APP_API_URL}/api/create/product`, {
      ProdName: values.ProdName,
      Price: values.Price,
      Description: values.Description,
      ProduceDate: values.ProduceDate,
      BrandID: values.BrandID,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // errors.message = error.response.data.message;
      });
  };
  const [imgData, setImgData] = useState([]);
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
      };
      reader.readAsDataURL(e.target.files[0]);
      setValues({
        ...values,
        Images: [...values.Images,e.target.files[0].name],
      });
    }
  };

  return (
    <div onSubmit={addProduct} className="font-kanit w-screen py-8">
      <span className="flex mb-8 justify-center">Add Product</span>
      <form className="px-5">
        <div className="first-container rounded-xl border-2 border-gray-400 flex flex-col items-center w-full h-full p-10">
          {/* <div className="previewProfilePic flex justify-center flex-col items-center w-48">
            <img
              src={imgData ? imgData : noimg}
              className="bg-gray-500 w-full h-48 rounded-xl"
              alt="200 X 200"
            />
            <input
              id="profilePic"
              type="file"
              name="Image"
              onChange={onChangePicture}
              className="text-sm w-full mt-7"
            />
          </div> */}

          <div className="container-input space-y-4 flex flex-col w-full">
            <div className="flex">
              <label className="pr-2">name</label>
              <input
                type="text"
                name="ProdName"
                onChange={handleChange}
                value={values.ProdName}
                className="border-b-2 border-black focus:outline-none w-full"
              />
            </div>
            <div className="flex">
              <label className="pr-2">brand</label>
              <select
                name="BrandID"
                onChange={handleChange}
                value={values.BrandID}
                className="border-b-2 border-black focus:outline-none w-full"
              >
                <option disabled value="0">
                  Choose a Brand
                </option>
                {brands.map((brand, i) => (
                  <option key={i} value={brand.BrandID}>
                    {brand.BrandName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex">
              <label className="pr-2">price</label>
              <input
                type="text"
                name="Price"
                onChange={handleChange}
                value={values.Price}
                className="border-b-2 border-black focus:outline-none w-full"
              />
            </div>
            <div className="flex">
              <label className="pr-2">date</label>
              <input
                type="date"
                name="ProduceDate"
                onChange={handleChange}
                value={values.ProduceDate}
                className="border-b-2 border-black focus:outline-none  w-full"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="mb-2">Description</label>
              <textarea
                name="Description"
                onChange={handleChange}
                value={values.Description}
                className="border-2 border-black focus:outline-none  w-full h-32"
              />
            </div>
            <div className="flex flex-col items-start">
              <label>Size</label>
              {sizes.map((size, i) => (
                <div key={i}>
                  <input
                    className="mr-2"
                    key={i}
                    name="Sizes"
                    onChange={handleChange}
                    value={size.SizeName}
                    type="checkbox"
                  />
                  {size.SizeName}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="second-container rounded-xl border-2 border-gray-400 pb-16 mt-5 flex flex-col items-center">
          <span className="flex py-6">Patterns</span>
          {patterns.map((pattern, i) => (
            <div
              key={i}
              className="container-input flex flex-col"
            >
              <div className="previewProfilePic flex justify-center flex-col items-center w-48">
            <img
              src={imgData ? imgData : noimg}
              className="bg-gray-500 w-full h-48 rounded-xl"
              alt="200 X 200"
            />
            <input
              id="profilePic"
              type="file"
              name="Image"
              onChange={onChangePicture}
              className="text-sm w-full mt-7"
            />
          </div>

              <div className="flex">
                <input
                  type="text"
                  name="Colors"
                  onChange={handleChange}
                  value={values.Colors}
                  className="border-b-2 border-black focus:outline-none w-full mt-5 text-center"
                  placeholder="Type your tile color"
                />
              </div>

              <div>
                <button
                  id={pattern.patternId}
                  className="border-red-700 border-4 text-red-700 rounded-2xl mb-10 px-7 mt-5"
                  onClick={(event) => {
                    event.preventDefault()
                    const id = event.target.id;
                    setPatterns(
                      patterns.filter((item) => item.patternId !== id)
                    );
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
          <div
            className="img-container bg-gray-200 w-48 h-48 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={() => {
              setPatterns([...patterns,{patternId:`pattern${patterns.length}`,color:""}]);
            }}
          >
            <span className="text-gray-400 material-icons text-7xl">
              add_circle
            </span>
          </div>
        </div>
        <button className="border-gray-400 border-4 text-gray-700 rounded-2xl px-7 mt-8">
          add product
        </button>
      </form>
    </div>
  );
};
export default FormAddProduct;
