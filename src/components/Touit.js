import React from "react";

class Touit extends React.Component {
  render() {
    return (
      <div className="touit">
        <div className="touitName">{this.props.message}</div>
        <div className="touitMessage">{this.props.name}</div>
      </div>
    );
  }
}

export default Touit;
