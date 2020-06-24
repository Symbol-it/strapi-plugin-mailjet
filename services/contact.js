'use strict';

/**
 * mailjet.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const { mailjet } = require('./mailjet-client')

module.exports = {

  async subscribe(email, username, listId) {
    const client = await mailjet();
    return client
      .post("contactslist", {'version': 'v3'})
      .id(listId)
      .action("managecontact")
      .request({
          "Name": username,
          "Properties": "object",
          "Action": "addnoforce",
          "Email": email
      });
  },

  async subscribeMultiple(subcribers, listId) {
    const client = await mailjet();
    return client
      .post("contactslist", {'version': 'v3'})
      .id(listId)
      .action("managemanycontacts")
      .request({
        "Action": "addnoforce",
        "Contacts": subcribers
      });
  },

  async unsubscribe(email, listId) {
    const client = await mailjet();
    return client
      .post("contactslist", {'version': 'v3'})
      .id(listId)
      .action("managecontact")
      .request({
        "Email": email,
        "Action": "unsub",
        "Properties": "object",
      });
  },

  async remove(email, listId) {
    const client = await mailjet();
    return client
      .post("contactslist", {'version': 'v3'})
      .id(listId)
      .action("managecontact")
      .request({
        "Email": email,
        "Action": "remove",
        "Properties": "object",
      });
  },

  async getList() {
    const client = await mailjet();
    return client
      .get("contactslist", {'version': 'v3'})
      .request();
  }
};
