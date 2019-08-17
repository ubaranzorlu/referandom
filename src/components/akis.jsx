import React, { Component } from "react";
import VoteCard from "./voteCard";
import ProfileCard from "./profileCard";
import LoadingSpinner from "./loadingSpinner";
import { getData } from "../services/voteCardService";
import { getUser } from "../services/userService";
import auth from "../services/authService";

class Akis extends Component {
  state = {
    data: [],
    user: null,
    isLoaded: false
  };
  async componentDidMount() {
    const { data } = await getData();
    this.setState({ data });

    const validUser = await auth.getCurrentUser();
    if (validUser) {
      const { data: user } = await getUser(validUser._id);
      this.setState({ user });
    }

    this.setState({ isLoaded: true });
  }

  render() {
    return (
      <React.Fragment>
        <LoadingSpinner isLoaded={this.state.isLoaded} />
        <main
          className={`ui container d-${this.state.isLoaded ? "flex" : "none"}`}
        >
          <div className="ui stackable grid" id="akis">
            <div className="five wide column tablet hidden mobile hidden">
              <ProfileCard user={this.state.user} />
            </div>
            <div className="eleven wide column" id="onergeler">
              {this.state.data.map(element => (
                <VoteCard
                  key={element._id}
                  data={element}
                  user={this.state.user}
                />
              ))}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Akis;
