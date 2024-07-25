const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Point13: import express-session
const session = require('express-session');
// Point17: import mongodb sessions
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGO_URL =
  'mongodb+srv://anshupatel710:anshu710@nodelearning.qft5fdn.mongodb.net/?retryWrites=true&w=majority';

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();
// Point18: initialize the store for mongo session
const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// Point2: import the auth route
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Point14: set up session with the secret key
// Point19: pass the store

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  User.findById('65394813a54ae44c5bfc75d5')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err); // Pass the error to the error-handling middleware.
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
// Point3: import the auth route
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGO_URL)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
