import React from "react";
import TouiteurAPI from "./../api/TouiteurAPI";

class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      trending: {}
    };
  }
  componentDidMount() {
    setInterval(() => {
      TouiteurAPI.trending(
        result => {
          this.setState({
            isLoaded: true,
            trending: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            message: "Error, someone fucked up!!!"
          });
        }
      );
    }, 100000);
  }
  componentWillUnmount() {}
  handleClick(e) {
    e.preventDefault();
    window.location.hash = e.target.textContent;
  }
  render() {
    window.onclick = e => {
      if (e.target.className !== "trendingWord") {
        window.location.hash = "";
      }
    }; // remove hash from URL

    let random = () => Math.floor(Math.random() * (255 - 40) + 40);
    let color = () => `rgb(${random()}, ${random()}, ${random()})`; //random RGB color
    const { error, isLoaded, trending } = this.state;
    const words = Object.entries(trending);
    const sortedWords = [...words].sort(function(a, b) {
      return b[1] - a[1];
    });
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
    } else {
      return (
        <div className="trendingContainer">
          {sortedWords.map((word, index) => (
            <div
              key={index}
              className="word"
              style={{ backgroundColor: color() }}
            >
              <div className="trendingWord" onClick={this.handleClick}>
                {word[0]}
              </div>{" "}
              <div>{word[1]}</div>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default Trending;
