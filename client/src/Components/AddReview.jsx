import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import RestaurantFinder from "../Api/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantContext";

const AddReview = () => {
  const { addReviews } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const { id } = useParams();
  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}`, {
        name,
        review: reviewText,
        rating,
      });
      console.log(response.data.data.reviews);
      addReviews(response.data.data.reviews[0]);
      console.log(response.status);
      setName("");
      setRating("");
      setReviewText("");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className='mb-2'>
      <form action=''>
        <div className='form-row'>
          <div className='form-group col-8'>
            <label htmlFor='name'>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='name'
              placeholder='name'
              type='text'
              className='form-control'
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id='rating'
              className='custom-select'
            >
              <option disabled>Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>
        <div className='form-group col-10'>
          <label htmlFor='Review'>Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id='Review'
            className='form-control'
          ></textarea>
        </div>
        <button className='btn btn-primary' onClick={(e) => handleAddReview(e)}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
