import React, { Component } from "react";
import { toast } from "react-toastify";
import Onerge from "./onerge";
import Comment from "./comment";
import CommentTextarea from "./commentTextarea";
import SharePanel from "./sharePanel";
import ExpandButton from "./expandButton";
import VoteButtons from "./voteButtons";
import logger from "../services/logService";
import { updateVoteCard } from "../services/voteCardService";
import { addComment, updateComment } from "../services/commentService";
import { updateUser } from "../services/userService";

class VoteCard extends Component {
  state = {
    display: false,
    expand: true,
    vote: null,
    comments: this.props.data.comments,
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

  loadUser() {
    if (this.state.isLoaded) return;

    let index = -1;
    if (this.props.user)
      this.props.user.votedCards.forEach((value, i) => {
        if (value.mainCard._id === this.props.data._id) index = i;
      });

    if (index !== -1) {
      const vote = this.props.user.votedCards[index].vote;

      this.state.expand = this.props.modalMode ? true : false;
      this.state.display = this.props.modalMode ? true : false;
      this.state.vote = vote;
      this.state.isLoaded = true;
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
      await updateVoteCard(voteCard);
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
    await updateUser(user);
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
    const comments = [...this.state.comments];
    const { data: newComment } = await addComment(comment);
    newComment.owner = comment.owner;

    comments.push(newComment);
    this.setState({ comments });

    let user = { ...this.props.user };
    user.numberOfComment = user.numberOfComment + 1;
    await updateUser(user);
  };

  handleUpvote = async comment => {
    const comments = [...this.state.comments];
    const index = comments.indexOf(comment);
    comments[index] = { ...comments[index] };

    const indexOfUser = comments[index].upvotedUsers.indexOf(
      this.props.user._id
    );
    if (indexOfUser !== -1) {
      comments[index].upvote--;
      comments[index].upvotedUsers.splice(indexOfUser);
    } else {
      comments[index].upvote++;
      comments[index].upvotedUsers.push(this.props.user._id);
    }

    this.setState({ comments });
    await updateComment(comments[index]);
  };

  render() {
    this.loadUser();

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
            {this.state.comments
              .slice(0)
              .reverse()
              .map(element => (
                <Comment
                  key={element._id}
                  data={element}
                  user={this.props.user}
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

export default VoteCard;
