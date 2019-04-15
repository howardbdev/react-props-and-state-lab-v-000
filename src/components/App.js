import React from 'react'
import MyFunctionalComponent from './MyFunctionalComponent.js'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }

    this.onChangeType = this.onChangeType.bind(this)
  }

// bind function in constructor
  onChangeType(event){
    console.log(event.target.value)
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  // arrow function automatically binds `this`
  onFindPetsClick = () => {
    let url = "/api/pets"
    // if this.state.filters.type is not all....
    if (this.state.filters.type !== 'all') {
      // then adjust the url accordingly /api/pets?type=cat
      url += `?type=${this.state.filters.type}`
    }

    fetch(url)
      .then(r => r.json())
      .then(petsJSONArray => {
        this.setState({
          pets: petsJSONArray
        }, ()=>console.log(this.state.pets))
      })
  }

  onAdoptPet = (id) => {
    // const pet = Object.assign({}, this.state.pets.find(p => p.id === id))
    // above and below are equiavalent
    const pet = { ...this.state.pets.find(p => p.id === id)}
    // set the state of a pet from the opposite of what it was...
    pet.isAdopted = pet.isAdopted ? false : true
    const index = this.state.pets.indexOf(pet)
    console.log("index is", index)
    this.setState({
      pets: [...this.state.pets.slice(0, index), pet, ...this.state.pets(index, this.state.pets.length)]
    }, console.log(this.state.pets))


  }

  render() {
    const nameObj = {name: "Howard"}
    return (
      <div className="ui container">
        <MyFunctionalComponent props={ nameObj }/>
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
