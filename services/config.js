'use strict';

/**
 * mailjet.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const storeUtils = require('../services/utils/store');
const configKey = 'mailjet';

module.exports = {
  async get() {
    return storeUtils.getModelConfiguration(configKey);
  },

  async update(config) {
    return storeUtils.setModelConfiguration(configKey, config);
  },
};
