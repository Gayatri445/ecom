import { useContext, useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import PersonIcon from "@mui/icons-material/Person";
import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import { Context } from "../../utils/context";

import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { toast } from "react-toastify";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const { categories, setCategories, cartCount ,userInfo,handleUserLogin} = useContext(Context);
  const navigate = useNavigate();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    getCategories();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const getCategories = async () => {
    await fetchDataFromApi("/api/categories?populate=*").then((res) => {
      setCategories(res);
    });
  };

  const handleLogout = () => {
    // clear user data from context and local storage here
    handleUserLogin(null);
    navigate("/login");
    toast.success("Logged out successfully", {
      hideProgressBar: true,
    });
  };

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>HOME</li>
            <li>
              {" "}
              <Link to="/about" className="custom-link">
                ABOUT
              </Link>
            </li>
            <li
              onClick={() => setShowCategory((prev) => !prev)}
              className="category"
            >
              {" "}
              CATEGORIES
            </li>
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            GadgetGalaxy
          </div>
          <div className="right">
            <TbSearch onClick={() => setShowSearch(true)} />
            <AiOutlineHeart />
            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
            

            {userInfo ? (
              <>
                <div className="user-profile" onClick={() => handleLogout()}>
                  <PersonIcon />
                  <div className="profile-dropdown">
                    <button className="logout-button">Logout</button>
                  </div>
                </div>
                <p>{userInfo.username}</p>
              </>
            ) : (
              <PersonIcon onClick={() => navigate("/login")} />
            )}

          </div>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
      {showCategory && (
        <ul className="category-list">
          {categories?.data?.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                navigate(`/category/${item.id}`);
                setShowCategory(false);
              }}
            >
              {item.attributes?.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Header;
