// 載入 Restaurant
const Restaurant = require("../restaurant")
// 載入 restaurant.json
const restaurants = require("../../restaurant.json").results
// 載入 mongoose 連線
const db = require('../../config/mongoose')

db.once("open", () => {
  console.log("MongoDB connected!")
  Restaurant.create(restaurants)
    .then(() => {
      console.log('restaurant seeder done')
    })
    .catch(error => {
      console.log("error!")
    })
})