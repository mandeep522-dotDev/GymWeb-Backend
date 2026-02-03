import { useEffect, useRef } from "react";

export default function App() {
  const canvasRef = useRef(null);

 useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let app;
    let observer;

    const handleClick = () => {
      if (!app) return;

      app.tubes.setColors(randomColors(3));
      app.tubes.setLightsColors(randomColors(4));
    };

    const init = async () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      const { default: TubesCursor } = await import(
        "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
      );

      app = TubesCursor(canvas, {
        tubes: {
          colors: ["#f967fb", "#53bc28", "#6958d5"],
          lights: {
            intensity: 200,
            colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
          },
        },
      });

      canvas.addEventListener("click", handleClick); // ✅ NOW it works
    };

    observer = new ResizeObserver(() => {
      if (!app) init();
    });

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      canvas.removeEventListener("click", handleClick);
      app?.dispose?.();
    };
  }, []);




  function randomColors(count) {
    return Array.from({ length: count }, () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  }


  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          touch-action: auto;
        }
      `}</style>
      <div style={styles.main}>
        <div style={styles.app}>
          <canvas ref={canvasRef} style={styles.canvas} />
          <div style={styles.hero}>
            <h1 style={styles.h1} className="text-white">Generation-V</h1>
            <h2 style={styles.h2}>GYM</h2>
            <p style={styles.p}>Experience our advanced gym with modern equipment..</p>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  app: {
    width: "100%",
    height: "100%",    // 🔥 not minHeight
    position: "relative",
    overflow: "hidden",
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "block",
    zIndex: 0,
  },
  hero: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    color: "#fff",
    textAlign: "center",
    pointerEvents: "none",
    // marginTop: "200px",
  },
  h1: {
    fontSize: "80px",
    fontWeight: 700,
    textTransform: "uppercase",
    margin: 0,
    textShadow: "0 0 20px rgba(0,0,0,1)",
    fontFamily: "serif",
  },
  h2: {
    fontSize: "60px",
    fontWeight: 500,
    textTransform: "uppercase",
    margin: 0,
    textShadow: "0 0 20px rgba(0,0,0,1)",
    fontFamily: "serif",
  },
  p: {
    fontSize: "16px",
    maxWidth: "600px",
    marginTop: "10px",
    textShadow: "0 0 20px rgba(0,0,0,1)",
  },
  main: {
    position: "relative",
    height: "100vh",   // 🔥 REQUIRED
  },
};
