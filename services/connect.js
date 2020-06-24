'use strict';

/**
 * mailjet.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const mailjet = require ('node-mailjet');

module.exports = {
  async mailjet() {
    const config = await strapi.plugins.mailjet.services.config.get();

    return mailjet
      .connect(config.publicKey, config.privateKey, {
        url: config.apiUrl,
        version: config.version,
        perform_api_call: true
      });
  },
};
