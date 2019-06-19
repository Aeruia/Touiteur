import React from "react";

import ReactDOM from "react-dom";
import SendComment from "./SendCommentForm";
import heart from "./../images/heart.jpg";

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
  handleClickLikes(e) {
    console.log(e.target.parentElement.id);
    console.log(e.target);
  }
  render() {
    let random = () => Math.floor(Math.random() * (255 - 40) + 40);
    let color = () => `rgb(${random()}, ${random()}, ${random()})`;
    return (
      <div
        className={this.props.className}
        style={{ backgroundColor: color() }}
        id={this.props.messageid}
      >
        <div className="touitMessage">{this.props.message}</div>
        <button className="Comment" onClick={this.handleClickComment}>
          Comment
        </button>

        {this.state.showComment ? <SendComment /> : null}

        <div className="touitName">{this.props.name}</div>
        <div className="likes">
          <img
            style={{ width: 30 }}
            src={heart}
            onClick={this.handleClickLikes}
            alt="like"
            defaultValue={0}
          />
          {this.props.likes}
        </div>
      </div>
    );
  }
}

export default Touit;
