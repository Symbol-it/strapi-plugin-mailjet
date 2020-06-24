import React, {Component} from "react";
import Row from "../Row";
import {Label, Select, Button} from "@buffetjs/core";
import {request} from "strapi-helper-plugin";

class NewsletterConfigForm extends Component {

  constructor(props) {
    super(props);
    this.state =  {
      contactLists: [],
      listSelected: "",
      configId: '',
    }
  }

  componentDidMount() {
    this.getLists().then(lists => {
      this.setState({contactLists: lists});
    });

    this.getConfig().then(config => {
      this.setState({
        configId: config.id,
        listSelected: config.newsletterList,
      });
    });
  }

  getLists = async () => {
    try {
      const response = await request("/mailjet/contacts-list", {
        method: "GET"
      });

      return response.data.body.Data.map(list => {
        return {label: list.Name, value: list.ID}
      });
    } catch (e) {
      strapi.notification.error(`${e}`);
    }
    return [];
  };

  getConfig = async () => {
    try {
      const response = await request("/mailjet/config", {
        method: "GET"
      });

      return response.data;
    } catch (e) {
      strapi.notification.error(`${e}`);
    }
    return [];
  };

  saveConfig = async () => {
    try {
      const data = {
        newsletterList: this.state.listSelected
      };

      await request('/mailjet/config', {
        method: "PUT",
        body: data
      });

      strapi.notification.success(`Configuration saved.`);
    } catch (e) {
      strapi.notification.error(`${e}`);
    }
    return [];
  };

  handleChange = (event) => {
    let val = event.target.value;
    this.setState({ listSelected: val});
  }

  render() {
    return (
      <div>
        <Row className={"row"}>
          <div className={"col-4"}>
            <Label htmlFor="newsletterList">Newsletter List</Label>
            <Select
              name="newsletterList"
              onChange={this.handleChange}
              options={this.state.contactLists}
              value={this.state.listSelected}
            />
          </div>
        </Row>
        <Button label={'Valid'}
                onClick={this.saveConfig}/>
      </div>
    );
  }
}

export default NewsletterConfigForm