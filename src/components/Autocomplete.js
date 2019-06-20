import React from "react";
import TouiteurAPI from "./../api/TouiteurAPI";
//Component to generate search bar, it uses most used words to suggests what to search
class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.trending = [];
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      trending: []
    };
  }
  componentDidMount() {
    //Get most used words in messages when loaded
    TouiteurAPI.trending(
      result => {
        this.setState({
          isLoaded: true
        });
        this.trending = Object.entries(result);
      },
      error => {
        this.setState({
          isLoaded: true,
          message: "Error, someone fucked up!!!"
        });
      }
    );
  }
  onChange = e => {
    //filters words with input from user
    let suggestions = [];
    this.trending.map(word => suggestions.push(word[0]));
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
    );
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };
  onClick = e => {
    //selects from suggestions with click
    window.location.hash = e.target.textContent;
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      //on press enter sends word to URL
      window.location.hash = e.target.value;
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } //Sets cursor when pressing up/down arrows
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };
  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { filteredSuggestions, showSuggestions, userInput }
    } = this;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <li className="suggestion" key={index} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <input
          className="autocomplete"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          placeholder="Search"
        />
        {suggestionsListComponent}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
