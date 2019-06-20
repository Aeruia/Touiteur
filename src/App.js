import React from "react";
import "./App.css";
import TouitContainer from "./components/TouitContainer";
import Header from "./components/Header";
import SendMessage from "./components/SendMessageForm";
import Trending from "./components/Trending";
import Autocomplete from "./components/Autocomplete";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <SendMessage />
      <Autocomplete />
      <div className="main">
        <Trending />
        <TouitContainer />
      </div>
    </div>
  );
}

export default App;
