/*
 * Primary file for the API
 *
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// Server
const server = http.createServer((request, response) => {
  const parsedURL = url.parse(request.url, true);
  const trimmedPath = parsedURL.pathname.replace(/^\/+|\/+$/g, '');
  const httpMethod = request.method;
  const queryStringObject = parsedURL.query;
  const headers = request.headers;
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  request.on('data', (data) => {
    buffer += decoder.write(data);
  });

  request.on('end', () => {
    buffer += decoder.end();

    response.end('Hello World!\n');

    console.log('Request received!');
    console.log(`Path: ${trimmedPath}`);
    console.log(`HTTP method: ${httpMethod}`);
    console.log('Query string parameters:', queryStringObject);
    console.log('Headers:', headers);
    console.log(`Payload: ${buffer}`);
  });
});

server.listen(3000, () => {
  console.log('The server is listening on port 3000 now');
});
