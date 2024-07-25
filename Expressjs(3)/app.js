const http = require('http');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// express export a function so we call the function and store object it in this variable.
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// this will parse the incoming body req and solve our problem-1. if { extended: false } this is not added then we get provide extend warning
app.use(bodyParser.urlencoded({ extended: false }));
// it serves static files like external css
app.use(express.static(path.join(__dirname, 'public')));
// Moved Code= 1 (to route admin)
//start
// // applying express middleware with the help of use() and this will executed for every incoming req.
// // app.use((req, res, next) => {
// //   // next() is a call back function . has to be executed to jump to next middleware.
// //   // we will use next to jump to next middleware.
// //   next();
// // });

// // request will always go from top to bottom so define your route according to it.
// app.use('/add-product', (req, res, next) => {
//   res.send(
//     '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">submit</button></form>'
//   );
// });

// // if we use app.use() here then it will be executing every time so we need app.get()/app.post() for executing only for incoming req;
// app.post('/product', (req, res, next) => {
//   // problem-1 =>if we use directly this then we will get undefined. we need to install body-parser
//   console.log(req.body);
//   res.redirect('/');
// });
//end

// // Moved Code= 2 (to route shop)
// //start
// app.use('/', (req, res, next) => {
//   res.send('<h1>Helllo Express</h1>');
// });
// //end

// route starting with /admin will goto this use()
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // we use status here to send code
  // res.status(404).send('<h1>404 Not found</h1>');

  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// const server = http.createServer(app);
// server.listen(3000);
// express will do this above code in one line.
app.listen(3000);
