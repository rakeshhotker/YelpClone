import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import RestaurantFinder from "../Api/RestaurantFinder";
const UpdateRestaurant = (props) => {
  const { id } = useParams();
  const [Name, setName] = useState("");
  const [Location, setLocation] = useState("");
  const [PriceRange, setPriceRange] = useState("Price Range");
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [id]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.put(`/${id}`, {
        name: Name,
        location: Location,
        price_range: PriceRange,
      });
      console.log(response.status);
      history.push("/");
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
                value={Name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                className='form-control'
                placeholder='name'
              />
            </div>
            <div className='form-group'>
              <input
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
                type='text'
                className='form-control'
                placeholder='location'
              />
            </div>
            <div className='form-group'>
              <select
                className='custom-select my-1 mr-sm-2'
                value={PriceRange}
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
