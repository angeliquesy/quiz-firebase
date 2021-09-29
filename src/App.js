import React, {Component} from 'react';
import './App.css';
import Car from './Car/Car'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {

  constructor(props) {
    super(props) // т.к Component имеет свои пропс, нужно их наследовать

    this.state = {
      cars: [
        {
          name: 'Ford',
          year: 2018
        },
        {
          name: 'Audi',
          year: 2016
        },
        {
          name: 'Mazda',
          year: 2010
        },
      ],
      pageTitle: 'React components',
      showCars: false
    }
  }

  onChangeName = (name, index) => {
    const car = this.state.cars[index]
    car.name = name
    const cars = [...this.state.cars]
    // const cars = this.state.cars.concat() // клонирование массива - старый способ
    cars[index] = car
    this.setState({cars}) // = cars: cars

    // когда меняем состояние, должны создавать клон и новый стейт, т.к. не можем напрямую менять состояние
  }

  toggleCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars
    })
  }

  deleteHandler(index) {
    const cars = this.state.cars.concat()
    cars.splice(index, 1)

    this.setState({cars})
  }

  UNSAFE_componentWillMount() {
    console.log('App componentWillMount')
  }

  componentDidMount() {
    console.log('App componentDidMount')
  }

  render() {
    console.log('App render')

    const divStyle = {
      textAlign: 'center',
    }

    let cars = null

    if (this.state.showCars) {
      cars = this.state.cars.map((car, index) => {
        return (
          <ErrorBoundary key={index}>
            <Car
              name={car.name}
              year={car.year}
              onDelete={this.deleteHandler.bind(this, index)}
              onChangeName={event => this.onChangeName(event.target.value, index)}
              // лучший способ (оптимизация): onChangeTitle={this.changeTitleHandler.bind(this, car.name)}
            />
          </ErrorBoundary>
        )
      })
    }

    return (
      <div className='App' style={divStyle}>
        <h1>{this.state.pageTitle}</h1>

        <button onClick={this.toggleCarsHandler}>
          ToggleCars
        </button>

        {cars}

      </div>
    );
  }
}

export default App;
