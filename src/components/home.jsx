import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import FormClass from "./common/form";
import Footer from "./footer";
import * as userService from "../services/userService";
import auth from "../services/authService";
import {
  uiStartRegisterButton,
  uiStopRegisterButton,
  uiStartLoginButton,
  uiStopLoginButton
} from "../store/actions/index";

class Home extends FormClass {
  state = {
    data: { email: "", password: "", username: "" },
    errors: {},
    isRegister: true
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  register = async () => {
    try {
      this.props.onStartRegisterButton();
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/akis";
      this.props.onStopRegisterButton();
    } catch (ex) {
      this.handleError(ex);
      this.props.onStopRegisterButton();
    }
  };

  login = async () => {
    try {
      this.props.onStartLoginButton();
      const { data } = this.state;
      await auth.login(data.username, data.password);
      window.location = "/akis";
      this.props.onStopLoginButton();
    } catch (ex) {
      this.handleError(ex);
      this.props.onStopLoginButton();
    }
  };

  handleError = ex => {
    if (ex.response && ex.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({ errors });
    }
  };

  changeMode = () => {
    this.setState({ isRegister: !this.state.isRegister });
  };

  enterPressed = event => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      if (this.state.isRegister) this.handleSubmit(event, this.register);
      else this.handleSubmit(event, this.login);
    }
  };

  render() {
    const { isRegister } = this.state;
    return (
      <React.Fragment>
        <main
          className="ui container"
          style={{
            minHeight: "100%",
            marginTop: "110px",
            marginBottom: "90px"
          }}
        >
          <div
            className="ui two column doubling grid"
            style={{ minHeight: "100%" }}
          >
            <div className="row index" style={{ minHeight: "100%" }}>
              <div className="column">
                <div className="ui container a-text-align">
                  <h2 className="ui inverted header">
                    <img
                      src="img/referandom-w.svg"
                      style={{
                        width: "42px",
                        height: "42px",
                        marginTop: "-10px"
                      }}
                      alt=""
                    />{" "}
                    Siyasi olayları oyla,
                  </h2>
                  <h2 className="ui inverted header">
                    <i className="comment outline icon" /> Sebeplerini belirt,
                  </h2>
                  <h2 className="ui inverted header">
                    <i className="users icon" /> Demokraside aktif ol!
                  </h2>
                </div>
              </div>
              <div className="column">
                <form className="ui large form">
                  <h2 className="ui inverted header">
                    {isRegister ? "Kayıt ol" : "Giriş yap"}
                  </h2>
                  <p className="ui inverted">Demokraside aktif ol!</p>
                  <div className="ui">
                    <div className="field">
                      <div className="ui left icon input d-flex flex-column">
                        <i className="user icon" />
                        {this.renderInput(
                          "username",
                          "Kullanıcı Adı",
                          "text",
                          "a-more-radius"
                        )}
                        {this.renderError("username")}
                      </div>
                    </div>
                    {isRegister && (
                      <div className="field">
                        <div className="ui left icon input d-flex flex-column">
                          <i className="envelope outline icon" />
                          {this.renderInput(
                            "email",
                            "E-posta adresi",
                            "text",
                            "a-more-radius"
                          )}
                          {this.renderError("email")}
                        </div>
                      </div>
                    )}
                    <div className="field">
                      <div className="ui left icon input d-flex flex-column">
                        <i className="lock icon" />
                        {this.renderInput(
                          "password",
                          "Şifre",
                          "password",
                          "a-more-radius"
                        )}
                        {this.renderError("password")}
                      </div>
                    </div>
                    <div
                      className={`ui fluid large blue submit button a-more-radius ${
                        isRegister
                          ? this.props.registerButton
                            ? "loading"
                            : ""
                          : this.props.loginButton
                          ? "loading"
                          : ""
                      }`}
                      onClick={
                        isRegister
                          ? e =>
                              this.handleSubmit(
                                e,
                                this.register,
                                this.state.isRegister
                              )
                          : e =>
                              this.handleSubmit(
                                e,
                                this.login,
                                this.state.isRegister
                              )
                      }
                    >
                      {isRegister ? "Kayıt ol " : "Giriş yap "}
                    </div>
                    <p className="inverted" style={{ marginTop: "10px" }}>
                      {isRegister ? "Hesabın mı var? " : "Hesabın yok mu? "}
                      <a href="#" onClick={this.changeMode}>
                        {isRegister ? "Giriş Yap" : "Üye ol"}
                      </a>
                    </p>
                  </div>

                  <div className="ui error message" />
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <div className="referandummy">
          <img src="img/referandom-w.svg" alt="" />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    registerButton: state.ui.registerButton,
    loginButton: state.ui.loginButton
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onStartRegisterButton: () => dispatch(uiStartRegisterButton()),
    onStopRegisterButton: () => dispatch(uiStopRegisterButton()),

    onStartLoginButton: () => dispatch(uiStartLoginButton()),
    onStopLoginButton: () => dispatch(uiStopLoginButton())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
