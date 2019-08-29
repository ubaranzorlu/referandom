import React, { Component } from "react";
import { connect } from "react-redux";
import VoteCardForAkis from "../components/voteCardForAkis";
import ProfileCard from "../components/profileCard";
import LoadingSpinner from "../components/loadingSpinner";
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
          <div className="ui stackable grid basic segment" id="akis">
            <div className="ui rail mobile-hidden" style={{ width: "31.3%" }}>
              <div className="ui sticky fixed top  a-sticky">
                <ProfileCard />
              </div>
            </div>
            <div className="five wide column sidebar mobile-hidden" />
            <div className="eleven wide column" id="onergeler">
              {this.props.data.map(element => (
                <VoteCardForAkis
                  key={element._id}
                  data={element}
                  history={this.props.history}
                />
              ))}
            </div>{" "}
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
