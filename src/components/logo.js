// import { useState, useEffect } from "react";
const Logo = (props) => {
  return (
    <div className={`logo bg-whitesmoke rounded-full text-xs font-bold text-cyan-blue flex flex-shrink-0 items-center justify-center z-10 ${props.text_size} ${props.top} ${props.width} ${props.height} ${props.display} xsm:${props.widthxms} xsm:${props.heightxms} xsm:text-base lg:text-lg md:${props.widthmd} md:${props.heightmd} lg:${props.widthlg} lg:${props.heightlg}`}>LOGO</div>
  )
}
export default Logo;