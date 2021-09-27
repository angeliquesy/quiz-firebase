import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const divStyle = {
      textAlign: 'center',
      color: 'red'
    }
    return (
      <div className="App" style={divStyle}>
        <h1 style={{fontSize: '244px'}}>Hello world!</h1>
      </div>
    );

    // return React.createElement(
    //   'div',
    //   {
    //     className: 'App'
    //   },
    //   React.createElement(
    //     'h1',
    //     null,
    //     'Hello world!'
    //   )
    // )
  }
}

export default App;
