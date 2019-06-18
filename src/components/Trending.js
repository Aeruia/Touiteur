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
    }, 1000);
  }
  render() {
    const { error, isLoaded, trending } = this.state;
    const words = Object.entries(trending);
    const sortedWords = [...words].sort(function(a, b) {
      return b[1] - a[1];
    });
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="trendingContainer">
          {sortedWords.map(word => (
            <div className="word">
              {word[0]} => {word[1]}
            </div>
          ))}
        </div>
      );
    }
  }
}

export default Trending;
