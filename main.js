const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req, resp) => {
  resp.render('home')
})

app.post('/signup', (req, resp) => {
  resp.render('signup', {
    fullName: req.body.fullName,
    email: req.body.email,
    birthYear: req.body.birthYear,
    position: req.body.position,
    password: req.body.password,
  })
})




app.listen(3000, () => {
  console.log("At least something is showing ;)")
})
