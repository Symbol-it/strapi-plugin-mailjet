/*
 *
 * Newsletter Form Page
 *
 */
import {
  HeaderNav
} from "strapi-helper-plugin";

import pluginId from '../../pluginId';
import Block from "../../components/Block";

import React, { memo, Component } from "react";
import NewsletterConfigForm from "../../components/NewsletterConfigForm";

const getUrl = to =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

class NewsletterPage extends Component {
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
            title="Newsletter"
            description="Select your newsletter list"
            style={{ marginBottom: 12 }}
          >
            <NewsletterConfigForm />
          </Block>
        </div>
      </div>
    );
  }
}

export default memo(NewsletterPage);
