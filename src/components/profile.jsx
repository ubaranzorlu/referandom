import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "./profileCard";
import ProfileVotedCard from "./profileVotedCard";
import LoadingSpinner from "./loadingSpinner";
import auth from "../services/authService";
import { getUser } from "../services/userService";

class Profile extends Component {
  state = { user: null, isLoaded: false };

  async componentDidMount() {
    const validUser = await auth.getCurrentUser();
    if (validUser) {
      const { data: user } = await getUser(validUser._id);
      this.setState({ user });
    }

    this.setState({ isLoaded: true });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <LoadingSpinner
          navbarMargin={this.props.navbarMargin}
          isLoaded={this.state.isLoaded}
        />
        <Container className={`d-${this.state.isLoaded ? "flex" : "none"}`}>
          <Row className="justify-content-center">
            <Col md={6} className="mb-4">
              <ProfileCard user={user} />
            </Col>
            <Col md={6}>
              {user &&
                user.votedCards.map(element => (
                  <ProfileVotedCard
                    key={element._id}
                    className="mb-4 pt-2"
                    data={element}
                    user={user}
                  />
                ))}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
export default Profile;
