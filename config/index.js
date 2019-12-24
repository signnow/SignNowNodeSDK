/* eslint-disable global-require */
'use strict';

let currentEnvironment = 'prod';

/**
 * @type {EnvConfig}
 */
const currentConfig = {};

/**
 * Returns environment config data
 * @return {EnvConfig}
 */
const getEnvConfig = () => currentConfig;

/**
 * Sets and returns environment config data
 * @param {string} [env]
 * @return {EnvConfig}
 */
const setEnvConfig = env => {
  if (env) {
    currentEnvironment = env;
    return Object.assign(currentConfig, require(`./${env}`));
  }

  return Object.assign(currentConfig, require(`./${currentEnvironment}`));
};

module.exports = {
  getEnvConfig,
  setEnvConfig,
};
