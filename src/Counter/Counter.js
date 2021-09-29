import React, {Component} from "react";

export default class Counter extends Component {
  state = {
    counter: 0
  }

  addCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  render() {
    // с оберткой:
    // return (
    //   <div>
    //     <h2>Counter: {this.state.counter} </h2>
    //     <button onClick={this.addCounter}>+</button>
    //     <button
    //       style={{marginBottom: '20px'}}
    //       onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
    //   </div>
    // )

    // без обертки: как массив тегов - но нужен key
    return [
      <h2 key={1}>Counter: {this.state.counter} </h2>,
      <button key={2}
              onClick={this.addCounter}>+</button>,
      <button key={3}
        style={{marginBottom: '20px'}}
        onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
    ]
  }
}
