import React from "react";
import AddRestaurant from "../Components/AddRestaurant";
import Header from "../Components/Header";
import RestaurantList from "../Components/RestaurantList";

const Home = () => {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default Home;
