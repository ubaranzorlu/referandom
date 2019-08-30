import React, { Component } from "react";
import { connect } from "react-redux";
import Onerge from "./onerge";
import OnergeExpired from "./onergeExpired";
import Comment from "./comment";
import CommentTextarea from "./commentTextarea";
import SharePanel from "./sharePanel";
import ExpandButton from "./expandButton";
import VoteButtons from "./voteButtons";
import logger from "../services/logService";
import {
  updateVoteCard,
  updateUser,
  updateComment,
  addComment,
  upvoteComment,
  handleShowToast,
  uiDisplayVoteCard,
  uiExpandVoteCard
} from "../store/actions/index";

class VoteCardForAkis extends Component {
  state = {
    comments: [],
    vote: this.props.vote && null,
    chartData: {
      labels: ["Katılıyorum", "Katılmıyorum"],
      datasets: [
        {
          data: [this.props.data.agree, this.props.data.disagree],
          backgroundColor: ["#09c635", "#d31021"]
        }
      ]
    },
    chartOptions: {
      responsive: false,
      legend: {
        labels: {
          fontColor: "white"
        }
      }
    }
  };
  componentDidMount() {
    let index = -1;
    if (this.props.user)
      this.props.user.votedCards.forEach((value, i) => {
        if (value.mainCard._id === this.props.data._id) index = i;
      });

    if (index !== -1) {
      const vote = this.props.user.votedCards[index].vote;
      this.setState({ vote });
      if (!this.handleDisplayVoteCards())
        this.props.onUiExpandVoteCard({
          _id: this.props.data._id,
          expand: true,
          display: false
        });
    }

    let comments = [];
    let maxAgree = 0,
      maxDisagree = 0;
    this.props.data.comments.forEach((element, i) => {
      if (maxAgree < element.upvote && element.vote) {
        comments[0] = element;
        maxAgree = element.upvote;
      }
      if (maxDisagree < element.upvote && !element.vote) {
        comments[1] = element;
        maxDisagree = element.upvote;
      }
    });
    this.setState({ comments });
  }

  handleVote = async vote => {
    this.setState({ vote });
    const voteCard = { ...this.props.data };
    voteCard[vote] = this.props.data[vote ? "agree" : "disagree"] + 1;
    const index = vote ? 0 : 1;

    const chartData = { ...this.state.chartData };
    chartData.datasets[0].data[index] = voteCard[vote];

    try {
      await this.props.onUpdateVoteCard(voteCard);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        logger.log(error);
        this.props.onShowToast("Oy kullanabilmek için giriş yapınız", "red");
        return;
      }
    }

    this.props.onUiDisplayVoteCard({
      _id: this.props.data._id,
      display: true,
      expand: this.handleExpandVoteCards()
    });
    this.setState({ vote, chartData });

    let user = { ...this.props.user };
    user.votedCards.push({
      mainCard: voteCard._id,
      vote: vote
    });
    user.numberOfVote = user.votedCards.length;
    await this.props.onUpdateUser(user);
  };

  handleExpand = () => {
    //    if (!this.state.expand) this.setState({ display: false, expand: true });
    // sorun var display false icin action cozumunu uretmelisin
    //    else {
    this.props.onUiDisplayVoteCard({
      _id: this.props.data._id,
      display: true,
      expand: false
    });
  };

  handleViewAll = () => {
    this.props.history.push(`onerge/${this.props.data._id}`);
  };

  handleAddComment = async text => {
    let comment = {
      owner: this.props.user,
      date: "10 minutes ago",
      text: text,
      vote: this.state.vote,
      upvote: 0,
      mainCardId: this.props.data._id,
      upvotedUsers: []
    };
    await this.props.onAddComment(comment, this.props.data._id);
  };

  handleUpvote = async comment => {
    this.props.onUpvoteComment(comment, this.props.data._id);
    this.forceUpdate();
    await this.props.onUpdateComment(comment);
  };

  handleDisplayVoteCards = () => {
    const uiVoteCards = this.findUiVoteCards();
    return uiVoteCards && uiVoteCards.display;
  };

  handleExpandVoteCards = () => {
    const uiVoteCards = this.findUiVoteCards();
    return uiVoteCards && uiVoteCards.expand;
  };

  findUiVoteCards = () => {
    return this.props.uiVoteCards
      .slice(0)
      .reverse()
      .find(element => {
        if (element._id === this.props.data._id) return element;
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="onerge">
          {!this.props.data.expired && (
            <Onerge
              data={this.props.data}
              display={this.handleDisplayVoteCards()}
              chartData={this.state.chartData}
              chartOptions={this.state.chartOptions}
              mode={this.props.mode}
              vote={this.state.vote}
            />
          )}
          {this.props.data.expired && (
            <OnergeExpired
              data={this.props.data}
              display={this.handleDisplayVoteCards()}
              chartData={this.state.chartData}
              chartOptions={this.state.chartOptions}
              mode={this.props.mode}
              vote={this.state.vote}
            />
          )}
          <VoteButtons
            display={this.handleDisplayVoteCards()}
            expand={
              this.props.data.expired ? true : !this.handleExpandVoteCards()
            }
            onClick={this.handleVote}
          />
          <ExpandButton
            onClick={this.handleExpand}
            role="expand"
            vote={this.state.vote}
            display={
              this.props.data.expired ? true : this.handleExpandVoteCards()
            }
            text="Genişlet"
            mode={this.props.mode}
          />

          <div
            className={`d-${this.handleDisplayVoteCards() ? "block" : "none"}`}
          >
            <CommentTextarea
              data={this.props.data}
              vote={this.state.vote}
              onAddReason={this.handleAddComment}
            />
            <SharePanel data={this.props.data} vote={this.state.vote} />

            <div className="ui stackable two column grid yorumlar">
              {this.state.comments.map(element => (
                <Comment
                  key={element._id}
                  data={element}
                  best={true}
                  onUpvote={() => this.handleUpvote(element)}
                />
              ))}
            </div>
            <ExpandButton
              onClick={this.handleViewAll}
              role="collapse"
              role2="viewAll"
              vote={this.state.vote}
              display={!this.handleExpandVoteCards()}
              text="Tümünü gör"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    uiVoteCards: state.ui.uiVoteCards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateVoteCard: voteCard => dispatch(updateVoteCard(voteCard)),
    onUpdateUser: user => dispatch(updateUser(user)),
    onAddComment: (comment, voteCardId) =>
      dispatch(addComment(comment, voteCardId)),
    onUpdateComment: comment => dispatch(updateComment(comment)),
    onUpvoteComment: (comment, voteCardId) =>
      dispatch(upvoteComment(comment, voteCardId)),
    onShowToast: (text, variant) => dispatch(handleShowToast(text, variant)),
    onUiDisplayVoteCard: data => dispatch(uiDisplayVoteCard(data)),
    onUiExpandVoteCard: data => dispatch(uiExpandVoteCard(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteCardForAkis);