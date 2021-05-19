import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import RestaurantFinder from "../Api/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantContext";
import StarRating from "./StarRating";
const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurant);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [setRestaurants]);
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };
  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };
  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className='text-warning'>0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span className='text-warning'>({restaurant.count})</span>
      </>
    );
  };
  return (
    <div className='list-group'>
      <table className='table table-hover table-dark'>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Rating</th>
            <th scope='col'>Update</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {restaurants.length === 0 && (
              <td>
                <h2 className='text-center'>Nothing to Display</h2>
              </td>
            )}
          </tr>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      className='btn btn-warning'
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={(e) => handleDelete(e, restaurant.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
