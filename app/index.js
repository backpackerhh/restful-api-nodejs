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
  const httpMethod = request.method;
  const queryStringObject = parsedURL.query;
  const headers = request.headers;

  response.end('Hello World!\n');

  console.log('Request received!');
  console.log(`Path: ${trimmedPath}`);
  console.log(`HTTP method: ${httpMethod}`);
  console.log('Query string parameters:', queryStringObject);
  console.log('Headers:', headers);
});

server.listen(3000, () => {
  console.log('The server is listening on port 3000 now');
});
