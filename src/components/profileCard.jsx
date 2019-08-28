import React, { Component } from "react";
import { connect } from "react-redux";
import FooterCard from "./footerCard";

class ProfileCard extends Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        {user && (
          <React.Fragment>
            <div className="ui segment profile a-profile-card ">
              <div className="ui image cover">
                <img src="img/cover.jpg" alt="cover" />
              </div>
              <div className="content">
                <a className="info" href="/">
                  <div className="ui avatar image">
                    <img src="img/img_avatar3.png" alt="" />
                  </div>
                  <div className="header" href="#">
                    <h3>{user.username}</h3>
                  </div>
                  <div className="ui blue button duzenle a-more-radius">
                    Düzenle
                  </div>
                </a>
                <p className="bio">
                  {user.status
                    ? user.status
                    : "Student at University. Loves to build new tools using popular technologies as a creator."}
                </p>
                <ul className="links">
                  <li>
                    <i className="chain icon" />
                    <a
                      href={
                        user.url ? user.url : "referandombeta.herokuapp.com"
                      }
                    >
                      {user.url ? user.url : "referandombeta.herokuapp.com"}
                    </a>
                  </li>
                  <li>
                    <i className="envelope icon" />{" "}
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </li>
                  <li>
                    <i className="map marker alternate icon" /> No Location
                  </li>
                </ul>
              </div>
              <div className="extra content">
                <div className="ui two column grid">
                  <div className="column">
                    <i className="check icon" />
                    {user.numberOfVote} Oy
                  </div>
                  <div className="column right aligned">
                    <i className="comment icon" />
                    {user.numberOfComment} Yorum
                  </div>
                </div>
              </div>
            </div>
            <FooterCard />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  };
};

export default connect(mapStateToProps)(ProfileCard);
