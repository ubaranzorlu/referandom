import React from "react";
import { Modal, Form } from "react-bootstrap";
import Joi from "joi-browser";
import FormClass from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class SignupModal extends FormClass {
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
      window.location = "/";
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
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>ÜYE OL</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <Form.Group className="mx-4">
              {this.renderInput("username", "Kullanıcı Adı", "username")}
            </Form.Group>
            <Form.Group className="mx-4">
              {this.renderInput("email", "Email", "email")}
            </Form.Group>
            <Form.Group className="mx-4">
              {this.renderInput("password", "Şifre", "password")}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="flex-column justify-content-center mx-4">
            {this.renderButton("Üye ol")}
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
export default SignupModal;
