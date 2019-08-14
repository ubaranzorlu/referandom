import React, { Component } from "react";

class ProfileCard extends Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        {user && (
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
                  <h3>Furkan Atasoy</h3>
                  <p>@{user.username}</p>
                </div>
                <div className="ui blue button duzenle a-more-radius">
                  Düzenle
                </div>
              </a>
              <p className="bio">
                Student at Bogazici University. Loves to build new tools using
                popular technologies as a creator.
              </p>
              <ul className="links">
                <li>
                  <i className="chain icon" />
                  <a href="http://www.referandombeta.herokuapp.com">
                    referandombeta.herokuapp.com
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
        )}
      </React.Fragment>
    );
  }
}

export default ProfileCard;
