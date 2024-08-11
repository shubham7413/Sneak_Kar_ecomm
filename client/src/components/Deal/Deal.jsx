import React, { useState } from "react";
import { useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import Paper from "@mui/material/Paper";
// import Stack from "@mui/material/Stack";
// import { styled } from "@mui/material/styles";

import "./Deal.scss";

const Deal = () => {
  //   const Item = styled(Paper)(({ theme }) => ({
  //     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //     ...theme.typography.body2,
  //     padding: theme.spacing(1),
  //     textAlign: "center",
  //     color: theme.palette.text.secondary,
  //   }));

  //   const [currentSlide, setCurrentSlide] = useState(0);

  //   const data = [
  //     "https://i.pinimg.com/originals/c5/15/8e/c5158ec3b55ac781c8ddd77a2d98a3ac.jpg",
  //     "https://reviewed-com-res.cloudinary.com/image/fetch/s--Q6k1-ghW--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_972/https://reviewed-production.s3.amazonaws.com/1686778972972/nike-sneakers-hero.jpg",
  //     "https://www.thoughtco.com/thmb/UATf-Quw4S0fkFZiyVcR0fdrssM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/32716134786_ef6e02d6fb_k-5c3d514346e0fb0001af0f44.jpg",
  //     "https://i.pinimg.com/originals/93/c3/37/93c337c2d91456e23d1895f5479a4691.jpg",
  //     "https://i.pinimg.com/736x/a2/73/25/a273259b9feb7618e5193bc1dd715295--turkey-skechers.jpg",
  //   ];

  //   const prevSlide = () => {
  //     setCurrentSlide(currentSlide === 0 ? 4 : (prev) => prev - 1);
  //   };
  //   const nextSlide = () => {
  //     setCurrentSlide(currentSlide === 4 ? 0 : (prev) => prev + 1);
  //   };

  //   // auto scroll added.
  //   // ------------------------------------------------------------------------------------------------------------------------------------ //
  //   const autoScroll = true;
  //   let slideInterval;
  //   let intervalTime = 2500;

  //   function auto() {
  //     slideInterval = setInterval(nextSlide, intervalTime);
  //   }

  //   useEffect(() => {
  //     setCurrentSlide(0);
  //   }, []);

  //   useEffect(() => {
  //     if (autoScroll) auto();

  //     return () => clearInterval(slideInterval);
  //   }, [currentSlide]);

  // ------------------------------------------------------------------------------------------------------------------------------------ //

  return (
    <div className="deal">
      <div className="flex-container">
        <div className="col-1">
          <div className="deal-1"></div>
          <div className="deal-2"></div>
          <div className="deal-3"></div>
        </div>
        <div className="col-2">
          <div className="deal-4"></div>
          <div className="deal-5"></div>
          <div className="deal-6"></div>
        </div>
        <div className="col-3">
          <div className="deal-7"></div>
          <div className="deal-8"></div>
          <div className="deal-9"></div>
        </div>
      </div>
    </div>
  );
};

export default Deal;
