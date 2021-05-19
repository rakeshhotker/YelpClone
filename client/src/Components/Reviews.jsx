import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import RestaurantFinder from "../Api/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantContext";
import StarRating from "./StarRating";

const Reviews = () => {
  const { reviews, setReviews } = useContext(RestaurantsContext);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/reviews/${id}`);
        console.log(response);
        setReviews(response.data.data.reviews);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [id, setReviews]);
  return (
    <div>
      {reviews &&
        reviews.map((review) => {
          return (
            <div className='row row-cols-3 mb-2'>
              <div
                className='card text-white bg-primary mb-3 mr-4'
                style={{ maxWidth: "30" }}
              >
                <div className='card-header d-flex justify-content-between'>
                  <span>{review.name}</span>
                  <span>
                    <StarRating rating={review.rating} />
                  </span>
                </div>
                <div className='card-body'>
                  <p className='card-text'>{review.review}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Reviews;
