import React, { Component } from "react";
import { Progress } from "semantic-ui-react";

class ChartBar extends Component {
  render() {
    const { parti, meclis, name, mode } = this.props;
    console.log(meclis);
    return (
      <React.Fragment>
        <div className="col">
          <h4>{name}</h4>
          <Progress
            className={`bg-danger ${
              mode === "profile" ? "border border-light" : ""
            }`}
            percent={
              (meclis[parti].agree * 100) /
              (Number(meclis[parti].agree) + Number(meclis[parti].disagree))
            }
            success
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ChartBar;
