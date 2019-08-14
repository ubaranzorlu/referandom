import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Joi from "joi-browser";
import FormClass from "./common/form";
import auth from "../services/authService";

class SigninModal extends FormClass {
  state = {
    data: { username: "", password: "" },
    errors: {}
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

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  changeButton = () => {
    this.setState({ forgotPassword: !this.state.forgotPassword });
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.state.forgotPassword ? "ŞİFREMİ UNUTTUM" : "GİRİŞ YAP"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <Form.Group className="mx-4">
              {this.renderInput("username", "Kullanıcı Adı", "username")}
            </Form.Group>
            <Form.Group
              className={`mx-4 d-${
                this.state.forgotPassword ? "none" : "block"
              }`}
            >
              {this.renderInput("password", "Şifre", "password")}
            </Form.Group>
            <Form.Group
              className={`mx-4 d-${
                this.state.forgotPassword ? "none" : "block"
              }`}
            >
              <Form.Check type="checkbox" label="Beni hatırla" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="flex-column justify-content-center mx-4">
            {this.state.forgotPassword || (
              <React.Fragment>
                {this.renderButton("Giriş yap")}
                <a className="mt-2" href="#" onClick={this.changeButton}>
                  Şifremi unuttum
                </a>
              </React.Fragment>
            )}
            {this.state.forgotPassword && (
              <React.Fragment>
                <Button variant="danger" block>
                  Şifreyi sıfırla
                </Button>
                <a className="mt-2" href="#" onClick={this.changeButton}>
                  Giriş yap
                </a>
              </React.Fragment>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
export default SigninModal;
