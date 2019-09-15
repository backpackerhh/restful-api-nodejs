/*
 * Primary file for the API
 *
 */

// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const config = require('./config');

// Handlers
const handlers = {};

handlers.sample = (data, callback) => {
  callback(406, { name: 'Sample Handler' });
};

handlers.notFound = (data, callback) => {
  callback(404);
};

// Router
const router = {
  sample: handlers.sample,
};

// Server
const server = http.createServer((request, response) => {
  const parsedURL = url.parse(request.url, true);
  const trimmedPath = parsedURL.pathname.replace(/^\/+|\/+$/g, '');
  const httpMethod = request.method;
  const queryStringObject = parsedURL.query;
  const { headers } = request;
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  request.on('data', (data) => {
    buffer += decoder.write(data);
  });

  request.on('end', () => {
    buffer += decoder.end();

    const chosenHandler = (trimmedPath in router) ? router[trimmedPath] : handlers.notFound;
    const data = {
      path: trimmedPath,
      method: httpMethod,
      queryStringObject: queryStringObject,
      headers: headers,
      payload: buffer,
    };

    chosenHandler(data, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 200;
      payload = typeof payload === 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      response.setHeader('ContentType', 'application/json');
      response.writeHead(statusCode);
      response.end(payloadString);

      console.log('Returning response: ', statusCode, payloadString);
    });
  });
});

server.listen(config.port, () => {
  console.log(`The server is listening on port ${config.port} now in ${config.environmentName} mode`);
});
