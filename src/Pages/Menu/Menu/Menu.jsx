import React from "react";
import Cover from "../Cover/Cover";
import img from "../../../assets/menu/banner3.jpg";
import SectionTitle from "../../../Components/SectionTitle";
import MenuCategory from "../../../Shared/MenuCategory/MenuCategory";
import useMenu from "../../../hooks/useMenu";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import { Helmet } from "react-helmet-async";


const Menu = () => {
  const [menu] = useMenu();
  const popularItem = menu.filter((item) => item.category === "popular");
  const saladItem = menu.filter((item) => item.category === "salad");
  const soupItem = menu.filter((item) => item.category === "soup");
  const dessertsItem = menu.filter((item) => item.category === "dessert");
  const pizzaItem = menu.filter((item) => item.category === "pizza");
  

  return (
    <div>
      <Helmet><title>Bistro-Boss | Menu</title></Helmet>
      <Cover
        img={img}
        title={"OUR MENU"}
        details={"Would you like to try a dish?"}
      ></Cover>
      <SectionTitle
        heading={"TODAY'S OFFER"}
        subHeading={"Don't miss"}
      ></SectionTitle>
      <MenuCategory menu={popularItem}></MenuCategory>
      <MenuCategory
        img={saladImg}
        menu={saladItem}
        title={"salad"}
        details={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      ></MenuCategory>
      <MenuCategory
        img={soupImg}
        menu={soupItem}
        title={"soup"}
        details={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      ></MenuCategory>
      <MenuCategory
        img={pizzaImg}
        menu={pizzaItem}
        title={"pizza"}
        details={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      ></MenuCategory>
      <MenuCategory
        img={dessertImg}
        menu={dessertsItem}
        title={"dessert"}
        details={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      ></MenuCategory>
    </div>
  );
};

export default Menu;
