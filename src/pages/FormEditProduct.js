import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
const FormEditProduct = () => {
  const { productId } = useParams();
  const [imageName, setImageName] = useState("");
  const start_and_end = (str) => {
    if (str.length > 20) {
      return str.substr(0, 6) + "..." + str.substr(str.length - 8, str.length);
    }
    return str;
  };
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/api/show/product/${productId}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      }
    ).then((response) => {
      // console.log(response.data);
      setValues({
        ProdID: response.data.ProdID,
        ProdName: response.data.ProdName,
        Price: response.data.Price,
        Description: response.data.Description,
        ProduceDate: new Date(response.data.ProduceDate)
          .toISOString()
          .slice(0, 10),
        BrandId: response.data.BrandId,
        Image: response.data.Image,
        Sizes: response.data.Sizes,
        Patterns: response.data.Patterns,
      });
      setImg(
        `${process.env.REACT_APP_API_URL}/api/download/image/${response.data.Image}`
      );
      setImageName(start_and_end(response.data.Image));

      let array = [];
      let array2 = [];
      for (let i = 0; i < response.data.Patterns.length; i++) {
        array2.push({
          patternId: `pattern${i}`,
          patternName: response.data.Patterns[i].PatternImage,
        });
        array.push(
          `${process.env.REACT_APP_API_URL}/api/download/image/pattern/${response.data.Patterns[i].PatternImage}`
        );
      }
      setSelectedImages(array);
      setPatterns(array2);
    });
  }, [productId]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [, setImage] = useState([]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/show/brands`)
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
      });
    Axios.get(`${process.env.REACT_APP_API_URL}/api/show/sizes`)
      .then((response) => {
        setSizes(response.data);
      })
      .catch((error) => {
      });
  }, []);
  const [values, setValues] = useState({
    ProdID: "",
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
        const index = values.Sizes.findIndex(
          (size) => size.SizeName === value
        );
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
      setValues({
        ...values,
        [name]: value,
      });
    }
  };
  const [img, setImg] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageNow, setImageNow] = useState(null);
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
        setSelectedImage(e.target.files[0]);
      };
      reader.readAsDataURL(e.target.files[0]);
      setImageNow(start_and_end(e.target.files[0].name));
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
  const editProduct = (event) => {
    event.preventDefault();
    // console.log(values.Patterns)
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
        Patterns: values.Patterns
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
        Patterns: values.Patterns
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

      Axios.put(
        `${process.env.REACT_APP_API_URL}/api/update/product/${values.ProdID}`,
        formData
      )
        .then(() => {
          values.Patterns.forEach((pattern) => {
            pattern.ProdID = values.ProdID;
          });
          const formData = new FormData();
          formData.append("patterns", JSON.stringify(values.Patterns));
          for (let i = 0; i < imgs.length; i++) {
            formData.append("images", imgs[i]);
          }
          Axios.put(
            `${process.env.REACT_APP_API_URL}/api/update/patterns`,
            formData
          );

          window.alert('Saved Success :)')
        })
        .catch((error) => {
        });
    }
  };

  return (
    <div
      onSubmit={editProduct}
      className="font-kanit p-5 lg:p-8 xl:p-10 w-screen xl:text-xl text-gray-700 lg:px-20"
    >
      <span className="flex pb-5 lg:pb-8 justify-center text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Edit Product
      </span>
      <form className="px-5">
        <Container1 className="first-container rounded-xl border-2 border-gray-300 flex flex-col w-full h-full py-10 md:flex-row md:space-x-10 md:justify-center">
          <div className="previewImg flex justify-center flex-col items-center md:justify-start">
            <Image
              src={img ? img : noimg}
              className="bg-white rounded-xl object-cover h-48 w-48"
              alt="200 X 200"
            />
            <div className="mt-7 flex w-full text-sm items-center xl:text-xl justify-center">
              <label
                style={{ backgroundColor: "#EFEFEF", paddingInline: "7px" }}
                htmlFor="files"
                className="btn text-left border border-gray-500 rounded-sm py-0.5 mr-1 flex-shrink-0"
              >
                Choose File
              </label>
              <span>{imageNow ? imageNow : imageName}</span>
            </div>
            <input
              id="files"
              type="file"
              name="Image"
              onChange={onChangePicture}
              className="text-sm w-full h-full mt-7 md:text-lg lg:text-xl xl:text-2xl hidden"
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
                        checked={values.Sizes.some(
                          (checkedSize) =>
                            checkedSize.SizeName === size.SizeName
                        )}
                      />
                      {size.SizeName}
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
                  <div className="mt-7 flex justify-start w-full text-sm items-center">
                    <label
                      style={{
                        backgroundColor: "#EFEFEF",
                        paddingInline: "7px",
                      }}
                      htmlFor={i}
                      className="btn text-left border border-gray-500 rounded-sm py-0.5 mr-1 flex-shrink-0"
                    >
                      Choose File
                    </label>
                    <span>
                      {values.Patterns[i]
                        ? values.Patterns[i].PatternImage
                          ? start_and_end(values.Patterns[i].PatternImage)
                          : start_and_end(pattern.PatternImage)
                        : "No file chosen"}
                    </span>
                  </div>
                  <input
                    id={i}
                    name={pattern.patternId}
                    type="file"
                    onChange={onChangePictures}
                    className="text-sm w-full mt-7 hidden"
                  />
                </div>
                {selectedImages[i] ? (
                  <div className="flex">
                    <input
                      id={i}
                      type="text"
                      name="Patterns"
                      onChange={handleChange}
                      value={
                        values.Patterns[i]
                          ? values.Patterns[i].color
                          : values.Patterns.color
                      }
                      className="border-b-2 border-black focus:outline-none w-full mt-5 text-center"
                      placeholder="Type your tile color"
                    />
                  </div>
                ) : null}

                <div>
                  <button
                    id={pattern.patternId}
                    name={pattern.patternName}
                    className="border-red-700 border-4 bg-red-700 rounded-2xl mb-10 px-7 mt-8 text-white text-base"
                    onClick={(event) => {
                                        event.preventDefault();
                                        if(window.confirm('Are you sure to delete the pattern ?')){
                                          const id = event.target.id;
                                        const name = event.target.name
                                        setPatterns(
                                          patterns.filter((item) => item.patternId !== id)
                                        );
                                        selectedImages.splice(i, 1);
                                        values.Patterns.splice(i, 1)
                                        Axios.delete(
                                          `${process.env.REACT_APP_API_URL}/api/delete/pattern/${name}`
                                        )
                                          .then((response) => {
                                            
                                          })
                                          .catch((error) => {
                                          });
                                        }
                                        
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
          save change
          
        </button>
      </form>
    </div>

  );
};
export default FormEditProduct;
