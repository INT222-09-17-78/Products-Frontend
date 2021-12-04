import { useState, useEffect } from "react";
import Axios from "axios";
import noimg from "../images/no-img.jpg";
import styled from "styled-components";

Axios.defaults.withCredentials = true;
const PriceInput = styled.input`
  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const Container1 = styled.div`
  height: fit-content;
`;
const Image = styled.img`
  @media (min-width: 425px) {
    width: 14rem;
    height: 14rem;
  }
  @media (min-width: 768px) {
    width: 16rem;
    height: 16rem;
  }
  @media (min-width: 1024px) {
    width: 20rem;
    height: 20rem;
  }
  @media (min-width: 1440px) {
    width: 25rem;
    height: 25rem;
  }
`;
const FormAddProduct = (props) => {
  const [brands, setBrands] = useState([]);
  // const [colors, setcolors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [, setImage] = useState([]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/show/brands`)
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
    Price: "",
    Description: "",
    ProduceDate: "",
    BrandId: 0,
    Image: "",
    Sizes: [],
    Patterns: [],
  });
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
    } else if (name === "Patterns") {
      let newImgData = [...values.Patterns];
      newImgData[event.target.id].color = value;
      setImage(newImgData);
    } else if (name === "Price") {
      if (parseInt(value) !== 0) {
        if (parseInt(value) > parseInt(event.target.max)) {
          setValues({
            ...values,
            [name]: event.target.max,
          });
        } else {
          setValues({
            ...values,
            [name]: value,
          });
        }
      }
    } else {
      // if (name === "ProdName") {
      //   if (!value) {
      //     errors.ProdName = "This field is required";
      //   }else{
      //     errors.ProdName = "";
      //   }
      // }
      setValues({
        ...values,
        [name]: value,
      });
    }
  };
  const [img, setImg] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
        setSelectedImage(e.target.files[0]);
      };
      reader.readAsDataURL(e.target.files[0]);
      setValues({
        ...values,
        Image: e.target.files[0].name,
      });
    }
  };
  const [selectedImages, setSelectedImages] = useState([]);
  const [imgs, setImgs] = useState([]);
  const onChangePictures = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (
          e.target.name ===
          patterns.find((pattern) => pattern.patternId === e.target.name)
            .patternId
        ) {
          if (
            reader.result !==
            selectedImages.find((img) => img === reader.result)
          ) {
            let newImgData = [...selectedImages];
            newImgData[e.target.id] = reader.result;
            setSelectedImages(newImgData);

            let newPostData = [...imgs];
            newPostData[e.target.id] = e.target.files[0];
            setImgs(newPostData);

            let newData = [...values.Patterns];
            newData[e.target.id] = { PatternImage: e.target.files[0].name };
            setValues({
              ...values,
              Patterns: newData,
            });
          } else {
            e.target.value = null;
          }
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const [errors] = useState({});
  const addProduct = (event) => {
    console.log(values);
    event.preventDefault();
    if (!values.ProdName) {
      errors.ProdName = "This field is required";
    } else {
      errors.ProdName = "";
    }
    if (!values.Image) {
      errors.Image = "Image is required";
    } else {
      errors.Image = "";
    }
    if (!values.BrandId) {
      errors.BrandId = "This field is required";
    } else {
      errors.BrandId = "";
    }
    if (!values.Price) {
      errors.Price = "This field is required";
    } else {
      errors.Price = "";
    }
    if (!values.Description) {
      errors.Description = "This field is required";
    } else {
      errors.Description = "";
    }
    if (!values.ProduceDate) {
      errors.ProduceDate = "This field is required";
    } else {
      errors.ProduceDate = "";
    }
    if (values.Sizes.length === 0) {
      errors.Sizes = "This field is required";
    } else {
      errors.Sizes = "";
    }
    if (
      errors.ProdName ||
      errors.Image ||
      errors.BrandId ||
      errors.Price ||
      errors.Description ||
      errors.ProduceDate ||
      errors.Sizes
    ) {
      setValues({
        ...values,
        ProdName: values.ProdName,
        Image: values.Image,
        BrandId: values.BrandId,
        Price: values.Price,
        Description: values.Description,
        ProduceDate: values.ProduceDate,
        Sizes: values.Sizes,
      });
    } else {
      setValues({
        ...values,
        ProdName: values.ProdName,
        Image: values.Image,
        BrandId: values.BrandId,
        Price: values.Price,
        Description: values.Description,
        ProduceDate: values.ProduceDate,
        Sizes: values.Sizes,
      });
      const formData = new FormData();

      const jsonProduct = JSON.stringify({
        ProdName: values.ProdName,
        Price: values.Price,
        Description: values.Description,
        ProduceDate: values.ProduceDate,
        BrandId: values.BrandId,
        Image: values.Image,
        Sizes: values.Sizes,
        Patterns: values.Patterns,
      });
      formData.append("product", jsonProduct);
      formData.append("image", selectedImage);

      Axios.post(
        `${process.env.REACT_APP_API_URL}/api/create/product`,
        formData
      )
        .then((res) => {
          values.Patterns.forEach((pattern) => {
            pattern.ProdID = res.data.product.ProdID;
          });
          const formData = new FormData();
          formData.append("patterns", JSON.stringify(values.Patterns));
          for (let i = 0; i < imgs.length; i++) {
            formData.append("images", imgs[i]);
          }
          Axios.post(
            `${process.env.REACT_APP_API_URL}/api/create/pattern`,
            formData
          );
          window.alert('Add Product Success :D')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div
      onSubmit={addProduct}
      className="font-kanit p-5 lg:p-8 xl:p-10 w-screen xl:text-xl text-gray-700 lg:px-20"
    >
      <span className="flex pb-5 lg:pb-8 justify-center text-lg lg:text-xl xl:text-3xl">Add Product</span>
      <form className="px-5">
        <Container1 className="first-container rounded-xl border-2 border-gray-300 flex flex-col w-full h-full py-10 md:flex-row md:space-x-10 md:justify-center">
          <div className="previewImg flex justify-center flex-col items-center md:justify-start">
            <Image
              src={img ? img : noimg}
              className="bg-white rounded-xl object-cover h-48 w-48"
              alt="200 X 200"
            />
            <input
              id="profilePic"
              type="file"
              name="Image"
              onChange={onChangePicture}
              className="text-sm mt-7 w-48 xl:text-xl lg:w-60 xl:w-72"
            />
            {errors.Image ? (
              <span className="text-red-600 text-xs w-full text-left pt-5 ml-10 md:ml-5">
                {errors.Image}
              </span>
            ) : null}
          </div>

          <div className="container-input space-y-4 flex flex-col w-full mt-5 md:mt-0 md:w-72 px-5 xl:w-112">
            <div className="flex">
              <label className="pr-2">name</label>
              <input
                type="text"
                name="ProdName"
                onChange={handleChange}
                value={values.ProdName}
                className="border-b-2 border-gray-300 focus:outline-none w-full"
              />
            </div>
            {errors.ProdName ? (
              <span className="text-red-600 text-left text-xs">
                {errors.ProdName}
              </span>
            ) : null}
            <div className="flex">
              <label className="pr-2">brand</label>
              <select
                name="BrandId"
                onChange={handleChange}
                value={values.BrandId}
                className="border-b-2 border-gray-300 focus:outline-none w-full"
              >
                <option disabled value="0">
                  Choose a Brand
                </option>
                {brands.map((brand, i) => (
                  <option key={i} value={brand.BrandId}>
                    {brand.BrandName}
                  </option>
                ))}
              </select>
            </div>
            {errors.BrandId ? (
              <span className="text-red-600 text-left text-xs">
                {errors.BrandId}
              </span>
            ) : null}
            <div className="flex">
              <label className="pr-2">price</label>
              <PriceInput
                type="number"
                name="Price"
                onChange={handleChange}
                value={values.Price}
                className="border-b-2 border-gray-300 focus:outline-none w-full"
                onWheel={(e) => e.target.blur()}
                max="999999"
                onKeyDown={(e) =>
                  (e.key === "e" || e.key === "+" || e.key === "-") &&
                  e.preventDefault()
                }
                onPaste={(e) => e.preventDefault()}
              />
            </div>
            {errors.Price ? (
              <span className="text-red-600 text-left text-xs">
                {errors.Price}
              </span>
            ) : null}
            <div className="flex">
              <label className="pr-2">date</label>
              <input
                type="date"
                name="ProduceDate"
                onChange={handleChange}
                value={values.ProduceDate}
                className="border-b-2 border-gray-300 focus:outline-none  w-full"
              />
            </div>
            {errors.ProduceDate ? (
              <span className="text-red-600 text-left text-xs">
                {errors.ProduceDate}
              </span>
            ) : null}
            <div className="flex flex-col items-start">
              <label className="mb-2">Description</label>
              <textarea
                name="Description"
                onChange={handleChange}
                value={values.Description}
                className="border-2 border-gray-300 focus:outline-none  w-full h-32 px-1 pt-1"
                maxLength="300"
              />
            </div>
            {errors.Description ? (
              <span className="text-red-600 text-left text-xs">
                {errors.Description}
              </span>
            ) : null}
            <div className="flex flex-col items-start">
              <label>Size</label>
              {sizes
                ? sizes.map((size, i) => (
                    <div key={i}>
                      <input
                        className="mr-2"
                        key={i}
                        name="Sizes"
                        onChange={handleChange}
                        value={size.SizeName}
                        type="checkbox"
                      />
                      {size.Description}
                    </div>
                  ))
                : null}
            </div>
            {errors.Sizes ? (
              <span className="text-red-600 text-left text-xs">
                {errors.Sizes}
              </span>
            ) : null}
          </div>
        </Container1>
        <div className="second-container rounded-xl border-2 border-gray-300 pb-16 mt-5 flex flex-col px-12">
          <span className="flex py-6 justify-center md:justify-start lg:justify-start">
            Patterns
          </span>
          <div className="md:grid md:grid-cols-3 md:gap-x-10 md:justify-items-center lg:gap-x-10 xl:grid-cols-5 flex flex-col justify-center items-center md:items-start px-3 md:px-0 lg:px-5 xl:px-0">
            {patterns.map((pattern, i) => (
              <div
                key={i}
                className="container-input flex flex-col items-center"
              >
                <div className="previewImage flex justify-center flex-col items-center w-48">
                  <img
                    src={selectedImages[i] ? selectedImages[i] : noimg}
                    className="bg-gray-500 w-full h-48 rounded-xl"
                    alt="200 X 200"
                  />
                  <input
                    id={i}
                    name={pattern.patternId}
                    type="file"
                    onChange={onChangePictures}
                    className="text-sm w-full mt-7"
                  />
                </div>
                {selectedImages[i] ? (
                  <div className="flex">
                    <input
                      id={i}
                      type="text"
                      name="Patterns"
                      onChange={handleChange}
                      value={values.Patterns.color}
                      className="border-b-2 border-gray-300 focus:outline-none w-full mt-5 text-center text-base"
                      placeholder="Type your tile color"
                    />
                  </div>
                ) : null}

                <div>
                  <button
                    id={pattern.patternId}
                    name={i}
                    className="border-red-700 border-4 bg-red-700 rounded-2xl mb-10 px-7 mt-8 text-white text-base"
                    onClick={(event) => {
                      event.preventDefault();
                      const id = event.target.id;
                      setPatterns(
                        patterns.filter((item) => item.patternId !== id)
                      );
                      selectedImages.splice(i, 1);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
            {patterns.length === selectedImages.length || !patterns.length ? (
              <div
                className="img-container bg-gray-200 w-48 h-48 rounded-2xl flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setPatterns([
                    ...patterns,
                    { patternId: `pattern${patterns.length}` },
                  ]);
                }}
              >
                <span className="text-gray-400 material-icons text-7xl">
                  add_circle
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <button className="bg-gray-500 text-white rounded-2xl px-5 py-1.5 mt-8 text-sm xl:text-2xl xl:px-8 xl:py-2.5 xl:rounded-full">
          add product
        </button>
      </form>
    </div>
  );
};
export default FormAddProduct;
