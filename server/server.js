require("dotenv").config();
const express = require("express");
const cors = require("cors");
//database
const db = require("./db/index");
//middleware
// const morgan = require("morgan");//third-party middleware
const app = express();
app.use(express.json());
app.use(cors());
/*we can use as many middlewares as we want*/
// app.use(morgan("dev"));
// app.use((req, res, next) => {
//   console.log("it's a middleware");
//   next();
// });
//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const response = await db.query("select * from restaurants");
    res.status(200).json({
      status: "success",
      responses: response.rows.length,
      data: {
        restaurant: response.rows,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
});
//get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await db.query("select * from restaurants where id=$1", [
      id,
    ]);
    // console.log(req.params);
    res.status(200).json({
      status: "success",
      responses: response.rows.length,
      data: {
        restaurant: response.rows,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
});
//create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const response = await db.query(
      "insert into restaurants (name,location,price_range) values($1,$2,$3) returning *",
      [name, location, price_range]
    );
    // console.log(response.rows);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: response.rows[0],
      },
    });
  } catch (error) {
    console.error(error.message);
  }
});
//update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price_range } = req.body;
    const response = await db.query(
      "update restaurants set name=$1,location=$2,price_range=$3 where id=$4 returning *",
      [name, location, price_range, id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: response.rows,
      },
    });
  } catch (error) {
    console.log("not working");
    console.error(error.message);
  }
});
//delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await db.query("delete from restaurants where id=$1", [
      id,
    ]);
    // console.log(req.params.id);
    res.status(200).send("Deleted successfully");
  } catch (error) {
    console.error(error.message);
  }
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
