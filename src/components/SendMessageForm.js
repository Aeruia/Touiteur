import React, { Component } from "react";
import TouiteurAPI from "./../api/TouiteurAPI";

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, message } = this.state;
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          TouiteurAPI.sendMessages(name, message);
          this.setState({
            name: "",
            message: ""
          });
        }}
        className="SendingMessage"
      >
        <input
          className="sendMessageName"
          name="name"
          type="text"
          value={name}
          placeholder="Name"
          onChange={this.onChange}
        />
        <input
          className="sendMessageMessage"
          name="message"
          type="text"
          value={message}
          placeholder="Message"
          onChange={this.onChange}
        />
        <input className="" type="submit" value="Send" />
      </form>
    );
  }
}
export default SendMessage;
