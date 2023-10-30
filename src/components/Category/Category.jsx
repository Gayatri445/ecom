import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./Category.scss";
import Products from "../Products/Products";
import { useState } from "react";
const Category = () => {
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const { id } = useParams();
  const { data, isLoading } = useFetch(
    `/api/products?populate=*&[filters][categories][id]=${id}`
  );
  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedBrand(
      isChecked
        ? [...selectedBrand, value]
        : selectedBrand.filter((item) => item !== value)
    );
  };

  const filterByBrand = (products, selectedBrands) => {
    const filteredBrandProducts = products.data.filter((product) =>
      selectedBrands.includes(product.attributes.brand)
    );

    return { ...products, data: filteredBrandProducts };
  };

  const filterByPrice = (products, maxPrice) => {
    const filteredData = products.data.filter(
      (product) => product.attributes.price <= maxPrice
    );

    return { ...products, data: filteredData };
  };

  const sortProducts = (products, sort) => {
    const sortedData = [...products.data];
    if (sort === "asc") {
      sortedData.sort((a, b) => a.attributes.price - b.attributes.price);
    } else if (sort === "desc") {
      sortedData.sort((a, b) => b.attributes.price - a.attributes.price);
    }

    return { ...products, data: sortedData };
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const filteredProductsByPrice = filterByPrice(data, maxPrice);
  const filteredProductsByBrand =
    selectedBrand.length === 0
      ? data
      : filterByBrand(filteredProductsByPrice, selectedBrand);
  const sortedProducts =
    sort === null
      ? filteredProductsByBrand
      : sortProducts(filteredProductsByBrand, sort);

  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="left">
          <div className="filterItem">
            <h2>Filter By Brand</h2>

            {data?.data
              ?.map((item) => item?.attributes?.brand) // Extract brand names
              ?.filter((value, index, self) => self.indexOf(value) === index) // Filter unique brand names
              ?.map((brand, index) => (
                <div className="inputItem" key={index}>
                  <input
                    type="checkbox"
                    id={brand}
                    value={brand}
                    onChange={handleChange}
                  />
                  <label htmlFor={brand}>{brand}</label>
                </div>
              ))}
          </div>

          <div className="filterItem">
            <h2>Filter By Price</h2>
            <span>0</span>
            <input
              type="range"
              min={0}
              max={100000}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
            <span>{maxPrice}</span>
          </div>
          <div className="filterItem">
            <h2>Sort By Price</h2>
            <div className="inputItem">
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={(e) => setSort("asc")}
              />
              <label htmlFor="asc">Low to High</label>
            </div>
            <div className="inputItem">
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={(e) => setSort("desc")}
              />
              <label htmlFor="desc">High to Low</label>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="category-title">
            {
              data?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes
                ?.title
            }
          </div>
          <Products
            innerPage={true}
            products={sortedProducts}
           
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
