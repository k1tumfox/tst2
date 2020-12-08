const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const dbHelpers = require('./models')(db);

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const { generateId, authenticateUser, fetchUser } = require('./helpers/loginHelper');
const bodyParser = require("body-parser");

const app = express();


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
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));

//----------------------------------------------------------------------------

app.get("/", (req, res) => {
  const email = req.cookies.user

  const templateVars = {}
  const fetchedUser = fetchUser(userDatabaseIshArr, email)
  if (fetchedUser.error) {
    templateVars.user = null
  } else {
    templateVars.user = fetchedUser.user
  }
  res.render("index", templateVars);
});

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

// catch 404 and forward to error handler--------------------------------
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
