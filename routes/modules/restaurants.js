const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 建立連到new畫面的動態路由
router.get('/new', (req, res) => {
  return res.render('new')
})


// 建立接住 create的路由
router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 建立連到show畫面的動態路由
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      res.render('show', { restaurant })
    })
    .catch(error => {
      console.log(error)
    })
})

// 取得 Edit 畫面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      res.render('edit', { restaurant })
    })
    .catch(error => {
      console.log(error)
    })
})

// 接收 Edit 路由傳來的 update
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => { res.redirect(`/restaurants/${id}`) })
    .catch(error => { console.log(error) })
})

// 建立刪除功能的路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.remove()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => { console; e.log(error) })
})

module.exports = router