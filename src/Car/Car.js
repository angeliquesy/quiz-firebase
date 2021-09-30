import React from 'react';
import classes from './Car.module.scss'
import PropTypes, {number} from 'prop-types'
import withClass from "../hoc/withClass";

class Car extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.index === 0) {
      //this.inputRef.focus() - старая версия
      this.inputRef.current.focus()
    }
  }

  render() {
    const inputClasses = [classes.input]

    if (this.props.name !== '') {
      inputClasses.push(classes.green)
    } else {
      inputClasses.push(classes.red)
    }

    if (this.props.name.length > 4) {
      inputClasses.push(classes.bold)
    }

    return (
      <React.Fragment>
        <h3>Car name: {this.props.name}</h3>
        <p>Year: <strong>{this.props.year}</strong></p>
        <input
          //ref={(inputRef) => this.inputRef = inputRef} - старый способ (без конструктора)
          ref={this.inputRef}
          type='text'
          onChange={this.props.onChangeName}
          value={this.props.name}
          className={inputClasses.join(' ')}
        />
        <button onClick={this.props.onDelete}>Delete</button>
      </React.Fragment>
    )
  }
}

Car.propTypes = { // доступно только в React.Component
  name: PropTypes.string.isRequired,
  year: PropTypes.number,
  onDelete: PropTypes.func,
  onChangeName: PropTypes.func,
  index: number
}

export default withClass(Car, classes.Car);
