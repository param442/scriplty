import { useRef, useEffect } from "react";
import HomePage from "./components/Homepage";

import LocomotiveScroll from "locomotive-scroll";
function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
      });
    }
  }, []);
  return (
    <main data-scroll-container ref={containerRef}>
      <HomePage />
    </main>
  );
}

export default App;
