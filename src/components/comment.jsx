import React, { Component } from "react";
import { connect } from "react-redux";
import { url } from "../config.json";

class Comment extends Component {
  state = { isUpvote: false };

  componentWillUpdate() {
    if (this.props.user)
      this.state.isUpvote = this.props.data.upvotedUsers.includes(
        this.props.user._id
      );
  }

  render() {
    const { owner, text, upvote, vote } = this.props.data;

    return (
      <div className="column">
        <div
          className={`ui segment yorum a-more-radius ${vote ? "green" : "red"}`}
        >
          <a className="info" href={owner.username}>
            <div className="ui avatar image">
              <img src={owner.ppLink} alt="" />
            </div>
            <div className="header" href="#">
              <h3>{owner.username}</h3>
              <p className="sub">
                <i className="bookmark icon" />
                <b>{vote ? "Katılmak" : "Katılmamak"}</b> için
                {this.props.best ? " en iyi " : " "} sebep.
              </p>
            </div>
          </a>
          <p className="content">{text}</p>
          <div
            className={`ui button destekle a-more-radius ${
              this.state.isUpvote ? "yellow" : "basic"
            }`}
            onClick={this.props.onUpvote}
          >
            <i
              className={`hand paper icon ${
                this.state.isUpvote ? "" : "yellow"
              }`}
            />
            <span className="text">
              Destekle{this.state.isUpvote ? "ndi " : " "}
            </span>
            <b>{upvote}</b>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  };
};

export default connect(mapStateToProps)(Comment);
