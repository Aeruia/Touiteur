import React from "react";
import TouiteurAPI from "./../api/TouiteurAPI";
import Touit from "./../components/Touit";
import { isNull } from "util";
import soundfile from "./../audio/relentless.mp3";

class TouitContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      messages: [],
      timestamp: 0,
      word: window.location.hash
    };
  }
  componentDidMount() {
    setInterval(() => {
      if (this.state.word !== window.location.hash) {
        this.setState({
          word: window.location.hash.substring(1)
        });
      }
      TouiteurAPI.getMessages(
        result => {
          if (result.messages.length !== 0) {
            this.setState({
              isLoaded: true,
              timestamp: result.ts,
              messages: [...this.state.messages, ...result.messages]
            });
            var audio = new Audio(soundfile);
            if (result.messages.length !== 0) audio.play();
            TouiteurAPI.influencers(
              result => {
                this.setState({
                  isLoaded: true,
                  influencers: result.influencers
                });
              },
              error => {
                this.setState({
                  isLoaded: true,
                  message: "Error, someone fucked up!!!"
                });
              }
            );
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            message: "Error, someone fucked up!!!"
          });
        },
        this.state.timestamp
      );
    }, 10000);
  }
  componentWillUnmount() {}
  // My variant to get influencers
  // getInfluencers() {
  //   const { messages } = this.state;
  //   let names = [];
  //   messages.map(message => {
  //     names.push(message.name);
  //   });
  //   let namesUnique = [];
  //   names.map(name => {
  //     if (!namesUnique.includes(name)) {
  //       namesUnique.push(name);
  //     }
  //   });
  //   let influencers = [];
  //   for (let i = 0; i < namesUnique.length; i++) {
  //     influencers.push([
  //       namesUnique[i],
  //       names.filter(name => name === namesUnique[i]).length
  //     ]);
  //   }
  //   influencers.sort((a, b) => b[1] - a[1]);
  //   let top5 = influencers.slice(0, 5);
  //   const namesOfInfluencers = top5.map(influencer => influencer[0]);
  //   return namesOfInfluencers;
  // }
  render() {
    const { error, isLoaded, messages, influencers, word } = this.state;
    console.log(messages);
    let namesOfInfluencers = [];
    if (typeof influencers !== "undefined") {
      Object.entries(influencers).map(influencers =>
        namesOfInfluencers.push(influencers[0])
      );
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div className="bouncing-loader">
          <div />
          <div />
          <div />
        </div>
      );
    } else if (word.length !== 0) {
      let messagesWithWord;
      let re = new RegExp("\\b(" + word + ")\\b", "gi");
      messagesWithWord = messages.filter(
        message => message.message.match(re) || message.name.match(re)
      );

      return (
        <div className="touiteurContainer">
          {messagesWithWord
            .slice()
            .reverse()
            .map(message => (
              <Touit
                className={
                  namesOfInfluencers.includes(message.name)
                    ? "touit influencers"
                    : "touit"
                }
                messageid={message.id}
                name={message.name}
                message={message.message}
                likes={message.likes}
              />
            ))}
        </div>
      );
    } else {
      return (
        <div className="touiteurContainer">
          {messages
            .slice()
            .reverse()
            .map(message => (
              <Touit
                className={
                  namesOfInfluencers.includes(message.name)
                    ? "touit influencers"
                    : "touit"
                }
                messageid={message.id}
                name={message.name}
                message={message.message}
                likes={message.likes}
              />
            ))}
        </div>
      );
    }
  }
}

export default TouitContainer;
