const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const app = express()

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(expressValidator())

app.get('/', (req, resp) => {
  resp.render('home')
})

app.post('/signup', (req, resp) => {
  req.checkbody({
    fullName: {
      optional: true,
      isLength: {
        options: [{ min: 1, max: 100 }],
        errorMessage: 'Must be between 2 and 10 chars long'
    },
    errorMessage: "Invalid Name"
    }
  })

  req
    .checkBody("email")
    .notEmpty();

  resp.render('signup', {
    fullName: req.body.fullName,
    email: req.body.email,
    birthYear: req.body.birthYear,
    position: req.body.position,
    password: req.body.password,
  })
})


// req.checkBody({
//  'email': {
//     optional: {
//       options: { checkFalsy: true } // or: [{ checkFalsy: true }]
//     },
//     isEmail: {
//       errorMessage: 'Invalid Email'
//     }
//   },
//   'password': {
//     notEmpty: true,
//     matches: {
//       options: ['example', 'i'] // pass options to the validator with the options property as an array
//       // options: [/example/i] // matches also accepts the full expression in the first parameter
//     },
//     errorMessage: 'Invalid Password' // Error message for the parameter
//   },
//   'name.first': { //
//     optional: true, // won't validate if field is empty
//     isLength: {
//       options: [{ min: 2, max: 10 }],
//       errorMessage: 'Must be between 2 and 10 chars long' // Error message for the validator, takes precedent over parameter message
//     },
//     errorMessage: 'Invalid First Name'
//   }
// });




app.listen(3000, () => {
  console.log("At least something is showing ;)")
})
