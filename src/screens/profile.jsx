import React, { Component } from "react";
import { connect } from "react-redux";
import VoteCardForAkis from "../components/voteCardForAkis";
import ProfileCard from "../components/profileCard";
import FooterCard from "../components/footerCard";
import LoadingSpinner from "../components/loadingSpinner";
import {
  getCurrentUserForProfileMoreDetails,
  uiFinishLoading
} from "../store/actions/index";

class Profile extends Component {
  async componentDidMount() {
    await this.props.onGetCurrentUserForProfileMoreDetails();
    this.props.onUiFinishLoading();
  }

  render() {
    return (
      <React.Fragment>
        <LoadingSpinner isLoaded={this.props.isLoaded} />
        <section className="desktop-hidden">
          <main
            className={`row justify-content-center d-${
              this.props.isLoaded ? "flex" : "none"
            }`}
          >
            <div className="col-11 col-sm-10 col-md-9 col-lg-6">
              <ProfileCard />

              {this.props.user &&
                this.props.user.votedCards.map(element => (
                  <VoteCardForAkis
                    key={element._id}
                    data={element.mainCard}
                    vote={element.vote}
                    history={this.props.history}
                    mode="profile"
                  />
                ))}
            </div>
          </main>
        </section>
        <section className="mobile-hidden">
          <main
            className={`ui container d-${
              this.props.isLoaded ? "flex" : "none"
            }`}
          >
            <div className="ui stackable grid basic segment" id="akis">
              <div className="ui rail" style={{ width: "31.3%" }}>
                <div className="ui sticky fixed top  a-sticky">
                  <ProfileCard />
                  <FooterCard />
                </div>
              </div>
              <div className="five wide column sidebar mobile-hidden" />
              <div className="eleven wide column" id="onergeler">
                {this.props.user &&
                  this.props.user.votedCards.map(element => (
                    <VoteCardForAkis
                      key={element._id}
                      data={element.mainCard}
                      vote={element.vote}
                      history={this.props.history}
                      mode="profile"
                    />
                  ))}
              </div>
            </div>
          </main>
        </section>
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
    onGetCurrentUserForProfileMoreDetails: () =>
      dispatch(getCurrentUserForProfileMoreDetails()),
    onUiFinishLoading: () => dispatch(uiFinishLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
