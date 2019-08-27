import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Onerge from "./onerge";
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
  upvoteComment
} from "../store/actions/index";

class VoteCard extends Component {
  state = {
    display: false,
    expand: false,
    vote: null,
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
    }
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
        toast.error("Oy kullanabilmek için giriş yapın.");
        return;
      }
    }

    this.setState({ display: true, vote, chartData });

    let user = { ...this.props.user };
    user.votedCards.push({
      mainCard: voteCard._id,
      vote: vote
    });
    user.numberOfVote = user.votedCards.length;
    await this.props.onUpdateUser(user);
  };

  handleExpand = () => {
    if (this.state.expand) this.setState({ display: false, expand: false });
    else this.setState({ display: true, expand: true });
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
    this.props.onAddComment(comment, this.props.id);
  };

  handleUpvote = async comment => {
    this.props.onUpvoteComment(comment, this.props.id);
    this.forceUpdate();
    this.props.onUpdateComment(comment);
  };

  render() {
    return (
      <div className="onerge">
        <Onerge
          data={this.props.data}
          display={this.state.display}
          chartData={this.state.chartData}
          chartOptions={this.state.chartOptions}
        />
        <VoteButtons
          display={this.state.display}
          expand={this.state.expand}
          onClick={this.handleVote}
        />
        <ExpandButton
          onClick={this.handleExpand}
          role="expand"
          vote={this.state.vote}
          display={!this.state.expand}
        />

        <div className={`d-${this.state.display ? "block" : "none"}`}>
          <CommentTextarea
            user={this.props.user}
            vote={this.state.vote}
            onAddReason={this.handleAddComment}
          />
          <SharePanel data={this.props.data} vote={this.state.vote} />

          <div className="ui stackable two column grid yorumlar">
            {this.props.data.comments
              .slice(0)
              .reverse()
              .map(element => (
                <Comment
                  key={element._id}
                  data={element}
                  onUpvote={() => this.handleUpvote(element)}
                />
              ))}
          </div>

          <ExpandButton
            onClick={this.handleExpand}
            role="collapse"
            vote={this.state.vote}
            display={this.state.expand}
          />
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

const mapDispatchToProps = dispatch => {
  return {
    onUpdateVoteCard: voteCard => dispatch(updateVoteCard(voteCard)),
    onUpdateUser: user => dispatch(updateUser(user)),
    onAddComment: (comment, voteCardId) =>
      dispatch(addComment(comment, voteCardId)),
    onUpdateComment: comment => dispatch(updateComment(comment)),
    onUpvoteComment: (comment, voteCardId) =>
      dispatch(upvoteComment(comment, voteCardId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteCard);
