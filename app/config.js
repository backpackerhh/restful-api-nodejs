/*
 * Create and export configuration variables
 *
 */

let environments = {};

// Default environment
environments.staging = {
  'httpPort': 3000,
  'httpsPort': 3001,
  'environmentName': 'staging'
};

environments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'environmentName': 'production'
};

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging

module.exports = environmentToExport;
