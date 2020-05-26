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
            locations: this.props.locations,
            currentName: '',
            currentAddresss: '',
            currentDirections: '',
            currentComment: '',
            addresslink: ''
        }
       // this.updatepoints = this.updatepoints.bind(this)
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            center: nextProps.center,
            locations: nextProps.locations
        };
    }


    hoverOverCursor = point => {
        var info = this.state.locations[point]
        console.log(info)
        this.setState({
            currentName: info.name,
            currentAddresss: info.street,
            currentDirections: `${info.directions} `,
            currentComment: info.comment,
            addresslink: `https://www.google.com/maps/place/${info.street.replace(' ', '+')}`
        })

    }

    render() {
        return (
            <div>
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
                                title={location.name}
                                onMouseOver={() => this.hoverOverCursor(location.id)}
                            /> 
            
                    )} 

                    </GoogleMap>
                </LoadScript>
                <ul>
                    <li>{this.state.currentName}</li>       
                    <li><a href={this.state.addresslink}>{this.state.currentAddresss}</a></li>        
                    <li>{this.state.currentDirections}</li>        
                    <li>{this.state.currentComment}</li>        
                </ul>
            </div>    
        )
    }
}

export default Map;