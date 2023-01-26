const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/")
  }
  const keywords = req.query.keyword
  const keyword = keywords.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then(restaurantsData => {
      const filteredData = restaurantsData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", {
        restaurants: filteredData, keywords
      })
    })
    .catch(err => console.log(err))
})

module.exports = router