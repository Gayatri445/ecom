import { useContext, useEffect, useState } from "react";
import Category from "../Home/Category/Category";
import Products from "../Products/Products";
import "./Home.scss";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";
import Slider from "./Slider/Slider";

const Home = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const { categories, setCategories,setProducts } =
    useContext(Context);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    const res=await fetchDataFromApi("/api/products?populate=*").then((res) => {
      const popularProducts = res.data.filter((product) => product.attributes.type === "popular");
      setPopularProducts(popularProducts);
      setProducts(res);
    });
  };

  const getCategories = async () => {
    await fetchDataFromApi("/api/categories?populate=*").then((res) => {
      setCategories(res);
    });
  };
  return (
    <div>
      <Slider />
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />
          <Products products={popularProducts} headingText="Popular Products" />
        </div>
      </div>
    </div>
  );
};

export default Home;
