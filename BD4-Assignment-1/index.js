const express = require('express');
const { resolve } = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const port = 3000;

let db;
(async () => {
  db = await open({
    filename: './BD4-Assignment-1/database.sqlite',
    driver: sqlite3.Database,
  });
})();

/* 
Exercise 1: Get All Restaurants

Objective: Fetch all restaurants from the database.

Query Parameters: None

Tasks: Implement a function to fetch all restaurants.

Example Call:

http://localhost:3000/restaurants
*/

async function fetchAllRestaurants() {
  const query = 'SELECT * FROM restaurants';
  const response = await db.all(query, []);
  return { restaurants: response };
}

app.get('/restaurants', async (req, res) => {
  try {
    const result = await fetchAllRestaurants();
    if (result.restaurants.length === 0) {
      return res.status(404).json({
        message: 'No restaurants found in DB',
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
Exercise 2: Get Restaurant by ID

Objective: Fetch a specific restaurant by its ID.

Query Parameters:

id (integer)

Tasks: Implement a function to fetch a restaurant by its ID.

Example Call:

http://localhost:3000/restaurants/details/1
*/

async function fetchRestaurantsById(id) {
  const query = 'SELECT * FROM restaurants WHERE id = ?';
  const response = await db.all(query, [id]);
  return { restaurants: response };
}

app.get('/restaurants/details/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await fetchRestaurantsById(id);
    if (result.restaurants.length === 0) {
      return res.status(404).json({
        message: 'No restaurants found in DB by id: ' + id,
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 
Exercise 3: Get Restaurants by Cuisine

Objective: Fetch restaurants based on their cuisine.

Query Parameters:

cuisine (string)

Tasks: Implement a function to fetch restaurants by cuisine.

Example Call:

http://localhost:3000/restaurants/cuisine/Indian
*/

async function fetchRestaurantsByCuisine(cuisine) {
  const query = 'SELECT * FROM restaurants WHERE cuisine = ?';
  const response = await db.all(query, [cuisine]);
  return { restaurants: response };
}

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  try {
    const cuisine = req.params.cuisine;
    const result = await fetchRestaurantsByCuisine(cuisine);
    if (result.restaurants.length === 0) {
      return res.status(404).json({
        message: 'No restaurants found in DB by cuisine: ' + cuisine,
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 
Exercise 4: Get Restaurants by Filter

Objective: Fetch restaurants based on filters such as veg/non-veg, outdoor seating, luxury, etc.

Query Parameters:

isVeg (string)

hasOutdoorSeating (string)

isLuxury (string)

Tasks: Implement a function to fetch restaurants by these filters.

Example Call:

http://localhost:3000/restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false
*/

async function filterRestaurants(isVeg, hasOutdoorSeating, isLuxury) {
  const query =
    'SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?';
  const response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}

app.get('/restaurants/filter', async (req, res) => {
  try {
    const isVeg = req.query.isVeg;
    const hasOutdoorSeating = req.query.hasOutdoorSeating;
    const isLuxury = req.query.isLuxury;
    const result = await filterRestaurants(isVeg, hasOutdoorSeating, isLuxury);
    if (result.restaurants.length === 0) {
      return res.status(404).json({
        message: 'No restaurants found in DB for Filter: ',
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 
Exercise 5: Get Restaurants Sorted by Rating

Objective: Fetch restaurants sorted by their rating ( highest to lowest ).

Query Parameters: None

Tasks: Implement a function to fetch restaurants sorted by rating.

Example Call:

http://localhost:3000/restaurants/sort-by-rating
*/

async function fetchRestaurantsByRating() {
  const query = 'SELECT * FROM restaurants ORDER BY rating DESC';
  const response = await db.all(query, []);
  return { restaurants: response };
}

app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    const result = await fetchRestaurantsByRating();
    if (result.restaurants.length === 0) {
      return res.status(404).json({
        message: 'No restaurants found in DB',
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
Exercise 6: Get All Dishes

Objective: Fetch all dishes from the database.

Query Parameters: None

Tasks: Implement a function to fetch all dishes.

Example Call:

http://localhost:3000/dishes
*/

async function fetchAllDishes() {
  const query = 'SELECT * FROM dishes';
  const response = await db.all(query, []);
  return { dishes: response };
}

app.get('/dishes', async (req, res) => {
  try {
    const result = await fetchAllDishes();
    if (result.dishes.length === 0) {
      return res.status(404).json({
        message: 'No dishes found in DB',
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
Exercise 7: Get Dish by ID

Objective: Fetch a specific dish by its ID.

Query Parameters:

id (integer)

Tasks: Implement a function to fetch a dish by its ID.

Example Call:

http://localhost:3000/dishes/details/1
*/

async function fetchDishesById(id) {
  const query = 'SELECT * FROM dishes where id = ?';
  const response = await db.all(query, [id]);
  return { dishes: response };
}

app.get('/dishes/details/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await fetchDishesById(id);
    if (result.dishes.length === 0) {
      return res.status(404).json({
        message: 'No dishes found in DB by id: ' + id,
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 
Exercise 8: Get Dishes by Filter

Objective: Fetch dishes based on filters such as veg/non-veg.

Query Parameters:

isVeg (boolean)

Tasks: Implement a function to fetch dishes by these filters.

Example Call:

http://localhost:3000/dishes/filter?isVeg=true
*/

async function fetchDishesById(isVeg) {
  const query = 'SELECT * FROM dishes where isVeg = ?';
  const response = await db.all(query, [isVeg]);
  return { dishes: response };
}

app.get('/dishes/filter', async (req, res) => {
  try {
    const isVeg = req.query.isVeg;
    const result = await fetchDishesById(isVeg);
    if (result.dishes.length === 0) {
      return res.status(404).json({
        message: 'No dishes found in DB by isVeg: ' + isVeg,
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
Exercise 9: Get Dishes Sorted by Price

Objective: Fetch dishes sorted by their price ( lowest to highest ).

Query Parameters: None

Tasks: Implement a function to fetch dishes sorted by price.

Example Call:

http://localhost:3000/dishes/sort-by-price
*/

async function fetchDishesByPrice() {
  const query = 'SELECT * FROM dishes ORDER BY price';
  const response = await db.all(query, []);
  return { dishes: response };
}

app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    const result = await fetchDishesByPrice();
    if (result.dishes.length === 0) {
      return res.status(404).json({
        message: 'No dishes found in DB',
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
How to integrate the Backend APIs with FoodieFind’s Frontend UI?

Deploy your StackBlitz project to Vercel by following the steps in this document.
You can also watch this video for reference: https://drive.google.com/file/d/18OCtAhMJtplpC1Hi5msUxyGSLy849K8d/view?usp=sharing

Copy the Vercel URL.

Once done, go to this link: https://bd4-zomato.vercel.app/

Paste your Vercel URL to the Server URL text box.

Once you click “Save Changes”, it will show the Product Listing page with various filters and sorting parameters.

Summary

In this lesson, you have learned how to build a backend for a food discovery app called 'FoodieFinds' using raw SQL queries. You have practiced performing various read operations, filtering, and sorting data. With these skills, you can now create and manage a comprehensive food discovery system. Continue practicing and exploring more advanced features to enhance your SQL knowledge further.
*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
