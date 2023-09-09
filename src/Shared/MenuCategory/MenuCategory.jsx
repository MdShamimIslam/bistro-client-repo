import React from "react";
import Cover from "../../Pages/Menu/Cover/Cover";
import MenuItem from "../MenuItem/MenuItem";
import { Link } from "react-router-dom";

const MenuCategory = ({ menu, title, img, details }) => {
  return (
    <div className="my-10">
      {title && <Cover img={img} title={title} details={details}></Cover>}
      <div className="grid md:grid-cols-2 gap-10">
        {menu.map((items) => (
          <MenuItem key={items._id} items={items}></MenuItem>
        ))}
      </div>
      <div className="text-center">
        <Link to={`/order/${title}`}>
          <button className="btn btn-outline mt-10 border-0 border-b-4">
            Order your favorite food
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
