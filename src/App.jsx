import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import { Outlet } from "react-router-dom";
import AppContext from "./utils/context";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    const fetchCart = () => {
      const cartInfo =
        localStorage.getItem("cartInfo") !== "undefined"
          ? JSON.parse(localStorage.getItem("cartInfo"))
          : localStorage.clear();

      return cartInfo ? cartInfo : [];
    };
    fetchCart();
  }, []);
  return (
    <AppContext>
      <Header />
      <main>
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
      <ToastContainer/>
    </AppContext>
  );
}

export default App;
