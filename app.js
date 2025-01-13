const http = require('http');
const fs = require('fs')
const server =http.createServer((req, res) => {
      const method = req.method || "GET";
   if (req.url === '/') {
      res.write('<html>');
      res.write('<head>');
      res.write('</head>');
      res.write('<body>');
      res.write('<form method="post" action="/message">' +
          '<input type="text" name="message" />' +
          '<button type="submit">send</button>' +
          '</form>');
      res.write('</body>');
      res.write('</html>');
      return res.end();
   }

   if(req.url === '/message' && method === 'POST') {
      const body = [];
      req.on('data', (chunk) => {
         body.push(chunk);
      })

    return  req.on('end', () => {
         const data = Buffer.concat(body).toString('utf8');
         const message = data.split('=')[1]
         fs.writeFileSync('text.txt', message);
         res.statusCode = 200;
         res.setHeader('Location', '/');
         return res.end();
      })



   }

   res.setHeader('Content-Type', 'text/html');

   res.write('<html>');
   res.write('<head>');
   res.write('</head>');
   res.write('<body>');
   res.write('<h1>Hello World</h1>');
   res.write('</body>');
   res.write('</html>');
   res.end();
})

server.listen(3000)

