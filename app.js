const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const port = 3000
const routes = require('./routes')
require('./config/mongoose')

// 每一筆資料使用 body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 設定樣版引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態檔案
app.use(express.static('public'))

// 使用 methodoverride
app.use(methodOverride('_method'))

app.use(routes)

// 啟動伺服器監聽
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
