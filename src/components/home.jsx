import React, { Component } from "react";
import Joi from "joi-browser";
import FormClass from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class Home extends FormClass {
  state = {
    data: { email: "", password: "", username: "" },
    errors: {}
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

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/akis";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
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
                <div className="ui container">
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
                  <h2 className="ui inverted header">Kayıt ol</h2>
                  <p className="ui inverted">Demokraside aktif ol!</p>
                  <div className="ui">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon" />
                        {this.renderInput(
                          "username",
                          "Kullanıcı Adı",
                          "text",
                          "a-more-radius"
                        )}
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="envelope outline icon" />
                        {this.renderInput(
                          "email",
                          "E-posta adresi",
                          "text",
                          "a-more-radius"
                        )}
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon" />
                        {this.renderInput(
                          "password",
                          "Şifre",
                          "password",
                          "a-more-radius"
                        )}
                      </div>
                    </div>
                    <div
                      className="ui fluid large blue submit button a-more-radius"
                      onClick={this.handleSubmit}
                    >
                      Kayıt ol
                    </div>
                    <p className="inverted" style={{ marginTop: "10px" }}>
                      Hesabın mı var? <a href="/login">Giriş Yap</a>
                    </p>
                  </div>

                  <div className="ui error message" />
                </form>
              </div>
            </div>
          </div>
        </main>
        <div className="referandummy">
          <img src="img/referandom-w.svg" alt="" />
        </div>
      </React.Fragment>
    );
  }
}
export default Home;
