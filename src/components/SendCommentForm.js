import React, { Component } from "react";
import TouiteurAPI from "./../api/TouiteurAPI";

class SendComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      comment: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, comment } = this.state;
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          TouiteurAPI.sendComment(name, comment, this.props.messageid);
          this.setState({
            name: "",
            comment: ""
          });
        }}
        className="SendingComment"
      >
        <input
          className="sendCommentName"
          name="name"
          type="text"
          value={name}
          placeholder="Name"
          onChange={this.onChange}
        />
        <input
          className="sendCommentComment"
          name="comment"
          type="text"
          value={comment}
          placeholder="Comment"
          onChange={this.onChange}
        />
        <input className="sendButton" type="submit" value="Send" />
      </form>
    );
  }
}
export default SendComment;
