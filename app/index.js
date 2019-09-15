/*
 * Primary file for the API
 *
 */

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const fs = require('fs');
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
const unifiedServer = (request, response) => {
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
};

// HTTP
const httpServer = http.createServer((request, response) => {
  unifiedServer(request, response)
});

httpServer.listen(config.httpPort, () => {
  console.log(`The server is listening on port ${config.httpPort} now in ${config.environmentName} mode`);
});

// HTTPS
const httpsServerOptions = {
  'key': fs.readFileSync('./app/https/key.pem'),
  'cert': fs.readFileSync('./app/https/cert.pem'),
};
const httpsServer = https.createServer(httpsServerOptions, (request, response) => {
  unifiedServer(request, response)
});

httpsServer.listen(config.httpsPort, () => {
  console.log(`The server is listening on port ${config.httpsPort} now in ${config.environmentName} mode`);
});
