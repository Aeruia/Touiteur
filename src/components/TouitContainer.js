import React from "react";
import TouiteurAPI from "./../api/TouiteurAPI";
import Touit from "./../components/Touit";

class TouitContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      messages: [],
      newmessages: [],
      timestamp: 0
    };
  }
  componentDidMount() {
    setInterval(() => {
      TouiteurAPI.getMessages(
        result => {
          this.setState({
            isLoaded: true,
            newmessages: result.messages,
            timestamp: result.ts
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            message: "Error, someone fucked up!!!"
          });
        },
        this.state.timestamp
      );
      if (this.state.newmessages !== []) {
        this.setState({
          messages: [...this.state.messages, ...this.state.newmessages]
        });
      }
    }, 2000);
  }
  render() {
    const { error, isLoaded, messages } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="touiteurContainer">
          {messages
            .slice()
            .reverse()
            .map(message => (
              <Touit
                key={message.id}
                name={message.name}
                message={message.message}
              />
            ))}
        </div>
      );
    }
  }
}

export default TouitContainer;
