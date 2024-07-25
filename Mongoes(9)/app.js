const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//Point1: delete the database.js file and import mongoose
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Point22: made this function find the user
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

app.use(errorController.get404);

//Point2: remove this and call this from mongoose.
// mongoConnect(() => {
//   app.listen(3000);
// });
mongoose
  .connect(
    'mongodb+srv://anshupatel710:anshu710@nodelearning.qft5fdn.mongodb.net/?retryWrites=true&w=majority'
  )
  .then((result) => {
    //Point21: create the new user here
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
