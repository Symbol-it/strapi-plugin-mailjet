'use strict';

/**
 * mailjet.js controller
 *
 * @description: A set of functions called "actions" of the `mailjet` plugin.
 */

module.exports = {

  getList: async (ctx) => {
    const list = await strapi.plugins.mailjet.services.contact.getList();

    return ctx.send({ data: list,  ok: true });
  },

  getConfig: async (ctx) => {
    const config = await strapi.plugins.mailjet.services.config.get();
    return ctx.send({ data: config,  ok: true });
  },

  saveConfig: async (ctx) => {
    const config = await strapi.plugins.mailjet.services.config.update(ctx.request.body);

    return ctx.send({data: config, ok: true});
  }
};
