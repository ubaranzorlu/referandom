import React, { Component } from "react";
import ContactModal from "./contactModal";
import PrivacyModal from "./privacyModal";
import TermsModal from "./termsModal";

class Footer extends Component {
  state = {
    contactModalShow: false,
    privacyModalShow: false,
    termsModalShow: false
  };

  contactModalClose = () => {
    this.setState({ contactModalShow: false });
  };
  privacyModalClose = () => {
    this.setState({ privacyModalShow: false });
  };
  termsModalClose = () => {
    this.setState({ termsModalShow: false });
  };

  render() {
    return (
      <React.Fragment>
        <footer className="a-bg-special-2 border-top border-light p-3 mx-0">
          <ul className="row list-inline text-uppercase text-center">
            <li className="col list-inline-item a-footer-item-1 a-footer-text">
              <a
                href="#"
                className="text-light"
                onClick={() => this.setState({ termsModalShow: true })}
              >
                HİZMET POLİTİKASI
              </a>
            </li>
            <li className="col list-inline-item a-footer-item-2 a-footer-text">
              <a
                href="#"
                className="text-light"
                onClick={() => this.setState({ privacyModalShow: true })}
              >
                GİZLİLİK SÖZLEŞMESİ
              </a>
            </li>
            <li className="col list-inline-item a-footer-item-3 a-footer-text">
              <a
                href="#"
                onClick={() => this.setState({ contactModalShow: true })}
                className="text-light"
              >
                İLETİŞİM
              </a>
            </li>
          </ul>
          <h6 className="pt-3 pb-2 text-center text-light">Sosyal Medya</h6>
          <ul className="list-inline text-center">
            <li className="list-inline-item mx-3">
              <a href="https://www.facebook.com" className="text-light">
                <i className="fa fa-facebook fa-2x" aria-hidden="true" />
              </a>
            </li>
            <li className="list-inline-item mx-3">
              <a href="https://twitter.com" className="text-light">
                <i className="fa fa-twitter-square fa-2x" aria-hidden="true" />
              </a>
            </li>
            <li className="list-inline-item mx-3">
              <a href="https://www.instagram.com" className="text-light">
                <i className="fa fa-instagram fa-2x" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </footer>
        <ContactModal
          show={this.state.contactModalShow}
          onHide={this.contactModalClose}
        />
        <PrivacyModal
          show={this.state.privacyModalShow}
          onHide={this.privacyModalClose}
        />
        <TermsModal
          show={this.state.termsModalShow}
          onHide={this.termsModalClose}
        />
      </React.Fragment>
    );
  }
}

export default Footer;
