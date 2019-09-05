import React, { Component } from "react";

class SharePanel extends Component {
  state = { copied: false };
  handleCopy = () => {
    this.setState({ copied: true });
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `https://referandom.com/onerge/${this.props.data._id}`
      );
    }

    setTimeout(() => this.setState({ copied: false }), 860);
  };

  render() {
    const { vote } = this.props;
    const { _id } = this.props.data;
    return (
      <React.Fragment>
        <h3 className="share-heading">Arkadaşlarınla Paylaş!</h3>
        <div className="ui segment share a-more-radius">
          <div className="ui four column grid">
            <a
              className="column i"
              href={`javascript:fbShare('https://referandom.com/onerge/${_id}', 'Referandomda bir önergeye ${
                vote ? "katılıyorum" : "katılmıyorum"
              }`}
            >
              <i className="facebook f icon" />
            </a>
            <a
              className="column i"
              href={`http://twitter.com/intent/tweet?text=https%3A%2F%2Freferandom.com%2Fonerge%2F${_id}`}
              target="_blank"
              data-lang="tr"
            >
              <i className="twitter icon" />
            </a>
            <a
              className="column i"
              href={`https://api.whatsapp.com/send?text=Referandomda bir önergeye ${
                vote ? "katılıyorum" : "katılmıyorum"
              } https://referandom.com/onerge/${_id}`}
              target="_blank"
            >
              <i className="whatsapp icon" />
            </a>
            <a
              className="column i linkKopyala"
              data-val={_id}
              onClick={this.handleCopy}
            >
              <i className="chain icon" />
              <span
                className={`copied transition d-${
                  this.state.copied ? "block" : "none"
                }`}
              >
                Kopyalandı!
              </span>
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SharePanel;
