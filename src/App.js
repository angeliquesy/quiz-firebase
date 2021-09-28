import React, {Component} from 'react';
import './App.css';
import Car from './Car/Car'

class App extends Component {

  state = {
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

  changeTitleHandler = newTitle => {
    this.setState({
      pageTitle: newTitle
    })

    // this.state.pageTitle = 'Changed!' не сработает
  }

  toggleCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars
    })
  }

  render() {
    const divStyle = {
      textAlign: 'center',
    }

    const cars = this.state.cars

    return (
      <div className='App' style={divStyle}>
        <h1>{this.state.pageTitle}</h1>

        <button onClick={this.toggleCarsHandler}>
          ToggleCars
        </button>

        {
          // for, if - запрещены в jsx
          this.state.showCars ?
            this.state.cars.map((car, index) => {
              return (
                <Car
                  key={index}
                  name={car.name}
                  year={car.year}
                  onChangeTitle={() => this.changeTitleHandler(car.name)}
                  // лучший способ (оптимизация): onChangeTitle={this.changeTitleHandler.bind(this, car.name)}
                />
              )
            })
          : null
        }

      </div>
    );
  }
}

export default App;
