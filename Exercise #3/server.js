const http = require('http');
const url = require('url');
const members = require('./members');
const users = require('./users');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
  
    if (path === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('This is the home page');
      res.end();
    } else if (path === '/about') {
      const response = {
        status: 'success',
        message: 'response success',
        description: 'Exercise #03',
        date: new Date().toISOString(),
        data: members,
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(response));
      res.end();
    } else if (path === '/users') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(users));
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found');
      res.end();
    }
  });

  const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
