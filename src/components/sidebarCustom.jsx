import React, { Component } from "react";
import { Icon, Menu, Sidebar, List } from "semantic-ui-react";
import { connect } from "react-redux";
import ContactModal from "./contactModal";

class SidebarCustom extends Component {
  state = {
    contactModalShow: false
  };

  contactModalClose = () => {
    this.setState({ contactModalShow: false });
  };

  render() {
    return (
      <React.Fragment>
        <Sidebar.Pushable className={`${this.props.className}`}>
          {this.props.user && (
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              onHide={this.props.handleSidebarClose}
              vertical
              visible={this.props.sidebarShow}
              className="w-75"
            >
              <div className="d-flex justify-content-start mt-4 ml-4 mb-2">
                <img
                  src={this.props.user.ppLink}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  alt=""
                />
              </div>
              <div className="d-flex justify-content-start flex-column text-left ml-4 mb-3">
                <h3 className="mb-0">
                  {this.props.user.name
                    ? this.props.user.name
                    : this.props.user.username}
                </h3>
                <p className="text-muted">@{this.props.user.username}</p>
              </div>

              <Menu.Item className="p-4" as="a" href="/profile">
                <List className="d-flex justify-content-start" size="huge">
                  <Icon className="mr-3" name="user" />
                  Profil
                </List>
              </Menu.Item>
              <Menu.Item className="p-4" as="a" href="/terms">
                <List className="d-flex justify-content-start" size="huge">
                  <Icon className="mr-3" name="file alternate" />
                  Kullanım Şartları
                </List>
              </Menu.Item>
              <Menu.Item className="p-4" as="a" href="/privacy">
                <List className="d-flex justify-content-start" size="huge">
                  <Icon className="mr-3" name="privacy" />
                  Gizlilik Politikası
                </List>
              </Menu.Item>
              <Menu.Item
                className="p-4"
                as="a"
                onClick={() => this.setState({ contactModalShow: true })}
              >
                <List className="d-flex justify-content-start" size="huge">
                  <Icon className="mr-3" name="envelope" />
                  İletişim
                </List>
              </Menu.Item>
              <Menu.Item className="p-4" as="a" href="/logout">
                <List className="d-flex justify-content-start" size="huge">
                  <Icon className="mr-3" name="times" />
                  Çıkış yap
                </List>
              </Menu.Item>
            </Sidebar>
          )}

          <Sidebar.Pusher>{this.props.children}</Sidebar.Pusher>
        </Sidebar.Pushable>
        <ContactModal
          show={this.state.contactModalShow}
          onHide={this.contactModalClose}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.data
  };
};

export default connect(mapStateToProps)(SidebarCustom);
