import React, { Component } from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";

class Comment extends Component {
  state = { isUpvote: false };

  loadUser() {
    const { upvotedUsers } = this.props.data;
    if (this.props.user)
      this.state.isUpvote = upvotedUsers.includes(this.props.user._id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.upvote < this.props.data.upvote) {
      this.setState({ isUpvote: true });
    }
    if (prevProps.data.upvote > this.props.data.upvote) {
      this.setState({ isUpvote: false });
    }
  }

  render() {
    const { owner, date, text, upvote } = this.props.data;
    const { isUpvote } = this.state;
    this.loadUser();

    return (
      <div className="column">
        <div
          className={`ui segment yorum a-more-radius ${true ? "green" : "red"}`}
        >
          <a className="info" href={owner.username}>
            <div className="ui avatar image">
              <img src={owner.ppLink} alt="" />
            </div>
            <div className="header" href="#">
              <h3>{owner.username}</h3>
              <p className="sub">
                <i className="bookmark icon" />
                <b>{true ? "Katılmak" : "Katılmamak"}</b> için en iyi sebep.
              </p>
            </div>
          </a>
          <p className="content">{text}</p>
          <div
            className={`ui button destekle a-more-radius ${
              isUpvote ? "yellow" : "basic"
            }`}
            onClick={this.props.onUpvote}
          >
            <i className={`hand paper icon ${isUpvote ? "" : "yellow"}`} />
            <span className="text">Destekle{isUpvote ? "ndi " : " "}</span>
            <b>{upvote}</b>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
