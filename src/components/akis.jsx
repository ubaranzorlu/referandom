import React, { Component } from "react";
import { connect } from "react-redux";
import VoteCard from "./voteCard";
import ProfileCard from "./profileCard";
import LoadingSpinner from "./loadingSpinner";
import { getData, getCurrentUserWithDetails } from "../store/actions/index";

class Akis extends Component {
  async componentDidMount() {
    await this.props.onGetCurrentUserWithDetails();
    await this.props.onGetData();
  }

  render() {
    return (
      <React.Fragment>
        <LoadingSpinner isLoaded={this.props.isLoaded} />
        <main
          className={`ui container d-${this.props.isLoaded ? "flex" : "none"}`}
        >
          <div className="ui stackable grid" id="akis">
            <div className="five wide column tablet hidden mobile hidden">
              <ProfileCard />
            </div>
            <div className="eleven wide column" id="onergeler">
              {this.props.data.map(element => (
                <VoteCard key={element._id} id={element._id} data={element} />
              ))}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    data: state.voteCard.data,
    isLoaded: state.ui.isLoaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCurrentUserWithDetails: () => dispatch(getCurrentUserWithDetails()),
    onGetData: () => dispatch(getData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Akis);
