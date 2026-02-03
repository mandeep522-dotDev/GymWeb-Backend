import React, { useState } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";

const images = [
  "/public/images/gallery/image1.jpg",
  "/public/images/gallery/image2.jpg",
  "/public/images/gallery/image3.jpeg",
  "/public/images/gallery/image4.jpg",
  "/public/images/gallery/image5.jpg",
  "/public/images/gallery/image6.png",
  "/public/images/gallery/image7.jpg",
];

const Section5 = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-[100%] flex flex-col items-center justify-center py-4">
        <h1 className="text-4xl font-serif font-bold">Gallery</h1>
        <p className="text-center font-serif mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, pariatur?</p>
        <div className="relative w-[85vw] h-[50vh] flex items-center justify-center">
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 bg-gray-200 hover:bg-gray-400 rounded-full p-2"
            aria-label="Previous"
          >
            <RiArrowLeftSLine size={36} />
          </button>
          <img
            src={images[current]}
            alt={`Gallery ${current + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 bg-gray-200 hover:bg-gray-400 rounded-full p-2"
            aria-label="Next"
          >
            <RiArrowRightSLine size={36} />
          </button>
        </div>
        <div className="flex gap-2 mt-4">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${current === idx ? "bg-blue-500" : "bg-gray-300"}`}
            ></span>
          ))}
        </div>
    </div>
  );
};

export default Section5;
