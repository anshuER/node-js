const fs = require('fs');

function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write('<body>');
    res.write('<h1>Home page</h1>');
    res.write(
      '<form action="/message" method="POST"><input type="text" name="message"><button type="submit">submit</button></form>'
    );
    res.write('');
    res.write('</body>');

    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });

    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<h1>');
  res.write('Anshu');
  res.write('</h1>');
  res.write('<html>');
  res.end();
}

module.exports.handler = requestHandler;
module.exports.someText = 'amshu';
