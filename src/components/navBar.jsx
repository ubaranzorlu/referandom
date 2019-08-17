import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import sizeMe from "react-sizeme";
import Joi from "joi-browser";
import FormClass from "./common/form";
import auth from "../services/authService";

class NavBar extends FormClass {
  state = {
    data: { username: "", password: "" },
    errors: {},
    trigger: this.props.user ? (
      <span>
        <img
          src={this.props.user.ppLink}
          className="ui avatar image"
          width="20"
        />
      </span>
    ) : null
  };
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      window.location = "/akis";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  renderNavItems = () => {
    const { user } = this.props;
    if (user) {
      return (
        <Dropdown trigger={this.state.trigger} pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Header>{user.username}</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item>
              <i className="fa fa-user pr-3" />
              Profil
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fa fa-cog pr-3" />
              Ayarlar
            </Dropdown.Item>
            <Dropdown.Item href="/logout">
              <i className="fa fa-times-circle pr-3" />
              Çıkış yap
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      return (
        <div className="ui form">
          <div className="fields item login">
            <div className="seven wide field email d-flex flex-column">
              {this.renderInput(
                "username",
                "Kullanıcı Adı",
                "text",
                "a-more-radius"
              )}
            </div>
            <div className="six wide field password d-flex flex-column">
              {this.renderInput(
                "password",
                "Şifre",
                "password",
                "a-more-radius"
              )}
              <a className="unuttum" href="#">
                Şifremi unuttum
              </a>
            </div>
            <div
              className="ui three wide field animated inverted white button login-button  a-more-radius"
              tabindex="0"
              onClick={this.handleSubmit}
            >
              <div className="visible content">Giriş Yap</div>
              <div className="hidden content">
                <i className="right arrow icon" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="ui" id="page">
        <Menu id="top">
          <div
            className={`ui top fixed inverted borderless menu ${
              this.props.user ? "" : "pb-3 p-2"
            }`}
          >
            <div className="ui container">
              <a className="item logo" href="/">
                <img src="img/referandom-w.svg" />
                <h1>REFERANDOM</h1>
              </a>
              <div className="right menu">{this.renderNavItems()}</div>
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}

export default sizeMe({ monitorHeight: true })(NavBar);
