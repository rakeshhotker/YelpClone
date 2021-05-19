import React, { useState, createContext } from "react";
export const RestaurantsContext = createContext();
export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };
  const addReviews = (review) => {
    setReviews([...reviews, review]);
  };
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        reviews,
        addReviews,
        setReviews,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
