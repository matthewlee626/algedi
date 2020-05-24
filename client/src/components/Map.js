import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '50vw',
  height: '400px',
  minWidth: '600px'
};



class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center: this.props.center,
            locations: this.props.locations
        }
       // this.updatepoints = this.updatepoints.bind(this)
    }

    render() {
        return (
            <LoadScript
                googleMapsApiKey="AIzaSyBeZHtppSWZQDaVMoAcYTvege_HXPQbipM"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={this.props.center}
                    zoom={10}
                >

                {this.props.locations.map((location) =>
                    <Marker
                        key={location.id}
                        position={location}
                        title="POG"
                    /> 
                )} 

                </GoogleMap>
            </LoadScript>
        )
    }
}

export default Map;