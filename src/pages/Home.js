import { BrowserRouter as Route } from "react-router-dom";
import FormLogin from "../components/FormLogin.js";
import homeBanner from "../images/homeBanner.jpg";
import ads1 from "../images/ads1.jpg";
import ads2 from "../images/ads2.jpg";
import ads3 from "../images/ads3.jpg";
import ads4 from "../images/ads4.jpg";

const Home = () => {
  const adsCollection = [ads1, ads2, ads3, ads4];
  return (
    <div className="Home">
      <div className="HomeBanner">
        <img src={homeBanner} alt="HomeBanner" className="object-cover" />
      </div>
      <div className="home-contents mt-8 px-7 font-kanit text-left md:px-14 md:mt-10">
        <div className="home-title text-lg md:text-xl lg:text-2xl xl:text-3xl">บริษัท โซสแควร์ จำกัด (มหาชน)</div>
        <div className="home-description text-xs font-light mt-2 md:text-sm lg:text-lg xl:text-xl">
          บริษัท โซสแควร์ จำกัด (มหาชน) จะเป็นองค์กรที่มีส่วนร่วมใน
          การพัฒนาคุณภาพของที่อยู่อาศัยด้วยการจัดจำหน่ายวัสดุ และ
          อุปกรณ์ก่อสร้างที่มีคุณภาพ รวมไปถึงเป็นผู้ให้บริการที่เป็นเลิศ
          ทั้งทางด้านการติดตั้ง ซ่อมแซม และบำรุงรักษา เพื่อคุณภาพชีวิต
          ที่ดีขึ้นของผู้อยู่อาศัย และเป็นที่ยอมรับโดยทั่วไป ตามพันธกิจที่ว่า “
          Superior Expert Affordable ”
        </div>
      </div>
      <div className="flex justify-center md:mt-4">
        <div className="HomeBanner2 grid grid-cols-2 gap-2 justify-items-center w-11/12 md:px-24 lg:px-32 xl:px-48">
        {adsCollection.map((ads, index) => {
          return (
            <img key={index} src={ads} alt={`${ads}`} className="w-36 h-36 md:w-40 md:h-40 lg:w-56 lg:h-56 xl:w-72 xl:h-72" />
          );
        })}
      </div>
      </div>
      
      <Route path="/login" component={FormLogin} />
    </div>
  );
};
export default Home;
