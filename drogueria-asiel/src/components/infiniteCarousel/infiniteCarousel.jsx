import React from "react";
import "./InfiniteCarousel.css";

const InfiniteCarousel = ({ images }) => {
  // Repite las imágenes para lograr el efecto de loop infinito
  const repeatedImages = [...images, ...images];

  return (
    <div className="carousel-wrapper">
      <div className="carousel-fade-left"></div>
      <div className="carousel-fade-right"></div>
      <div className="carousel-track">
        {repeatedImages.map((imgSrc, index) => (
          <div className="carousel-item" key={index}>
            <img src={imgSrc} alt={`carousel-img-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;