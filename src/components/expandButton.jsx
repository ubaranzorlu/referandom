import React, { Component } from "react";

class ExpandButton extends Component {
  render() {
    const { vote, onClick, role, display } = this.props;

    return (
      <button className={`ui grid butonlar d-${display ? "block" : "none"}`}>
        <div
          className={`column ${vote ? "katiliyorum" : "katilmiyorum"} ${
            role === "collapse" ? "a-daralt" : ""
          }`}
          onClick={onClick}
        >
          {role === "expand" ? "Genişlet" : "Daralt"}
          <i
            className={`fa fa-chevron-${
              role === "expand" ? "down" : "up"
            } ml-3`}
            aria-hidden="true"
          />
        </div>
      </button>
    );
  }
}

export default ExpandButton;
