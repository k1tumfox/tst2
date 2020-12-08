// NOT USING AT THE MOMENT
var express = require('express');
var router = express.Router();

const { generateId, authenticateUser, fetchUser } = require('../helpers/loginHelper');


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

/* GET home page. */
router.get('/', function(req, res, next) {
  const email = req.cookies.user

  const templateVars = {}
  const fetchedUser = fetchUser(userDatabaseIshArr, email)
  if (fetchedUser.error) {
    templateVars.user = null
  } else {
    templateVars.user = fetchedUser.user
  }

  res.render('index', templateVars);
});

module.exports = router;
