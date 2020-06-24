/*
 *
 * HomePage
 *
 */
import {
  HeaderNav,
} from "strapi-helper-plugin";

import MailjetConfigForm from '../../components/MailjetConfigForm'
import pluginId from '../../pluginId';
import Block from "../../components/Block";

import React, { memo, Component } from "react";

const getUrl = to =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

class HomePage extends Component {
  render() {
    return (
      <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
        <HeaderNav
          links={[
            {
              name: "Configuration",
              to: getUrl("")
            },
            {
              name: "Newsletter",
              to: getUrl("newsletter")
            }
          ]}
          style={{ marginTop: "4.4rem" }}
        />
        <div className="row">
          <Block
            title="Configuration"
            description="Configure Mailjet to use api"
            style={{ marginBottom: 12 }}
          >
            <MailjetConfigForm />
          </Block>
        </div>
      </div>
    );
  }
}

export default memo(HomePage);
