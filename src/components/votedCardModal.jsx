import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import VoteCard from "./voteCard";

class VotedCardModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Önerge</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <VoteCard
            key={this.props.data._id}
            data={this.props.data}
            user={this.props.user}
            className="p-2"
            modalMode={true}
          />
        </Modal.Body>
      </Modal>
    );
  }
}
export default VotedCardModal;
