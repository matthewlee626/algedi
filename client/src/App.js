import React, { Component } from 'react'
import Map from './components/Map'
import './App.css'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      place: '',
      mode: 'Show me restrooms!',
      center: {
        lat: 37.772,
        lng: -122.214
      },
      position: [
      ],
    }
    this.maps = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.findLocation = this.findLocation.bind(this);
  }

  componentDidMount() {
    this.findLocation();
  }

  findLocation =  () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({center: {lat: position.coords.latitude, lng: position.coords.longitude}})
    });
  }

  findRestroomAround = async() => {
    const center = this.state.center
    this.setState({mode: 'Loading...'})
    const response = await fetch(`/api/restrooms/${center.lat}/${center.lng}`)
    const restroomlocations = await response.json()
    this.setState({mode: "Show me restrooms!", place: '' })
    console.log(restroomlocations)
    restroomlocations.map( (restroomlocation) =>
      this.setState({position: this.state.position.concat(
          {
            lat: restroomlocation.latitude,
            lng: restroomlocation.longitude,
            id: restroomlocation.id,
          }
        )
      })
    )
    
  }

  findRestroom = async evt => {
    evt.preventDefault()
    const place = this.state.place
    if (place === ""){
      this.findRestroomAround()
    }else{
      this.setState({mode: 'Loading...'})
      const response = await fetch(`/api/restrooms/${place}`)
      
      const restroomlocations = await response.json()
      
      
      this.setState({mode: "Show me restrooms!", place: '' })
      console.log(restroomlocations)
      restroomlocations.map( (restroomlocation) =>
        this.setState({position: this.state.position.concat(
            {
              lat: restroomlocation.latitude,
              lng: restroomlocation.longitude,
              id: restroomlocation.id,
            }
          )
        })
      )     
    }
  }

  handleChange = evt => {
    console.log(evt)
    this.setState({ [evt.target.name]: evt.target.value })
  }

  render() {
    return (
      <div className="App">
        <h3>Algedi</h3>
        <form onSubmit={this.findRestroom}>
          <input
            type="text"
            name="place"
            placeholder="City Name"
            value={this.state.place}
            onChange={this.handleChange}
          />
          <button type="submit">{this.state.mode}</button>
        </form>
        <Map ref={this.maps} center={this.state.center} locations={this.state.position}></Map>
      </div>
    )
  }
}

export default App
