import React, { useEffect, useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "./Slider.scss";
import {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
} from "../../../assets";
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 8 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 8 ? 0 : (prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide]);

  const scrollToSection = (goTo) => {
    document.querySelector("#" + goTo).scrollIntoView({ behavior: "smooth" });
  };
  const menuItemClickHandler = (section) => {
    scrollToSection(section);
  };

  return (
    <div className="slider"  >
      <div
      onClick={() => menuItemClickHandler("category")}
        className="container"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <img src={img1} alt="img1" />
        <img src={img2} alt="img2" />
        <img src={img3} alt="img3" />
        <img src={img4} alt="img4" />
        <img src={img5} alt="img5" />
        <img src={img6} alt="img6" />
        <img src={img7} alt="img7" />
        <img src={img8} alt="img8" />
        <img src={img9} alt="img9" />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <WestOutlinedIcon className="west" />
        </div>
        <div className="icon" onClick={nextSlide}>
          <EastOutlinedIcon className="east" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
