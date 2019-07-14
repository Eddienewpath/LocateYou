import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapComponent extends React.Component {
    render() {
        return (
            <Map
                style={{ width: '90%', height: '70%', position: 'relative', top: '20%' }}
                google={this.props.google}
                zoom={4}
                initialCenter={this.props.position}
            >
                <Marker position={this.props.position} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey
})(MapComponent)


