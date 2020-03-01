import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import AddIcon from '@material-ui/icons/Add';
import Geocode from "react-geocode";
import LocationIQ from 'react-native-locationiq';
import Destinations from './Destinations'
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
    state= {coords:[], coordsName:[], text:'',rsp:false}
    
    convert = (address) => { 
        LocationIQ.search(address).then(
        response => {
            this.setState({coords:this.state.coords.concat({lat: Number(response[0].lat), long:Number(response[0].lon)}), coordsName: this.state.coordsName.concat(address) }) ;
            this.setState({rsp:!this.state.rsp})
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
            <div style={{width:'450px', position:'absolute', zIndex:1, margin:'30px'}}>
            <Paper component="form" >
                <IconButton  aria-label="menu" >
                    <MenuIcon />
                </IconButton>
                <InputBase
                    style={{width:'300px', opacity:1, fontSize:'16px'}}
                    placeholder="Search Pathify"
                    inputProps={{ 'aria-label': 'Enter Points' }}
                    onChange={(e) => this.setState({text:e.target.value})}
    
                />
                <IconButton  aria-label="search"onClick={() => !this.state.coordsName.includes(this.state.text) ? this.convert(this.state.text): null} style={{marginRight:"10px"}}>
                    <AddIcon />
                </IconButton>
                <Divider orientation="vertical" style={{display:'inline-block', color:'black',height: '30px', margin:'-10px'}}/>
                <IconButton color="primary" aria-label="directions" style={{marginLeft:"10px"}}>
                    <DirectionsIcon />
                </IconButton>
            </Paper>
            {this.state.coordsName.length? <Destinations coords={this.state.coordsName}/>: null}

            </div>
                <Map coords={this.state.coords}/>
            </div>
        )
    }
}

export default Search
