import React, { Component } from 'react';
import Button from 'material-ui/Button';
import './App.css';

class App extends Component {
  state = {meeseeks: []}

  componentDidMount() {
    fetch('/meeseeks')
      .then(res => res.json())
      .then(meeseeks => this.setState({ meeseeks }));
  }

  render() {
    return (
      <div className="App">
        <Button variant="raised" color="primary">
          Hello World
        </Button>
        <h1>meeseeks</h1>
        {this.state.meeseeks.map(meeseek =>
          <div key={meeseek.id}>{meeseek.username}</div>
        )}
      </div>
    );
  }
}

export default App;