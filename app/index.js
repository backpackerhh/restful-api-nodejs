/*
 * Primary file for the API
 *
 */

// Dependencies
const http = require('http');

// Server
const server = http.createServer((request, response) => {
  response.end('Hello World!\n');
});

server.listen(3000, () => {
  console.log('The server is listening on port 3000 now');
});
