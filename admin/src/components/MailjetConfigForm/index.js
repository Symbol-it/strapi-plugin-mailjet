import React, {Component} from "react";
import Row from "../Row";
import {InputText, Label, Button, Toggle} from "@buffetjs/core";
import {request} from "strapi-helper-plugin";

class MailjetConfigForm extends Component {

  constructor(props) {
    super(props);
    this.state =  {
      enabled: false,
      version: "v3",
      apiUrl: "api.mailjet.com",
      publicKey: "",
      privateKey: "",
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getConfig().then(config => {
      this.setState({
        configId: config.id,
        enabled: config.enabled,
        version: config.version,
        apiUrl: config.apiUrl,
        publicKey: config.publicKey,
        privateKey: config.privateKey,
      });
    });
  }

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
        enabled: this.state.enabled,
        publicKey: this.state.publicKey,
        privateKey: this.state.privateKey,
        apiUrl: this.state.apiUrl,
        version: this.state.version
      }

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
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render() {
    return (
      <div>
        <Row className={"row"}>
          <div className={"col-4"}>
            <Label htmlFor="enabled">Enabled</Label>
            <Toggle name="enabled" value={this.state.enabled} onChange={this.handleChange}/>
          </div>
        </Row>
        <Row className={"row"}>
          <div className={"col-4"}>
            <Label htmlFor="apiUrl">Api Url</Label>
            <InputText name="apiUrl" value={this.state.apiUrl} onChange={this.handleChange}/>
          </div>
          <div className={"col-4"}>
            <Label htmlFor="version">Api version</Label>
            <InputText name="version" value={this.state.version} onChange={this.handleChange}/>
          </div>
        </Row>
        <Row className={"row"}>
          <div className={"col-4"}>
            <Label htmlFor="publicKey">Public Key</Label>
            <InputText name="publicKey" value={this.state.publicKey} onChange={this.handleChange}/>
          </div>
          <div className={"col-4"}>
            <Label htmlFor="privateKey">Private Key</Label>
            <InputText type="password" name="privateKey" value={this.state.privateKey} onChange={this.handleChange}/>
          </div>
        </Row>
        <Button label={'Valid'}
                onClick={this.saveConfig}
        />
      </div>
    );
  }
}

export default MailjetConfigForm