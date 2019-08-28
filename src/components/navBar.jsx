import React from "react";
import { connect } from "react-redux";
import { Dropdown, Menu } from "semantic-ui-react";
import { Alert } from "react-bootstrap";
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

  enterPressed = event => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      if (this.state.isRegister) this.handleSubmit(event, this.register);
      else this.handleSubmit(event, this.login);
    }
  };

  renderNavItems = () => {
    const { user } = this.props;
    if (user) {
      return (
        <div className="right menu">
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
        </div>
      );
    } else {
      return (
        <div className="right menu not-login">
          <div className="ui form">
            <div className="fields item login">
              <div className="seven wide field email d-flex flex-column">
                {this.renderInput(
                  "username",
                  "Kullanıcı Adı",
                  "text",
                  `a-more-radius  ${
                    this.state.errors["username"] ? "a-red-border" : ""
                  }`
                )}
              </div>
              <div className="six wide field password d-flex flex-column">
                {this.renderInput(
                  "password",
                  "Şifre",
                  "password",
                  `a-more-radius  ${
                    this.state.errors["password"] ? "a-red-border" : ""
                  }`
                )}
                <a className="unuttum" href="#">
                  Şifremi unuttum
                </a>
              </div>
              <div
                className="ui three wide field animated inverted white button login-button  a-more-radius"
                onClick={this.handleSubmit}
              >
                <div className="visible content">Giriş Yap</div>
                <div className="hidden content">
                  <i className="right arrow icon" />
                </div>
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
              this.props.user ? "" : "pb-3 p-2 "
            }`}
          >
            <div className="ui container d-flex justify-content-center">
              <a className="item logo" href="/">
                <img src="img/referandom-w.svg" />
                <h1 id="logo">REFERANDOM</h1>
              </a>
              {this.renderNavItems()}
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(
  sizeMe({ monitorHeight: true })(NavBar)
);
