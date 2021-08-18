// import { useState, useEffect } from "react";
const Logo = (props) => {
  return (
    <div className={`logo bg-whitesmoke rounded-full text-md font-bold text-cyan-blue flex flex-shrink-0 items-center justify-center z-10 ${props.text_size} ${props.top} ${props.width} ${props.height} ${props.display}`}>LOGO</div>
  )
}
export default Logo;