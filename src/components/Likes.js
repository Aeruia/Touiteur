import React from "react";
import TouiteurAPI from "./../api/TouiteurAPI";

class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: true };
    this.handleClickLikes = this.handleClickLikes.bind(this);
  }
  handleClickLikes(e) {
    this.setState({ clicked: !this.state.clicked });
    this.state.clicked
      ? TouiteurAPI.sendLikes(this.props.messageid)
      : TouiteurAPI.deleteLikes(this.props.messageid);
  }
  render() {
    return (
      <div className="likes">
        <div className="heart" onClick={this.handleClickLikes} />
        <div>{this.props.likes}</div>
      </div>
    );
  }
}
export default Likes;
