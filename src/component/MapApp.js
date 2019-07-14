import React from 'react';
import SearchBar from './SearchBar'
import MapComponent from './MapComponent'
import axios from 'axios';

export default class MapApp extends React.Component {
    state = {
        position: { lat: 37.7749, lng: -122.4194 }
    }

    handleClick = () => {
        axios.get(`/find?name=${document.getElementById('content').value}`)
            .then(res => {
                const position = { lat: res.data['lat'], lng: res.data['lng'] }
                console.log(position)
                this.setState(()=>({position: position}));
                console.log('updated state:', this.state.position)
            })
    }


    render(){
        return(
            <div>
                <SearchBar handleClick={this.handleClick}/>
                <MapComponent position={this.state.position}/>
            </div>
        )
    }
}


