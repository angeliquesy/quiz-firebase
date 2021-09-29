import React, {Component} from "react";
import Auxiliary from "../hoc/Auxiliary";

export default class Counter extends Component {
  state = {
    counter: 0
  }

  addCounter = () => {
    // setState - ассинхронный, поэтому если будет меняться параллельно, может быть ошибка
    // this.setState({
    //   counter: this.state.counter + 1
    // })

    // способ работы со 100% предыдущим стейтом, который не может быть изменен асинхронно
    this.setState((prevState) => {
      return {
        counter: prevState.counter + 1
      }
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
    // return [
    //   <h2 key={1}>Counter: {this.state.counter} </h2>,
    //   <button key={2}
    //           onClick={this.addCounter}>+</button>,
    //   <button key={3}
    //     style={{marginBottom: '20px'}}
    //     onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
    // ]

    // без обертки через Fragment
    // return (
    //   <React.Fragment> // или <>
    //     <h2>Counter: {this.state.counter} </h2>
    //     <button onClick={this.addCounter}>+</button>
    //     <button
    //       style={{marginBottom: '20px'}}
    //       onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
    //   </React.Fragment>
    // )

    // без обертки через собственный компонент высшего порядка
    return (
      <Auxiliary>
        <h2>Counter: {this.state.counter} </h2>
        <button onClick={this.addCounter}>+</button>
        <button
          style={{marginBottom: '20px'}}
          onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
      </Auxiliary>
    )
  }
}
