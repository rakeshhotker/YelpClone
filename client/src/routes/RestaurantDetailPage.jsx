import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { RestaurantsContext } from "../context/RestaurantContext";
import RestaurantFinder from "../Api/RestaurantFinder";
import Reviews from "../Components/Reviews";
import AddReview from "../Components/AddReview";
const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant[0]);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [id, setSelectedRestaurant]);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <div className='mt-3'>
            <Reviews />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
