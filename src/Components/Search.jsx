import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Geocode from "react-geocode";
import LocationIQ from 'react-native-locationiq';

import Map from './Map'

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
LocationIQ.init("dec43a4fbe212b");

// // set response language. Defaults to english.
// LocationIQ.setLanguage("en");

// // set response region. Its optional.
// // A Geocoding request with region=es (Spain) will return the Spanish city.
// LocationIQ.setRegion("es");

// // Enable or disable logs. Its optional.
// LocationIQ.enableDebug();

export class Search extends Component {
    state= {coords:[],text:'',rsp:false}
    
    convert = (address) => { 
        LocationIQ.search(address).then(
        response => {
            this.setState({coords:[{lat: Number(response[0].lat), long:Number(response[0].lon)}]}) ;
            this.setState({rsp:true})
            console.log(this.state.coords)

        },
        error => {
            console.error(error);
        }
        );}

    render() {
        console.log(this.state.coords)
        return (
            <div>
            <div style={{width:'500px', position:'absolute', zIndex:1, margin:'30px'}}>
            <Paper component="form" >
                <IconButton  aria-label="menu" >
                    <MenuIcon />
                </IconButton>
                <InputBase
                    style={{width:'350px', opacity:1}}
                    placeholder="Search Pathify"
                    inputProps={{ 'aria-label': 'Enter Points' }}
                    onChange={(e) => this.setState({text:e.target.value})}
    
                />
                <IconButton  aria-label="search"onClick={() => this.convert(this.state.text)} >
                    <SearchIcon />
                </IconButton>
                <Divider orientation="vertical" style={{display:'inline-block'}}/>
                <IconButton color="primary" aria-label="directions">
                    <DirectionsIcon />
                </IconButton>
            </Paper>
            </div>
                <Map coords={this.state.coords}/>
            </div>
        )
    }
}

export default Search
