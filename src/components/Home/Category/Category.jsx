import { useNavigate } from "react-router-dom";

import "./Category.scss";
const Category = ({ categories }) => {
  const navigate = useNavigate();
  return (
    <div className="shop-by-category" id="category">
      <div className="categories">
        {categories?.data?.map((item) => (
          <div key={item.id} className="category" onClick={() =>navigate(`/category/${item.id}`)}>
            
           <p className="catTitle"> { item.attributes?.title}</p>
            <img
              src={
                import.meta.env.VITE_STRAPI_APP_URL +
                item.attributes?.img?.data?.attributes?.url
              }
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
