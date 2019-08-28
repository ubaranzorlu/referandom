import React, { Component } from "react";
import ContactModal from "./contactModal";

class Footer extends Component {
  state = {
    contactModalShow: false
  };

  contactModalClose = () => {
    this.setState({ contactModalShow: false });
  };

  render() {
    return (
      <React.Fragment>
        <footer id="profile-footer">
          <a className="img-cover" href="/">
            <img
              src="img/referandom-w.svg"
              alt=""
              srcset=""
              width="30"
              height="30"
            />
          </a>
          <div class="ui inverted text">
            <a class="item" href="/terms">
              <span>Kullanım Şartları</span>
            </a>
            <a class="item" href="/privacy">
              <span>Gizlilik Politikası</span>
            </a>
            <a
              class="item"
              href="#"
              onClick={() => this.setState({ contactModalShow: true })}
            >
              <span>İletişim</span>
            </a>
          </div>
          <div class="ui inverted text social">
            <a class="item" href="https://facebook.com/">
              <i class="facebook f icon" />
            </a>
            <a class="item" href="https://twitter.com/">
              <i class="twitter icon" />
            </a>
            <a class="item" href="https://instagram.com/">
              <i class="instagram icon" />
            </a>
            <a class="item" href="https://medium.com/">
              <i class="medium icon" />
            </a>
          </div>
        </footer>
        <ContactModal
          show={this.state.contactModalShow}
          onHide={this.contactModalClose}
        />
      </React.Fragment>
    );
  }
}

export default Footer;
