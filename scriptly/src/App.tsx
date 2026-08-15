import { useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import HomePage from "./components/Homepage";
import LocomotiveScroll from "locomotive-scroll";
import { checkAuth } from "./lib/utils";

function App() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Session check: If user has an active session, redirect to /dashboard
    const checkSession = async () => {
      const user = await checkAuth();
      if (user) {
        navigate("/dashboard", { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

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
