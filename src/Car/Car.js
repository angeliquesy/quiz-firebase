import React from 'react';
//import Radium from 'radium'
import './Car.css'

class Car extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('Car componentWillReceiveProps')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Car shouldComponentUpdate')
    return nextProps.name.trim() !== this.props.name.trim()
      // вернет true если изменилось имя, false если добавили пробел
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    // static - без доступа к this
    console.log('Car gerDerivedStateFromProps')

    return prevState
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log('Car componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('Car componentDidUpdate')
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Car getSnapshotBeforeUpdate')
  }

  componentWillUnmount() {
    console.log('Car componentWillUnmount')
  }

  render() {
    if (Math.random() > 0.7) {
      throw new Error('Car random failed')
    }

    const inputClasses = ['input']

    if (this.props.name !== '') {
      inputClasses.push('green')
    } else {
      inputClasses.push('red')
    }

    if (this.props.name.length > 4) {
      inputClasses.push('bold')
    }

    const style = {
      border: '1px solid #ccc',
      boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14)',
      ':hover': {
        border: '1px solid #aaa',
        boxShadow: '0 4px 15px 0 rgba(0, 0, 0, .25)',
      }
    }

    return (
      <div style={style} className='car'>
        <h3>Car name: {this.props.name}</h3>
        <p>Year: <strong>{this.props.year}</strong></p>
        <input
          type='text'
          onChange={this.props.onChangeName}
          value={this.props.name}
          className={inputClasses.join(' ')}
        />
        <button onClick={this.props.onDelete}>Delete</button>
      </div>
    )
  }
}

export default Car;
