import React, { Component } from "react";
import { Button, Alert, Form } from "react-bootstrap";
import Joi from "joi-browser";
import { toast } from "react-toastify";

class FormClass extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    toast.info("Hatalı Deneme!");

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    toast.warning("Giriş yapılıyor...");
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
      toast.info("Hatalı Deneme!");
    } else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton = (label, type = "submit", variant = "primary") => {
    return (
      <Button variant={variant} block type={type}>
        {label}
      </Button>
    );
  };

  renderInput = (name, placeholder, type = "text", className = "") => {
    const { data, errors } = this.state;

    return (
      <React.Fragment>
        <input
          className={className}
          name={name}
          type={type}
          placeholder={placeholder}
          value={data[name]}
          onChange={this.handleChange}
        />
      </React.Fragment>
    );
  };

  renderTextArea = (name, placeholder, rows) => {
    const { data, errors } = this.state;

    return (
      <React.Fragment>
        <Form.Control
          name={name}
          id={name}
          as="textarea"
          placeholder={placeholder}
          rows={rows}
          value={data[name]}
          onChange={this.handleChange}
        />
        {errors[name] && <Alert variant="danger">{errors[name]}</Alert>}
      </React.Fragment>
    );
  };
}

export default FormClass;
