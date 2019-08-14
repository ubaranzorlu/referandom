import React, { Component } from "react";
import { toast } from "react-toastify";
import { Doughnut } from "react-chartjs-2";
import Comment from "./comment";
import CommentTextarea from "./commentTextarea";
import SharePanel from "./sharePanel";
import logger from "../services/logService";
import { updateVoteCard } from "../services/voteCardService";
import { addComment, updateComment } from "../services/commentService";
import { updateUser } from "../services/userService";

class VoteCard extends Component {
  state = {
    vote: null,
    display: false,
    background: "bg-secondary",
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
    },
    expand: true
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
      this.state.background = `a-bg-${vote ? "agree" : "disagree"}`;
      this.state.isLoaded = true;
    }
  }

  handleVote = async vote => {
    this.setState({ vote });
    const voteCard = { ...this.props.data };
    voteCard[vote] = this.props.data[vote] + 1;
    const index = vote === "agree" ? 0 : 1;

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

    this.setState({ display: true, background: `a-bg-${vote}`, chartData });

    let user = { ...this.props.user };
    user.votedCards.push({
      mainCard: voteCard._id,
      vote: vote === "agree" ? true : false
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
    const { text } = this.props.data;
    this.loadUser();

    return (
      <div className="onerge">
        <div className="ui segment icerik mb-0">
          <div
            className="content"
            style={{
              backgroundImage: "img/cover.jpg",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="overlay ilk" />
            <div className="overlay iki" />
            <p className="info">{text}</p>
            <p className="sub">
              <span>
                <i className="user icon" /> Onergeyi Veren
              </span>
              <span>
                <i className="calendar outline icon" /> 30 Mayis 2019
              </span>
              <span>
                <i className="pencil alternate icon" />
                Kategori
              </span>
            </p>
            <a href="${onerge.baslik}" className="onergeMetni">
              <i className="chain icon" />
              Önerge Metni
            </a>
            <div className="justify-content-center d-flex  mt-4 mb-2">
              {this.state.display && (
                <Doughnut
                  data={this.state.chartData}
                  options={this.state.chartOptions}
                />
              )}
            </div>
          </div>
        </div>
        <div
          className={`ui two column grid butonlar d-${
            this.state.display ? "none" : this.state.expand ? "flex" : "none"
          }`}
        >
          <div
            className="column katiliyorum"
            onClick={() => this.handleVote("agree")}
          >
            Katılıyorum
          </div>
          <div
            className="column katilmiyorum"
            onClick={() => this.handleVote("disagree")}
          >
            Katılmıyorum
          </div>
        </div>
        <div
          className={`ui grid butonlar d-${
            this.state.expand ? "none" : "block"
          }`}
        >
          <div
            className={`column ${
              this.state.background === "a-bg-agree"
                ? "katiliyorum"
                : "katilmiyorum"
            }`}
            onClick={this.handleExpand}
          >
            Genişlet
            <i className="fa fa-chevron-down ml-3" aria-hidden="true" />
          </div>
        </div>
        <div className={`d-${this.state.display ? "block" : "none"}`}>
          <div className="kullanici-yorum">
            <CommentTextarea user={this.props.user} vote={this.state.vote} />
          </div>
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
          <div
            className={`ui grid a-more-radius butonlar d-${
              this.state.expand ? "block" : "none"
            }`}
          >
            <div
              className={`column a-daralt ${
                this.state.background === "a-bg-agree"
                  ? "katiliyorum"
                  : "katilmiyorum"
              }`}
              onClick={this.handleExpand}
            >
              Daralt
              <i className="fa fa-chevron-up ml-3" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VoteCard;
