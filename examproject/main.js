const http = require('http');
const fs = require('fs');
const url = require('url');


const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is Home page');
    res.end();
  } else if (req.url === '/About') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This i about page');
    res.end();
  } else if (req.url === '/Contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is contact page');
    res.end();
  } else if (req.url === '/file-write' && req.method === 'GET') {
    fs.writeFile('demo.txt', 'Hello world', (err) => {
      if (err) throw err;
      console.log('File written successfully');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File written successfully');
    });
  } else if (req.url === '/upload' && req.method === 'POST') {
    const upload = multer({ dest: 'uploads/' }).single('file');

    upload(req, res, (err) => {
      if (err) {
        return res.end('Error uploading file.');
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File uploaded successfully');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 5500;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});