import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

export class Search extends Component {
    render() {
        return (
            // <div style={{width:'500px', position:'absolute', zIndex:1, margin:'30px'}}>
            //     <Paper component="form" style={{background:'rgba(21, 22, 22,1)'}}>
            //         <IconButton  aria-label="menu" style={{color:'white'}}>
            //             <MenuIcon />
            //         </IconButton>
            //         <InputBase
            //             style={{width:'350px',color:'white', opacity:1}}
            //             placeholder="Search Google Maps"
            //             inputProps={{ 'aria-label': 'search google maps' }}
            //         />
            //         <IconButton type="submit" aria-label="search" style={{color:'white'}}>
            //             <SearchIcon />
            //         </IconButton>
            //         <Divider orientation="vertical" style={{color:'white', display:'inline-block'}}/>
            //         <IconButton color="primary" aria-label="directions">
            //             <DirectionsIcon />
            //         </IconButton>
            //     </Paper>
            // </div>


            <div style={{width:'500px', position:'absolute', zIndex:1, margin:'30px'}}>
            <Paper component="form" >
                <IconButton  aria-label="menu" >
                    <MenuIcon />
                </IconButton>
                <InputBase
                    style={{width:'350px', opacity:1}}
                    placeholder="Search Pathify"
                    inputProps={{ 'aria-label': 'Enter Points' }}
                />
                <IconButton type="submit" aria-label="search" >
                    <SearchIcon />
                </IconButton>
                <Divider orientation="vertical" style={{display:'inline-block'}}/>
                <IconButton color="primary" aria-label="directions">
                    <DirectionsIcon />
                </IconButton>
            </Paper>
            </div>
        )
    }
}

export default Search
