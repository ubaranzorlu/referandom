import React from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import Joi from "joi-browser";
import FormClass from "./common/form";
import { updateUser, handleShowToast } from "../store/actions/index";
import { url } from "../config.json";

class EditModal extends FormClass {
  state = {
    data: {
      name: "",
      surname: "",
      status: "",
      website: "",
      email: "",
      location: ""
    },
    errors: {}
  };

  schema = {
    name: Joi.string(),
    surname: Joi.string(),
    status: Joi.string(),
    website: Joi.string(),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    location: Joi.string()
  };

  doSubmit = async () => {
    try {
      const user = { ...this.props.user, ...this.state.data };
      await this.props.onUpdateUser(user);
      this.props.onHide();
      this.props.onShowToast("Değiştirildi", "green");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
      this.props.onShowToast("Değiştirilemedi", "red");
    }
  };

  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        {user && (
          <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
              <Modal.Title>Düzenle</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ padding: 0 }}>
              <div className="ui segment profile">
                <div className="ui image cover">
                  <a href="#">
                    <img
                      style={{ borderRadius: 0 }}
                      src={url + "img/cover.jpg"}
                      alt="cover"
                    />
                  </a>
                </div>
                <div className="content">
                  <div className="info">
                    <div className="ui avatar image">
                      <a href="#">
                        <img src={url + "img/img_avatar3.png"} alt="" />
                      </a>
                    </div>
                    <div className="header" href="#">
                      <div className="d-flex" style={{ overFlow: "hidden" }}>
                        <div style={{ width: "44.5%" }} className="mr-2">
                          {this.renderBootstrapInput(
                            "name",
                            "Ad",
                            "name",
                            "",
                            false
                          )}
                        </div>
                        <div style={{ width: "44.5%" }}>
                          {this.renderBootstrapInput(
                            "surname",
                            "Soyad",
                            "surname",
                            "",
                            false
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bio">
                    {this.renderTextArea("status", "Durum", 3, "mb-2", false)}
                    <div className="ui left icon input d-flex flex-column mb-2">
                      {this.renderInput("website", "Website", "website", "")}
                      <i className="chain icon" />
                    </div>
                    <div className="ui left icon input d-flex flex-column mb-2">
                      {this.renderInput("email", "E-posta", "email", "")}
                      <i className="envelope icon" />
                    </div>
                    {this.renderError("email")}
                    <div className="ui left icon input d-flex flex-column">
                      {this.renderInput("location", "Konum", "location", "")}
                      <i className="map marker alternate icon" />
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="ui blue button duzenle"
                onClick={e => this.handleSubmit(e, null, "editProfil")}
              >
                Kaydet
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateUser: user => dispatch(updateUser(user)),
    onShowToast: (text, variant) => dispatch(handleShowToast(text, variant))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModal);
