'use strict';

/**
 * API settings
 * @typedef {Object} APISettings
 * @property {string} host
 * @property {string} port
 */

/**
 * Environment configuration
 * @typedef {Object} EnvConfig
 * @property {APISettings} api
 */

/**
 * @type {EnvConfig}
 */
const config = {
  api: {
    host: 'api.signnow.com',
    port: 443,
  },
};

module.exports = config;
