const express = require('express');
const router = express.Router();
const {getPostsByUsers} = require('../helpers/dataHelpers');

//login setup
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { fetchUser, authenticateUser } = require('./helpers')

const userDatabaseIshArr = [
  {
    nicename: "pollo",
    fullname: "Pequeño Pollo de la Pampa",
    email: "pockpock@chicken.com",
    password: "cluck"
  }
  ,
  {
    nicename: "dimitri",
    fullname: "Dimitri Ivanovich Mendeleiv",
    email: "periodic@table.com",
    password: "vodka"
  }
]

const userDatabaseIshObj = {
  "pockpock@chicken.com": {
    nicename: "pollo",
    fullname: "Pequeño Pollo de la Pampa",
    email: "pockpock@chicken.com",
    password: "cluck"
  }
  ,
  "periodic@table.com": {
    nicename: "dimitri",
    fullname: "Dimitri Ivanovich Mendeleiv",
    email: "periodic@table.com",
    password: "vodka"
  }
}


module.exports = ({ getUsers, findUserByEmail, addUser,
  getUsersPosts }) => {

  /* GET users listing. */
  router.get('/', function (req, res) {
    const email = req.cookies.user

    const templateVars = {}
    const fetchedUser = fetchUser(userDatabaseIshArr, email)
    if (fetchedUser.error) {
      templateVars.user = null
    } else {
      templateVars.user = fetchedUser.user
    }
    res.render("index", templateVars);
    //-----------------------------------------

    getUsers()
      .then(users => res.json(users))
      .catch(err => res.json({ msg: err.message }))
  });

  // LOGIN ROUTES
  // LOGIN ROUTES

app.get('/login', (req, res) => {
  const templateVars = { error: null }
  res.render('login', templateVars)
})

app.post('/login', (req, res) => {
  console.log(req.body)
  // const email = req.body.email
  // const password = req.body.password
  const { email, password } = req.body
  const fetchedUserInfo = authenticateUser(userDatabaseIshArr, email, password)

  if (fetchedUserInfo.error) {
    console.log(`There was this error : ${fetchedUserInfo.error}`)
    // return res.redirect('/login')
    const templateVars = { error: fetchedUserInfo.error }
    return res.render('login', templateVars)
  } else {
    res.cookie('user', fetchedUserInfo.user.email)
    return res.redirect('/')
  }
  // userDatabaseIshObj[email].password === password
})

// REGISTER ROUTES
app.get('/register', (req, res) => {
  res.render('register')
})
app.post('/register', (req, res) => {
  const { email, password, nicename, fullname } = req.body

  const fetchedUser = fetchUser(userDatabaseIshArr, email)
  if (fetchedUser.error) {
    const newUser = {
      nicename,
      fullname,
      email,
      password
    }
    userDatabaseIshArr.push(newUser)
    res.cookie('user', email)
    res.redirect('/')
  } else {
    const templateVars = { error: "Email already exists, please login" }
    res.render('login', templateVars)
  }

})

// LOGOUT ROUTE
app.get('/logout', (req, res) => {
  res.clearCookie('user')
  res.redirect('/')
})

// ----------------------------------------------------



  router.get('/posts', (req, res) => {
    getUsersPosts()
      .then((usersPosts) => {
        const formattedPosts = getPostsByUsers(usersPosts);
        res.json(formattedPosts);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/', (req, res) => {

    const {
      first_name,
      last_name,
      email,
      password
    } = req.body;

    getUserByEmail(email)
      .then(user => {

        if (user) {
          res.json({
            msg: 'Sorry, a user account with this email already exists'
          });
        } else {
          return addUser(first_name, last_name, email, password)
        }

      })
      .then(newUser => res.json(newUser))
      .catch(err => res.json({
        error: err.message
      }));

  })


  return router;
}
