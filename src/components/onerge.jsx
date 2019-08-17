import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class Onerge extends Component {
  render() {
    const { text, onergeyiVeren, date, category, url } = this.props.data;
    const { display, chartData, chartOptions } = this.props;

    return (
      <div className="ui segment icerik mb-0">
        <div
          className="content"
          style={{
            backgroundImage: "img/cover.jpg",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="overlay" />
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
          <a href={url} className="onergeMetni">
            <i className="chain icon" />
            Önerge Metni
          </a>
          <div className="justify-content-center d-flex">
            {display && (
              <div className="mt-4">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Onerge;
