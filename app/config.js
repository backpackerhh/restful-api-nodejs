/*
 * Create and export configuration variables
 *
 */

let environments = {};

// Default environment
environments.staging = {
  'port': 3000,
  'environmentName': 'staging'
};

environments.production = {
  'port': 5000,
  'environmentName': 'production'
};

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging

module.exports = environmentToExport;
