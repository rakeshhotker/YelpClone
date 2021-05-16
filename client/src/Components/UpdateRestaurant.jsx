import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import RestaurantFinder from "../Api/RestaurantFinder";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
    };
    fetchData();
  }, [id]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      console.log(response.data.data.restaurant);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <div className='mb-4'>
        <form action=''>
          <div className='form-col'>
            <div className='form-group'>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                className='form-control'
                placeholder='name'
              />
            </div>
            <div className='form-group'>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type='text'
                className='form-control'
                placeholder='location'
              />
            </div>
            <div className='form-group'>
              <select
                className='custom-select my-1 mr-sm-2'
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option disabled>Price Range</option>
                <option value='1'>$</option>
                <option value='2'>$$</option>
                <option value='3'>$$$</option>
                <option value='4'>$$$$</option>
                <option value='5'>$$$$$</option>
              </select>
            </div>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRestaurant;
