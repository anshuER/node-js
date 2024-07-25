const http = require('http');

const routes = require('./routes');

// fs= file system;
// const fs = require('fs');

//1. write function
// function rqListener(req,res) {
// }
// run this function whenever req come to this server
// http.createServer(rqListener);

// 2.write this function
// we have to store our server to variable
// function without importing routes
// const server = http.createServer((req, res) => {
//   const url = req.url;
//   const method = req.method;
//   if (url === '/') {
//     res.write('<html>');
//     res.write('<head><title>Enter message</title></head>');
//     res.write('<body>');
//     res.write('<h1>Home page</h1>');
//     res.write(
//       '<form action="/message" method="POST"><input type="text" name="message"><button type="submit">submit</button></form>'
//     );
//     res.write('');
//     res.write('</body>');
//     res.write('</html>');
//     // we are returning because we want server to terminate the server and do not run the extra code and give error.
//     return res.end();
//   }

//   if (url === '/message' && method === 'POST') {
//     const body = [];

//     // event listener
//     // data come in a small chunks for this not to happen we use buffer which is like bus which take all the chunks.
//     req.on('data', (chunk) => {
//       console.log(chunk);
//       body.push(chunk);
//     });
//     // buffer
//     req.on('end', () => {
//       const parsedBody = Buffer.concat(body).toString();
//       const message = parsedBody.split('=')[1];
//       fs.writeFileSync('message.txt', message);
//     });

//     res.statusCode = 302;
//     res.setHeader('Location', '/');
//     return res.end();
//   }

//   // set header 1st argument is Content-type which is convention name and second arg is type of response.
//   res.setHeader('Content-Type', 'text/html');
//   // if we want to give response in chunks(small parts) then we use
//   res.write('<html>');
//   res.write('<h1>');
//   res.write('Anshu');
//   res.write('</h1>');
//   res.write('<html>');
//   res.end();
//   // it terminates the event loop of the loop and close our server
//   //   process.exit();
// });

// function with separate routes
const server = http.createServer(routes.handler);

// listen to server at port
// 1. argument is port.
// 2. argument is hostname here by default it is localhost.
server.listen(3000);
