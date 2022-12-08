// 引入 Express 
const express = require('express')
const app = express()

// 設定伺服器參數
const port = 3000

// 引入 handlebars
const exphbs = require('express-handlebars')

// 設定樣版引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態檔案
app.use(express.static('public'))


// 引入 Json檔案
const restaurantList = require('./restaurant.json')

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const filteredRestaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  })

  res.render("index", { restaurants: filteredRestaurants, keyword: keyword })
})




// 渲染 index畫面
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// 建立連到show畫面的動態路由
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})



// 啟動伺服器監聽
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})

