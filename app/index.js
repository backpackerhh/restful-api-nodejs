/*
 * Primary file for the API
 *
 */

// Dependencies
const http = require('http');
const url = require('url');

// Server
const server = http.createServer((request, response) => {
  const parsedURL = url.parse(request.url, true);
  const trimmedPath = parsedURL.pathname.replace(/^\/+|\/+$/g, '');

  response.end('Hello World!\n');

  console.log('Request received!');
  console.log(`Path: ${trimmedPath}`);
});

server.listen(3000, () => {
  console.log('The server is listening on port 3000 now');
});
