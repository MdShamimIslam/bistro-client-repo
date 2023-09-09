import React, { useState } from "react";
import Cover from "../../Menu/Cover/Cover";
import orderImg from "../../../assets/shop/order.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../hooks/useMenu";
import OrderMap from "../OrderMap/OrderMap";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Order = () => {
  const categories = ['salad','pizza','soup','dessert','drinks'];
  const {category} = useParams();
  const initialIndex = categories.indexOf(category)
  
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
  const drinksItem = menu.filter((item) => item.category === "drinks");
  const saladItem = menu.filter((item) => item.category === "salad");
  const soupItem = menu.filter((item) => item.category === "soup");
  const dessertsItem = menu.filter((item) => item.category === "dessert");
  const pizzaItem = menu.filter((item) => item.category === "pizza");
  return (
    <div>
      <Helmet>
        <title>Bistro-Boss | Order Food</title>
      </Helmet>
      <Cover
        img={orderImg}
        title={"OUR ORDER"}
        details={"Would you like to try a dish?"}
      ></Cover>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className={'text-center'}>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <div className="mt-8">
        <TabPanel>
           <OrderMap items={saladItem}></OrderMap>
        </TabPanel>
        <TabPanel>
        <OrderMap items={pizzaItem}></OrderMap>
        </TabPanel>
        <TabPanel>
        <OrderMap items={soupItem}></OrderMap>
        </TabPanel>
        <TabPanel>
        <OrderMap items={dessertsItem}></OrderMap>
        </TabPanel>
        <TabPanel>
        <OrderMap items={drinksItem}></OrderMap>
        </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default Order;
