import React from "react";
import Comment from "./Comment";
import Likes from "./Likes";

class Touit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showComment: false, messageid: 0 };
    this.handleClickComment = this.handleClickComment.bind(this);
  }
  handleClickComment(e) {
    this.setState({
      showComment: !this.state.showComment,
      messageid: e.target.parentElement.id
    });
    e.target.parentElement.className = "touit";
  }

  render() {
    let random = () => Math.floor(Math.random() * (255 - 40) + 40);
    let color = () => `rgb(${random()}, ${random()}, ${random()})`;
    const { showComment, messageid } = this.state;
    return (
      <div
        className={this.props.className}
        style={{ backgroundColor: color() }}
        id={this.props.messageid}
      >
        <div className="touitMessage">{this.props.message}</div>
        <div className="touitName">{this.props.name}</div>
        <Likes messageid={this.props.messageid} likes={this.props.likes} />
        <button className="commentButton" onClick={this.handleClickComment}>
          Comment
        </button>
        {showComment ? <Comment messageid={messageid} /> : null}
      </div>
    );
  }
}

export default Touit;
