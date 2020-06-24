'use strict';

/**
 * mailjet.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const { mailjet } = require('./connect')

module.exports = {

  async subscribe(email, username, listId) {
    const connect = await mailjet();
    return connect
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
    const connect = await mailjet();
    return connect
      .post("contactslist", {'version': 'v3'})
      .id(listId)
      .action("managemanycontacts")
      .request({
        "Action": "addnoforce",
        "Contacts": subcribers
      });
  },

  async unsubscribe(email, listId) {
    const connect = await mailjet();
    return connect
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
    const connect = await mailjet();
    return connect
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
    const connect = await mailjet();
    return connect
      .get("contactslist", {'version': 'v3'})
      .request();
  }
};
