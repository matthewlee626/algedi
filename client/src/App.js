import React, { Component } from 'react'
import Map from './components/Map'
import './App.css'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      place: '',
      currentPin: '',
      mode: 'Show me restrooms!',
      center: {
        lat: 37.772,
        lng: -122.214
      },
      position: [
      ],
      idcounter: 0
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

  findRestroom = async evt => {
    try{
      evt.preventDefault()
      const place = this.state.place
      const center = this.state.center
      this.setState({mode: 'Loading...'})
      var response = ''
      if (place === ""){
        response = await fetch(`/api/restrooms/${center.lat}/${center.lng}`)
      }else{
        response = await fetch(`/api/restrooms/${place}`)
      }

      const restroomlocations = await response.json()
      this.setState({center: {lat: restroomlocations[0].latitude, lng: restroomlocations[0].longitude}})
      restroomlocations.map( (restroomlocation) =>
        this.setState({position: this.state.position.concat({
              lat: restroomlocation.latitude,
              lng: restroomlocation.longitude,
              id: this.state.idcounter,
              name: restroomlocation.name,
              street: restroomlocation.street,
              city: restroomlocation.city,
              state: restroomlocation.state,
              country: restroomlocation.country,
              accessible: restroomlocation.accessible,
              unisex: restroomlocation.unisex,
              directions: restroomlocation.directions,
              comment: restroomlocation.comment || ''
            }),
            idcounter: this.state.idcounter + 1
        })
      )    
      this.setState({mode: "Show me restrooms!", place: '' }) 
    }catch(err){
      console.log(err)
    }
  }

  handleChange = evt => {
    console.log(evt)
    this.setState({ [evt.target.name]: evt.target.value })
  }

  render() {
    return (
      <div className="App">
        <h1>Algedi</h1>
        <form onSubmit={this.findRestroom}>
          <input
            type="text"
            name="place"
            placeholder="City Name"
            value={this.state.place}
            onChange={this.handleChange}
          />
          <button type="submit" disabled={this.state.mode === 'Loading...'}>{this.state.mode}</button>
        </form>
        <Map ref={this.maps} center={this.state.center} locations={this.state.position}></Map>
      </div>
    )
  }
}

export default App
