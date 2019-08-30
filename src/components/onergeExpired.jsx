import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { url } from "../config.json";

class Onerge extends Component {
  render() {
    const {
      text,
      onergeyiVeren,
      date,
      category,
      backgroundImage
    } = this.props.data;
    const { display, chartData, chartOptions, mode, vote } = this.props;

    return (
      <div className="ui segment icerik mb-0">
        <div className="content">
          <div
            className={`${
              mode === "profile"
                ? vote
                  ? "a-agree-card"
                  : "a-disagree-card"
                : "overlay"
            }`}
          />
          <p className="info">{text}</p>
          <p className="sub">
            <span>
              <i className="user icon" /> {onergeyiVeren}
            </span>
            <span>
              <i className="calendar outline icon" /> {date}
            </span>
            <span>
              <i className="pencil alternate icon" />
              {category}
            </span>
          </p>
          <a href={this.props.data.url} className="onergeMetni">
            <i className="chain icon" />
            Önerge Metni
          </a>
          <h3 style={{ color: "red" }}>EXPIRED</h3>
          <div className="justify-content-center d-flex row">
            <div className="col">
              {" "}
              {display && (
                <div className="mt-4">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              )}
            </div>
            <div className="col">
              {" "}
              {display && (
                <div className="mt-4">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Onerge;
