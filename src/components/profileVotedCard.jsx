import React, { Component } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import VotedCardModal from "./votedCardModal";

class ProfileVotedCard extends Component {
  state = {
    modalShow: false
  };

  modalClose = () => {
    this.setState({ modalShow: false });
  };
  modalOpen = () => {
    this.setState({ modalShow: true });
  };

  render() {
    const { text, agree, disagree } = this.props.data.mainCard;
    const { vote } = this.props.data;
    return (
      <React.Fragment>
        <a href="#" className="text-light" onClick={this.modalOpen}>
          <Card
            className={`a-bg-${
              vote ? "agree" : "disagree"
            } border border-light ${this.props.className}`}
          >
            <Card.Text className="text-white text-center">
              <p className="a-paragraph-profile mx-2">{text}</p>
            </Card.Text>
            <ProgressBar>
              <ProgressBar
                variant="success"
                now={Math.round((agree / (agree + disagree)) * 100)}
                label={`%${Math.round((agree / (agree + disagree)) * 100)}`}
              />
              <ProgressBar
                variant="danger"
                now={Math.round((disagree / (agree + disagree)) * 100)}
                label={`%${Math.round((disagree / (agree + disagree)) * 100)}`}
              />
            </ProgressBar>
          </Card>
        </a>
        <VotedCardModal
          show={this.state.modalShow}
          onHide={this.modalClose}
          data={this.props.data.mainCard}
          user={this.props.user}
        />
      </React.Fragment>
    );
  }
}

export default ProfileVotedCard;
