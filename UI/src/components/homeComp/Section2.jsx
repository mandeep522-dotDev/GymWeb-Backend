import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../cssFile/Section2.css";

const ARROW = "https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg";

export default function App() {
  const marqueRefs = useRef([]);
  marqueRefs.current = [];

  const addToRefs = (el) => {
    if (el && !marqueRefs.current.includes(el)) marqueRefs.current.push(el);
  };

  useEffect(() => {
    
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        marqueRefs.current.forEach((el) => {
          gsap.to(el, { x: "-200%", duration: 6, repeat: -1, ease: "none" });
          const img = el.querySelector("img");
          if (img) gsap.to(img, { rotate: 180 });
        });
      } else {
        marqueRefs.current.forEach((el) => {
          gsap.to(el, { x: "0%", duration: 6, repeat: -1, ease: "none" });
          const img = el.querySelector("img");
          if (img) gsap.to(img, { rotate: 0 });
        });
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div>
      <div id="page2">
        <div id="move">
          {[...Array(5)].map((_, i) => (
            <div className="marque" ref={addToRefs} key={i}>
              <h1>Building Better Brands</h1>
              <img src={ARROW} alt="arrow" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
